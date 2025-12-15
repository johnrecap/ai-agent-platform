/**
 * Get User Agents Controller
 * AI Agent Hosting Platform
 */

const { User, Agent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   GET /api/user-agents/my-agents
 * @desc    Get current user's agents (owned + assigned)
 * @access  Private (any authenticated user)
 */
const getMyAgents = async (req, res, next) => {
    try {
        // Get owned agents
        const ownedAgents = await Agent.findAll({
            where: { user_id: req.user.id },
            attributes: ['id', 'agent_name', 'page_title', 'status']
        });

        // Get assigned agents
        const userWithAssignedAgents = await User.findByPk(req.user.id, {
            include: [{
                model: Agent,
                as: 'assignedAgents',
                attributes: ['id', 'agent_name', 'page_title', 'status']
            }]
        });

        // Combine and remove duplicates
        const allAgents = [...ownedAgents];
        const assignedAgents = userWithAssignedAgents?.assignedAgents || [];

        assignedAgents.forEach(agent => {
            if (!allAgents.find(a => a.id === agent.id)) {
                allAgents.push(agent);
            }
        });

        res.json(success(allAgents));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/user-agents/:userId
 * @desc    Get agents assigned to a user
 * @access  Private/Admin
 */
const getUserAgents = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            include: [{
                model: Agent,
                as: 'assignedAgents',
                attributes: ['id', 'agent_name', 'page_title', 'status']
            }]
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json(success(user.assignedAgents || []));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMyAgents,
    getUserAgents
};
