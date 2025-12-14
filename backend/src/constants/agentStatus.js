/**
 * Agent Status Constants
 * AI Agent Hosting Platform
 */

const AGENT_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DRAFT: 'draft'
};

const DEFAULT_STATUS = 'active';

/**
 * Check if agent status is valid
 * @param {string} status - Agent status
 * @returns {boolean}
 */
const isValidStatus = (status) => Object.values(AGENT_STATUS).includes(status);

module.exports = {
    AGENT_STATUS,
    DEFAULT_STATUS,
    isValidStatus
};
