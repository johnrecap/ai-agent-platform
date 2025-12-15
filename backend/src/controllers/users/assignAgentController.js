/**
 * Assign Agent Controller
 * AI Agent Hosting Platform
 */

const { User, Agent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateId } = require('../../validators/conversationValidator');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   POST /api/users/:id/assign-agent
 * @desc    Assign agent to user
 * @access  Private/Admin
 */
const assignAgent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { agent_id } = req.body;

        // Validate user ID
        const idValidation = validateId(id);
        if (!idValidation.isValid) {
            throw new ApiError(400, idValidation.errors.join(', '));
        }

        const user = await User.findByPk(id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (!agent_id) {
            throw new ApiError(400, 'agent_id is required');
        }

        const agent = await Agent.findByPk(agent_id);
        if (!agent) {
            throw new ApiError(400, 'Agent not found');
        }

        // Ensure agent not already linked to another user
        const existingLink = await User.findOne({ where: { agent_id } });
        if (existingLink && existingLink.id !== user.id) {
            throw new ApiError(400, 'Agent already assigned to another user');
        }

        user.agent_id = agent_id;
        await user.save();

        res.json(success(user.toJSON(), 'Agent assigned to user successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { assignAgent };
