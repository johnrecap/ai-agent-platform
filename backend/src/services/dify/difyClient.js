/**
 * Dify API Client
 * AI Agent Hosting Platform
 * 
 * Base client configuration for Dify API
 */

const axios = require('axios');
const config = require('../../config/config');
const logger = require('../../utils/logger');

class DifyClient {
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
        this.userIdentifiers = [
            'dbf1fbaa-20aa-4904-ab17-a57f6bc7c750',
            'Dify',
            'default',
            'user',
            'anonymous'
        ];
    }

    /**
     * Get Dify API client instance
     */
    getClient() {
        return this.client;
    }

    /**
     * Get user identifiers
     */
    getUserIdentifiers() {
        return this.userIdentifiers;
    }

    /**
     * Get service status
     */
    getStatus() {
        return {
            configured: !!this.apiKey,
            baseUrl: this.baseUrl,
            userIdentifiers: this.userIdentifiers
        };
    }

    /**
     * Check if Dify API is accessible
     */
    async checkConnection() {
        try {
            await this.client.get('/conversations', {
                params: { user: 'test', limit: 1 }
            });
            return true;
        } catch (error) {
            logger.error('Dify connection check failed:', error.message);
            return false;
        }
    }
}

// Export singleton instance
module.exports = new DifyClient();
