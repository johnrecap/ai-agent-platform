/**
 * Dify Service
 * AI Agent Platform - Dify Integration
 */

const fetch = require('node-fetch');

class DifyService {
    constructor() {
        this.baseURL = process.env.DIFY_API_BASE_URL || 'https://api.dify.ai/v1';
    }

    /**
     * Test Dify connection
     * @param {string} apiKey - Dify API Key
     * @param {string} appId - Dify App ID
     * @returns {Promise<object>}
     */
    async testConnection(apiKey, appId) {
        try {
            const response = await fetch(`${this.baseURL}/info`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Dify API error: ${response.statusText}`);
            }

            return {
                success: true,
                connected: true,
                appId
            };
        } catch (error) {
            return {
                success: false,
                connected: false,
                error: error.message
            };
        }
    }

    /**
     * Sync conversations from Dify
     * @param {string} apiKey - Dify API Key
     * @param {string} agentId - Agent ID
     * @returns {Promise<object>}
     */
    async syncConversations(apiKey, agentId) {
        try {
            const response = await fetch(`${this.baseURL}/conversations`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch conversations: ${response.statusText}`);
            }

            const data = await response.json();
            return this.parseDifyResponse(data, agentId);
        } catch (error) {
            throw new Error(`Sync failed: ${error.message}`);
        }
    }

    /**
     * Get Dify conversations
     * @param {string} apiKey - Dify API Key
     * @returns {Promise<array>}
     */
    async getDifyConversations(apiKey) {
        try {
            const response = await fetch(`${this.baseURL}/conversations`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch conversations: ${response.statusText}`);
            }

            const data = await response.json();
            return data.data || [];
        } catch (error) {
            throw new Error(`Get conversations failed: ${error.message}`);
        }
    }

    /**
     * Send message to Dify
     * @param {string} apiKey - Dify API Key
     * @param {string} conversationId - Conversation ID
     * @param {string} message - Message content
     * @returns {Promise<object>}
     */
    async sendMessage(apiKey, conversationId, message) {
        try {
            const response = await fetch(`${this.baseURL}/chat-messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: {},
                    query: message,
                    response_mode: 'blocking',
                    conversation_id: conversationId,
                    user: 'api-user'
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Send message failed: ${error.message}`);
        }
    }

    /**
     * Parse Dify API response
     * @param {object} response - Dify API response
     * @param {string} agentId - Agent ID
     * @returns {object}
     */
    parseDifyResponse(response, agentId) {
        const conversations = response.data || [];

        return {
            success: true,
            synced: conversations.length,
            conversations: conversations.map(conv => ({
                title: conv.name || 'Dify Conversation',
                agent_id: agentId,
                conversation_type: 'dify',
                messages: conv.messages || [],
                message_count: conv.messages?.length || 0,
                metadata: {
                    dify_conversation_id: conv.id,
                    dify_created_at: conv.created_at
                }
            }))
        };
    }

    /**
     * Check Dify status for agent
     * @param {object} agent - Agent object
     * @returns {object}
     */
    checkStatus(agent) {
        const hasDifyKey = !!agent.dify_api_key;
        const hasDifyAppId = !!agent.dify_app_id;
        const isDifyProvider = agent.provider_type === 'dify';

        return {
            configured: hasDifyKey && hasDifyAppId && isDifyProvider,
            hasApiKey: hasDifyKey,
            hasAppId: hasDifyAppId,
            providerType: agent.provider_type
        };
    }
}

module.exports = new DifyService();
