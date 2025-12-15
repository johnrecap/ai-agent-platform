/**
 * Dify Conversation Sync
 * AI Agent Hosting Platform
 * 
 * Handles conversation syncing from Dify to local database
 */

const difyClient = require('./difyClient');
const { getConversationMessages, transformMessages } = require('./messageHandler');
const logger = require('../../utils/logger');
const { Conversation } = require('../../models');

/**
 * Get all conversations from Dify for a specific user
 * @param {string} user - User identifier
 * @param {number} limit - Number of conversations to fetch
 * @returns {Promise<Array>} List of conversations
 */
const getConversations = async (user = 'Dify', limit = 100) => {
    try {
        const client = difyClient.getClient();
        const response = await client.get('/conversations', {
            params: { user, limit, first_id: null, pinned: null }
        });

        logger.info(`Fetched ${response.data.data?.length || 0} conversations for user '${user}'`);
        return response.data.data || [];
    } catch (error) {
        logger.error(`Failed to fetch Dify conversations for user '${user}':`, error.message);
        throw error;
    }
};

/**
 * Get all conversations from Dify for multiple user identifiers
 * @param {number} limit - Number of conversations to fetch per user
 * @returns {Promise<Array>} List of conversations from all users
 */
const getAllConversations = async (limit = 100) => {
    const allConversations = [];
    const seenIds = new Set();
    const userIdentifiers = difyClient.getUserIdentifiers();

    for (const user of userIdentifiers) {
        try {
            const conversations = await getConversations(user, limit);
            for (const conv of conversations) {
                if (!seenIds.has(conv.id)) {
                    seenIds.add(conv.id);
                    conv._user = user; // Track which user ID this belongs to
                    allConversations.push(conv);
                }
            }
        } catch (error) {
            logger.warn(`Failed to fetch for user '${user}': ${error.message}`);
        }
    }

    logger.info(`Total conversations fetched from all users: ${allConversations.length}`);
    return allConversations;
};

/**
 * Sync conversations from Dify to local database
 * @param {number} userId - Local user ID to assign conversations to
 * @param {number} agentId - Optional agent ID to associate with
 * @returns {Promise<Object>} Sync results
 */
const syncConversations = async (userId, agentId = null) => {
    const results = {
        total: 0,
        synced: 0,
        errors: 0,
        details: []
    };

    try {
        const difyConversations = await getAllConversations();
        results.total = difyConversations.length;

        for (const difyConv of difyConversations) {
            try {
                const messages = await getConversationMessages(difyConv.id, difyConv._user || 'Dify');
                const properMessages = transformMessages(messages);

                const existingConv = await Conversation.findOne({
                    where: { thread_id: difyConv.id }
                });

                const convTitle = difyConv.name ||
                    (properMessages[0]?.content?.slice(0, 50) + '...' || `Dify Chat`);

                if (existingConv) {
                    await existingConv.update({
                        messages: properMessages,
                        message_count: properMessages.length,
                        title: convTitle
                    });
                    results.details.push({ id: difyConv.id, action: 'updated' });
                } else {
                    await Conversation.create({
                        agent_id: agentId,
                        user_id: null,
                        thread_id: difyConv.id,
                        session_id: `dify_${difyConv.id}`,
                        title: convTitle,
                        conversation_type: 'dify',
                        messages: properMessages,
                        message_count: properMessages.length,
                        status: 'active'
                    });
                    results.details.push({ id: difyConv.id, action: 'created' });
                }

                results.synced++;
            } catch (convError) {
                logger.error(`Error syncing conversation ${difyConv.id}:`, convError.message);
                results.errors++;
                results.details.push({
                    id: difyConv.id,
                    action: 'error',
                    error: convError.message
                });
            }
        }

        logger.success(`Dify sync complete: ${results.synced}/${results.total} conversations synced`);
        return results;
    } catch (error) {
        logger.error('Failed to sync Dify conversations:', error.message);
        throw error;
    }
};

module.exports = {
    getConversations,
    getAllConversations,
    syncConversations
};
