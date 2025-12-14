/**
 * Constants Index
 * AI Agent Hosting Platform
 * 
 * Central export for all constants
 */

const userRoles = require('./userRoles');
const conversationTypes = require('./conversationTypes');
const agentStatus = require('./agentStatus');
const apiConstants = require('./apiConstants');

module.exports = {
    ...userRoles,
    ...conversationTypes,
    ...agentStatus,
    ...apiConstants
};
