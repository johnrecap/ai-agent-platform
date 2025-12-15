/**
 * User Agents Controllers Index
 * AI Agent Hosting Platform
 * 
 * Central export for all user-agent controllers
 */

const { getMyAgents, getUserAgents } = require('./getUserAgentsController');
const { assignAgents, unassignAgent } = require('./assignAgentsController');

module.exports = {
    getMyAgents,
    getUserAgents,
    assignAgents,
    unassignAgent
};
