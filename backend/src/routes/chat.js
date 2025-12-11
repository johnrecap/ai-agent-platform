/**
 * Chat Routes - Dify API Integration
 * AI Agent Hosting Platform
 * 
 * Handles chat communication with Dify agents
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Agent, Conversation } = require('../models');
const authenticate = require('../middleware/auth');
const logger = require('../utils/logger');

const DIFY_API_URL = 'https://api.dify.ai/v1';

/**
 * @route   POST /api/chat/:agentId
 * @desc    Send a message to agent and get response (streaming)
 * @access  Public (for embedded chat) or Private
 */
router.post('/:agentId', async (req, res) => {
    try {
        const { agentId } = req.params;
        const { message, conversation_id, user } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        // Get agent with API key
        const agent = await Agent.findByPk(agentId);
        if (!agent) {
            return res.status(404).json({ success: false, error: 'Agent not found' });
        }

        if (!agent.dify_api_key) {
            return res.status(400).json({ success: false, error: 'Agent has no Dify API key configured' });
        }

        // Generate user ID if not provided
        const userId = user || `user_${Date.now()}`;

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Call Dify API with streaming
        const response = await axios.post(
            `${DIFY_API_URL}/chat-messages`,
            {
                inputs: {},
                query: message,
                response_mode: 'streaming',
                conversation_id: conversation_id || '',
                user: userId
            },
            {
                headers: {
                    'Authorization': `Bearer ${agent.dify_api_key}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'stream',
                timeout: 60000
            }
        );

        let fullAnswer = '';
        let newConversationId = conversation_id;

        response.data.on('data', (chunk) => {
            const lines = chunk.toString().split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));
                        logger.info(`Dify event: ${data.event}`);

                        // Handle different event types from Dify
                        if (data.event === 'message' || data.event === 'agent_message') {
                            // Regular message or agent message
                            const answer = data.answer || '';
                            if (answer) {
                                fullAnswer += answer;
                                res.write(`data: ${JSON.stringify({
                                    event: 'message',
                                    answer: answer,
                                    conversation_id: data.conversation_id
                                })}\n\n`);
                            }
                        } else if (data.event === 'agent_thought') {
                            // Agent thinking - can optionally show this
                            if (data.thought) {
                                res.write(`data: ${JSON.stringify({
                                    event: 'thought',
                                    thought: data.thought
                                })}\n\n`);
                            }
                        } else if (data.event === 'message_end' || data.event === 'workflow_finished') {
                            newConversationId = data.conversation_id;
                            res.write(`data: ${JSON.stringify({
                                event: 'done',
                                conversation_id: data.conversation_id,
                                message_id: data.message_id || data.id
                            })}\n\n`);
                        } else if (data.event === 'error') {
                            res.write(`data: ${JSON.stringify({
                                event: 'error',
                                message: data.message
                            })}\n\n`);
                        } else if (data.event === 'node_finished' && data.data?.outputs?.text) {
                            // Workflow node with text output
                            const text = data.data.outputs.text;
                            fullAnswer += text;
                            res.write(`data: ${JSON.stringify({
                                event: 'message',
                                answer: text,
                                conversation_id: data.conversation_id
                            })}\n\n`);
                        }
                    } catch (e) {
                        // Skip invalid JSON
                        logger.warn('Failed to parse SSE data:', e.message);
                    }
                }
            }
        });

        response.data.on('end', async () => {
            // Save conversation to database
            try {
                if (newConversationId && fullAnswer) {
                    let conv = await Conversation.findOne({
                        where: { thread_id: newConversationId }
                    });

                    const newMessage = [
                        { role: 'user', content: message, timestamp: Date.now() },
                        { role: 'assistant', content: fullAnswer, timestamp: Date.now() }
                    ];

                    if (conv) {
                        const messages = [...(conv.messages || []), ...newMessage];
                        await conv.update({
                            messages,
                            message_count: messages.length
                        });
                    } else {
                        await Conversation.create({
                            agent_id: parseInt(agentId),
                            thread_id: newConversationId,
                            session_id: `dify_${newConversationId}`,
                            title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
                            conversation_type: 'dify',
                            messages: newMessage,
                            message_count: 2,
                            status: 'active'
                        });
                    }
                }
            } catch (saveError) {
                logger.error('Error saving conversation:', saveError.message);
            }
            res.end();
        });

        response.data.on('error', (error) => {
            logger.error('Streaming error:', error.message);
            res.write(`data: ${JSON.stringify({ event: 'error', message: error.message })}\n\n`);
            res.end();
        });

    } catch (error) {
        logger.error('Chat error:', error.message);

        // If headers already sent, end the stream
        if (res.headersSent) {
            res.write(`data: ${JSON.stringify({ event: 'error', message: error.message })}\n\n`);
            res.end();
        } else {
            res.status(500).json({ success: false, error: error.message });
        }
    }
});

/**
 * @route   POST /api/chat/:agentId/simple
 * @desc    Send a message and get non-streaming response (collects streaming internally)
 * @access  Public
 */
router.post('/:agentId/simple', async (req, res) => {
    try {
        const { agentId } = req.params;
        const { message, conversation_id, user } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        const agent = await Agent.findByPk(agentId);
        if (!agent || !agent.dify_api_key) {
            return res.status(400).json({ success: false, error: 'Agent not configured' });
        }

        const userId = user || `user_${Date.now()}`;

        // Use streaming mode but collect the full response
        const response = await axios.post(
            `${DIFY_API_URL}/chat-messages`,
            {
                inputs: {},
                query: message,
                response_mode: 'streaming',
                conversation_id: conversation_id || '',
                user: userId
            },
            {
                headers: {
                    'Authorization': `Bearer ${agent.dify_api_key}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'stream',
                timeout: 120000
            }
        );

        // Collect the full response
        let fullAnswer = '';
        let convId = conversation_id;
        let msgId = null;

        await new Promise((resolve, reject) => {
            let buffer = '';

            response.data.on('data', (chunk) => {
                buffer += chunk.toString('utf8');
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.event === 'message' || data.event === 'agent_message') {
                                fullAnswer += data.answer || '';
                            }
                            if (data.conversation_id) {
                                convId = data.conversation_id;
                            }
                            if (data.event === 'message_end') {
                                msgId = data.message_id;
                            }
                        } catch (e) { }
                    }
                }
            });

            response.data.on('end', () => resolve());
            response.data.on('error', (err) => reject(err));
        });

        // Save to database
        logger.info(`Attempting to save conversation: convId=${convId}, fullAnswer length=${fullAnswer?.length || 0}`);

        if (convId && fullAnswer) {
            try {
                let conv = await Conversation.findOne({ where: { thread_id: convId } });
                const newMessages = [
                    { role: 'user', content: message, timestamp: Date.now() },
                    { role: 'assistant', content: fullAnswer, timestamp: Date.now() }
                ];

                if (conv) {
                    const messages = [...(conv.messages || []), ...newMessages];
                    await conv.update({ messages, message_count: messages.length });
                    logger.info(`Updated conversation ${convId} with ${messages.length} messages`);
                } else {
                    const newConv = await Conversation.create({
                        agent_id: parseInt(agentId),
                        thread_id: convId,
                        session_id: `dify_${convId}`,
                        title: message.slice(0, 50),
                        conversation_type: 'dify',
                        messages: newMessages,
                        message_count: 2,
                        status: 'active'
                    });
                    logger.info(`Created new conversation ${newConv.id} for thread ${convId}`);
                }
            } catch (saveErr) {
                logger.error('Error saving conversation:', saveErr.message);
                logger.error('Save error stack:', saveErr.stack);
            }
        } else {
            logger.warn(`Cannot save conversation: convId=${convId}, hasAnswer=${!!fullAnswer}`);
        }

        res.json({
            success: true,
            data: {
                answer: fullAnswer,
                conversation_id: convId,
                message_id: msgId
            }
        });
    } catch (error) {
        logger.error('Simple chat error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @route   GET /api/chat/:agentId/history/:conversationId
 * @desc    Get conversation history
 * @access  Public
 */
router.get('/:agentId/history/:conversationId', async (req, res) => {
    try {
        const { agentId, conversationId } = req.params;

        const conversation = await Conversation.findOne({
            where: {
                agent_id: agentId,
                thread_id: conversationId
            }
        });

        if (!conversation) {
            return res.json({ success: true, data: { messages: [] } });
        }

        res.json({
            success: true,
            data: {
                id: conversation.id,
                thread_id: conversation.thread_id,
                messages: conversation.messages || [],
                title: conversation.title
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
