/**
 * Permission Checker Helper
 * AI Agent Hosting Platform
 * 
 * Centralized permission checking logic
 */

const { isAdmin } = require('../constants/userRoles');

/**
 * Check if user can access conversation
 * @param {Object} user - Current user object
 * @param {Object} conversation - Conversation object
 * @param {Object} models - Database models (Agent, UserAgent)
 * @returns {Promise<boolean>} True if user has access
 */
const canAccessConversation = async (user, conversation, models) => {
    const { Agent, UserAgent } = models;

    // Admin can access all
    if (isAdmin(user.role)) {
        return true;
    }

    // User can access their own conversations
    if (conversation.user_id && conversation.user_id === user.id) {
        return true;
    }

    // Check if user owns the agent
    if (conversation.agent_id) {
        const agent = await Agent.findByPk(conversation.agent_id);
        if (agent && agent.user_id === user.id) {
            return true;
        }

        // Check if user is assigned to the agent
        const assignment = await UserAgent.findOne({
            where: {
                user_id: user.id,
                agent_id: conversation.agent_id
            }
        });

        if (assignment) {
            return true;
        }
    }

    return false;
};

/**
 * Check if user can modify resource (update/delete)
 * @param {Object} user - Current user object
 * @param {Object} resource - Resource to modify (must have user_id)
 * @returns {boolean} True if user can modify
 */
const canModifyResource = (user, resource) => {
    // Admin can modify all
    if (isAdmin(user.role)) {
        return true;
    }

    // User can only modify their own resources
    return resource.user_id === user.id;
};

/**
 * Check if user can perform admin action
 * @param {Object} user - Current user object
 * @returns {boolean} True if user is admin
 */
const canPerformAdminAction = (user) => {
    return isAdmin(user.role);
};

/**
 * Get accessible agent IDs for user (owned + assigned)
 * @param {Object} user - Current user object
 * @param {Object} models - Database models (Agent, User)
 * @returns {Promise<Array>} Array of agent IDs
 */
const getAccessibleAgentIds = async (user, models) => {
    const { Agent, User } = models;

    // Get owned agents
    const ownedAgents = await Agent.findAll({
        where: { user_id: user.id },
        attributes: ['id']
    });

    // Get assigned agents
    const userWithAssignedAgents = await User.findByPk(user.id, {
        include: [{
            model: Agent,
            as: 'assignedAgents',
            attributes: ['id'],
            through: { attributes: [] }
        }]
    });

    const ownedAgentIds = ownedAgents.map(a => a.id);
    const assignedAgentIds = userWithAssignedAgents?.assignedAgents?.map(a => a.id) || [];

    // Combine and remove duplicates
    return [...new Set([...ownedAgentIds, ...assignedAgentIds])];
};

module.exports = {
    canAccessConversation,
    canModifyResource,
    canPerformAdminAction,
    getAccessibleAgentIds
};
