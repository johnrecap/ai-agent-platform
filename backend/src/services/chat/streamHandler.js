/**
 * Stream Handler Service
 * AI Agent Hosting Platform
 * 
 * Handles streaming responses from Dify API
 */

const logger = require('../../utils/logger');

/**
 * Process streaming data from Dify
 * @param {Stream} dataStream - Response data stream
 * @param {Response} res - Express response object
 * @param {Function} onComplete - Callback when streaming is done
 */
const processStream = (dataStream, res, onComplete) => {
    let fullAnswer = '';
    let newConversationId = null;

    dataStream.on('data', (chunk) => {
        const lines = chunk.toString().split('\n');

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                try {
                    const data = JSON.parse(line.slice(6));
                    logger.info(`Dify event: ${data.event}`);

                    // Handle different event types from Dify
                    if (data.event === 'message' || data.event === 'agent_message') {
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
                        const text = data.data.outputs.text;
                        fullAnswer += text;
                        res.write(`data: ${JSON.stringify({
                            event: 'message',
                            answer: text,
                            conversation_id: data.conversation_id
                        })}\n\n`);
                    }
                } catch (e) {
                    logger.warn('Failed to parse SSE data:', e.message);
                }
            }
        }
    });

    dataStream.on('end', () => {
        if (onComplete) {
            onComplete({ fullAnswer, conversationId: newConversationId });
        }
        res.end();
    });

    dataStream.on('error', (error) => {
        logger.error('Streaming error:', error.message);
        res.write(`data: ${JSON.stringify({ event: 'error', message: error.message })}\n\n`);
        res.end();
    });
};

/**
 * Collect streaming response into single response
 * @param {Stream} dataStream - Response data stream
 * @returns {Promise<Object>} Collected response
 */
const collectStreamResponse = (dataStream) => {
    return new Promise((resolve, reject) => {
        let fullAnswer = '';
        let convId = null;
        let msgId = null;
        let buffer = '';

        dataStream.on('data', (chunk) => {
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
                    } catch (e) {
                        // Skip invalid JSON
                    }
                }
            }
        });

        dataStream.on('end', () => resolve({ fullAnswer, convId, msgId }));
        dataStream.on('error', (err) => reject(err));
    });
};

module.exports = {
    processStream,
    collectStreamResponse
};
