/**
 * Dify Message Handler
 * AI Agent Hosting Platform
 * 
 * Handles message fetching and transformation
 */

const difyClient = require('./difyClient');
const logger = require('../../utils/logger');

/**
 * Get messages for a specific conversation
 * @param {string} conversationId - Dify conversation ID
 * @param {string} user - User identifier
 * @returns {Promise<Array>} List of messages
 */
const getConversationMessages = async (conversationId, user = 'Dify') => {
    try {
        const client = difyClient.getClient();
        const response = await client.get(`/messages`, {
            params: {
                conversation_id: conversationId,
                user,
                limit: 100,
                first_id: null
            }
        });

        return response.data.data || [];
    } catch (error) {
        logger.error(`Failed to fetch messages for conversation ${conversationId}:`, error.message);
        throw error;
    }
};

/**
 * Transform Dify messages to our format
 * @param {Array} messages - Dify messages
 * @returns {Array} Transformed messages
 */
const transformMessages = (messages) => {
    const properMessages = [];

    for (const msg of messages) {
        if (msg.query) {
            properMessages.push({
                role: 'user',
                content: msg.query,
                timestamp: msg.created_at * 1000
            });
        }
        if (msg.answer) {
            properMessages.push({
                role: 'assistant',
                content: msg.answer,
                timestamp: msg.created_at * 1000
            });
        }
    }

    return properMessages;
};

module.exports = {
    getConversationMessages,
    transformMessages
};
