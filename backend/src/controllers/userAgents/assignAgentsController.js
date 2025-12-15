/**
 * Assign User Agents Controller
 * AI Agent Hosting Platform
 */

const { User, Agent, UserAgent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   POST /api/user-agents/:userId
 * @desc    Assign agents to a user
 * @access  Private/Admin
 */
const assignAgents = async (req, res, next) => {
    try {
        const { agentIds } = req.body;
        const userId = req.params.userId;

        if (!Array.isArray(agentIds)) {
            throw new ApiError(400, 'agentIds must be an array');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Remove existing assignments
        await UserAgent.destroy({ where: { user_id: userId } });

        // Create new assignments
        if (agentIds.length > 0) {
            const assignments = agentIds.map(agentId => ({
                user_id: userId,
                agent_id: agentId
            }));
            await UserAgent.bulkCreate(assignments, { ignoreDuplicates: true });
        }

        // Fetch updated assignments
        const updatedUser = await User.findByPk(userId, {
            include: [{
                model: Agent,
                as: 'assignedAgents',
                attributes: ['id', 'agent_name', 'page_title']
            }]
        });

        res.json(success(
            updatedUser.assignedAgents,
            'Agents assigned successfully'
        ));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/user-agents/:userId/:agentId
 * @desc    Remove agent assignment from user
 * @access  Private/Admin
 */
const unassignAgent = async (req, res, next) => {
    try {
        const { userId, agentId } = req.params;

        const deleted = await UserAgent.destroy({
            where: { user_id: userId, agent_id: agentId }
        });

        if (deleted === 0) {
            throw new ApiError(404, 'Assignment not found');
        }

        res.json(success(null, 'Agent unassigned successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    assignAgents,
    unassignAgent
};
