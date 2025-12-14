/**
 * Conversation Types and Status Constants
 * AI Agent Hosting Platform
 */

const CONVERSATION_TYPES = {
    DIFY: 'dify',
    CUSTOM: 'custom'
};

const CONVERSATION_STATUS = {
    ACTIVE: 'active',
    ARCHIVED: 'archived',
    DELETED: 'deleted'
};

/**
 * Check if conversation type is valid
 * @param {string} type - Conversation type
 * @returns {boolean}
 */
const isValidType = (type) => Object.values(CONVERSATION_TYPES).includes(type);

/**
 * Check if conversation status is valid
 * @param {string} status - Conversation status
 * @returns {boolean}
 */
const isValidStatus = (status) => Object.values(CONVERSATION_STATUS).includes(status);

module.exports = {
    CONVERSATION_TYPES,
    CONVERSATION_STATUS,
    isValidType,
    isValidStatus
};
