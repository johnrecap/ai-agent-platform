/**
 * Delete Agent Controller
 * AI Agent Hosting Platform
 */

const { Agent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   DELETE /api/agents/:id
 * @desc    Delete agent
 * @access  Private/Admin
 */
const deleteAgent = async (req, res, next) => {
    try {
        const agent = await Agent.findByPk(req.params.id);
        if (!agent) {
            throw new ApiError(404, 'Agent not found');
        }

        await agent.destroy();

        res.json(success(null, 'Agent deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { deleteAgent };
