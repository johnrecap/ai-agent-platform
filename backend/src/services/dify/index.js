/**
 * Dify Services Index
 * AI Agent Hosting Platform
 * 
 * Central export for all Dify services
 */

const difyClient = require('./difyClient');
const { getConversationMessages, transformMessages } = require('./messageHandler');
const { getConversations, getAllConversations, syncConversations } = require('./conversationSync');

// Export client methods
module.exports = {
    // Client
    getClient: () => difyClient.getClient(),
    getUserIdentifiers: () => difyClient.getUserIdentifiers(),
    getStatus: () => difyClient.getStatus(),
    checkConnection: () => difyClient.checkConnection(),

    // Messages
    getConversationMessages,
    transformMessages,

    // Sync
    getConversations,
    getAllConversations,
    syncConversations
};
