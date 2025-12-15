/**
 * Conversation Saver Service
 * AI Agent Hosting Platform
 * 
 * Handles saving chat conversations to database
 */

const { Conversation } = require('../../models');
const logger = require('../../utils/logger');

/**
 * Save or update conversation in database
 * @param {Object} params - Save parameters
 * @param {number} params.agentId - Agent ID
 * @param {string} params.conversationId - Conversation ID
 * @param {string} params.userMessage - User message
 * @param {string} params.assistantMessage - Assistant response
 * @returns {Promise<Object>} Saved conversation
 */
const saveConversation = async ({ agentId, conversationId, userMessage, assistantMessage }) => {
    try {
        if (!conversationId || !assistantMessage) {
            logger.warn(`Cannot save conversation: convId=${conversationId}, hasAnswer=${!!assistantMessage}`);
            return null;
        }

        let conv = await Conversation.findOne({
            where: { thread_id: conversationId }
        });

        const newMessages = [
            { role: 'user', content: userMessage, timestamp: Date.now() },
            { role: 'assistant', content: assistantMessage, timestamp: Date.now() }
        ];

        if (conv) {
            const messages = [...(conv.messages || []), ...newMessages];
            await conv.update({
                messages,
                message_count: messages.length
            });
            logger.info(`Updated conversation ${conversationId} with ${messages.length} messages`);
            return conv;
        } else {
            const newConv = await Conversation.create({
                agent_id: parseInt(agentId),
                thread_id: conversationId,
                session_id: `dify_${conversationId}`,
                title: userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : ''),
                conversation_type: 'dify',
                messages: newMessages,
                message_count: 2,
                status: 'active'
            });
            logger.info(`Created new conversation ${newConv.id} for thread ${conversationId}`);
            return newConv;
        }
    } catch (error) {
        logger.error('Error saving conversation:', error.message);
        logger.error('Save error stack:', error.stack);
        throw error;
    }
};

module.exports = {
    saveConversation
};
