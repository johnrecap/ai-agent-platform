/**
 * User Agent Assignment Utilities
 * Helper functions for agent assignment
 */

/**
 * Get assigned agents count
 * @param {object} user - User object
 * @returns {number}
 */
export const getAssignedAgentsCount = (user) => {
    if (!user) return 0;
    return user.assignedAgents?.length || 0;
};

/**
 * Format agents list for display
 * @param {array} agents - Array of agent objects
 * @returns {string}
 */
export const formatAgentsList = (agents) => {
    if (!agents || agents.length === 0) return 'No agents assigned';

    if (agents.length === 1) {
        return agents[0].agent_name;
    }

    if (agents.length <= 3) {
        return agents.map(a => a.agent_name).join(', ');
    }

    return `${agents.slice(0, 2).map(a => a.agent_name).join(', ')} +${agents.length - 2} more`;
};

/**
 * Check if user has agent assigned
 * @param {object} user - User object
 * @param {number} agentId - Agent ID
 * @returns {boolean}
 */
export const hasAgentAssigned = (user, agentId) => {
    if (!user || !user.assignedAgents) return false;
    return user.assignedAgents.some(a => a.id === agentId);
};

/**
 * Get agent assignment badge color
 * @param {number} count - Number of assigned agents
 * @returns {string}
 */
export const getAssignmentBadgeColor = (count) => {
    if (count === 0) return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    if (count <= 3) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
};
