/**
 * Agents Controllers Index
 * AI Agent Hosting Platform
 * 
 * Central export for all agent controllers
 */

const { getAgents, getAgent, getUserAgents, getPublicAgents } = require('./getAgentsController');
const { createAgent } = require('./createAgentController');
const { updateAgent } = require('./updateAgentController');
const { deleteAgent } = require('./deleteAgentController');

module.exports = {
    getAgents,
    getAgent,
    getUserAgents,
    getPublicAgents,
    createAgent,
    updateAgent,
    deleteAgent
};
