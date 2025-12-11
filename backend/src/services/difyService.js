/**
 * Dify API Service
 * AI Agent Hosting Platform
 * 
 * Handles communication with Dify API for conversation syncing
 */

const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');
const { Conversation, User } = require('../models');

class DifyService {
    constructor() {
        this.baseUrl = config.dify?.baseUrl || 'https://api.dify.ai/v1';
        this.apiKey = config.dify?.apiKey;
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        // Common user identifiers used by Dify chatbot
        // Note: The UUID is from the actual Dify logs shown by user
        this.userIdentifiers = [
            'dbf1fbaa-20aa-4904-ab17-a57f6bc7c750', // Actual UUID from Dify logs
            'Dify',
            'default',
            'user',
            'anonymous'
        ];
    }

    /**
     * Get all conversations from Dify for multiple user identifiers
     * @param {number} limit - Number of conversations to fetch per user
     * @returns {Promise<Array>} List of conversations from all users
     */
    async getAllConversations(limit = 100) {
        const allConversations = [];
        const seenIds = new Set();

        for (const user of this.userIdentifiers) {
            try {
                const conversations = await this.getConversations(user, limit);
                for (const conv of conversations) {
                    if (!seenIds.has(conv.id)) {
                        seenIds.add(conv.id);
                        conv._user = user; // Track which user ID this belongs to
                        allConversations.push(conv);
                    }
                }
            } catch (error) {
                // Continue with other users if one fails
                logger.warn(`Failed to fetch for user '${user}': ${error.message}`);
            }
        }

        logger.info(`Total conversations fetched from all users: ${allConversations.length}`);
        return allConversations;
    }

    /**
     * Get all conversations from Dify for a specific user
     * @param {string} user - User identifier
     * @param {number} limit - Number of conversations to fetch
     * @returns {Promise<Array>} List of conversations
     */
    async getConversations(user = 'Dify', limit = 100) {
        try {
            const response = await this.client.get('/conversations', {
                params: { user, limit, first_id: null, pinned: null }
            });

            logger.info(`Fetched ${response.data.data?.length || 0} conversations for user '${user}'`);
            return response.data.data || [];
        } catch (error) {
            logger.error(`Failed to fetch Dify conversations for user '${user}':`, error.message);
            throw error;
        }
    }

    /**
     * Get messages for a specific conversation
     * @param {string} conversationId - Dify conversation ID
     * @param {string} user - User identifier
     * @returns {Promise<Array>} List of messages
     */
    async getConversationMessages(conversationId, user = 'Dify') {
        try {
            const response = await this.client.get(`/messages`, {
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
    }

    /**
     * Sync conversations from Dify to local database
     * @param {number} userId - Local user ID to assign conversations to
     * @param {number} agentId - Optional agent ID to associate with
     * @returns {Promise<Object>} Sync results
     */
    async syncConversations(userId, agentId = null) {
        const results = {
            total: 0,
            synced: 0,
            errors: 0,
            details: []
        };

        try {
            // Fetch from all user identifiers
            const difyConversations = await this.getAllConversations();
            results.total = difyConversations.length;

            for (const difyConv of difyConversations) {
                try {
                    // Get full messages for this conversation
                    const messages = await this.getConversationMessages(difyConv.id, difyConv._user || 'Dify');

                    // Transform Dify messages to our format
                    const transformedMessages = messages.map(msg => ({
                        role: msg.query ? 'user' : 'assistant',
                        content: msg.query || msg.answer || '',
                        timestamp: msg.created_at * 1000 // Convert to milliseconds
                    }));

                    // Build proper message pairs
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

                    // Check if conversation already exists
                    const existingConv = await Conversation.findOne({
                        where: { thread_id: difyConv.id }
                    });

                    const convTitle = difyConv.name || (properMessages[0]?.content?.slice(0, 50) + '...' || `Dify Chat`);

                    if (existingConv) {
                        // Update existing conversation
                        await existingConv.update({
                            messages: properMessages,
                            message_count: properMessages.length,
                            title: convTitle
                        });
                        results.details.push({ id: difyConv.id, action: 'updated' });
                    } else {
                        // Create new conversation
                        await Conversation.create({
                            agent_id: agentId,
                            user_id: userId,
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
                    results.details.push({ id: difyConv.id, action: 'error', error: convError.message });
                }
            }

            logger.success(`Dify sync complete: ${results.synced}/${results.total} conversations synced`);
            return results;
        } catch (error) {
            logger.error('Failed to sync Dify conversations:', error.message);
            throw error;
        }
    }

    /**
     * Check if Dify API is accessible
     * @returns {Promise<boolean>}
     */
    async checkConnection() {
        try {
            // Try to get conversations for any user to verify connection
            await this.client.get('/conversations', {
                params: { user: 'test', limit: 1 }
            });
            return true;
        } catch (error) {
            logger.error('Dify connection check failed:', error.message);
            return false;
        }
    }

    /**
     * Get sync status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            configured: !!this.apiKey,
            baseUrl: this.baseUrl,
            userIdentifiers: this.userIdentifiers
        };
    }
}

// Export singleton instance
module.exports = new DifyService();
