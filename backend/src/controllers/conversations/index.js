/**
 * Conversations Controllers Index
 * AI Agent Hosting Platform
 * 
 * Central export for all conversation controllers
 */

const {
    getConversations,
    getUserConversations,
    getAgentConversations,
    getConversation
} = require('./getConversationsController');

const { searchConversations } = require('./searchConversationsController');

const {
    softDelete,
    bulkSoftDelete,
    permanentDelete,
    emptyTrash
} = require('./deleteConversationsController');

const {
    restore,
    bulkRestore,
    getTrash
} = require('./restoreConversationsController');

module.exports = {
    // Get operations
    getConversations,
    getUserConversations,
    getAgentConversations,
    getConversation,
    searchConversations,

    // Delete operations
    softDelete,
    bulkSoftDelete,
    permanentDelete,
    emptyTrash,

    // Restore operations
    restore,
    bulkRestore,
    getTrash
};
