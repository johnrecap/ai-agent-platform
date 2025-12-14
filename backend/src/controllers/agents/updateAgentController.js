/**
 * Update Agent Controller
 * AI Agent Hosting Platform
 */

const { Agent, User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateUpdateAgent } = require('../../validators/agentValidator');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   PUT /api/agents/:id
 * @desc    Update agent
 * @access  Private/Admin
 */
const updateAgent = async (req, res, next) => {
    try {
        const { user_id, agent_name, iframe_code, page_url, page_title, description, status, dify_api_key } = req.body;

        // Validate input
        const validation = validateUpdateAgent(req.body);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const agent = await Agent.findByPk(req.params.id);
        if (!agent) {
            throw new ApiError(404, 'Agent not found');
        }

        // If changing user_id, verify user exists
        if (user_id && user_id !== agent.user_id) {
            const user = await User.findByPk(user_id);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            agent.user_id = user_id;
        }

        // If changing page_url, verify uniqueness
        if (page_url && page_url !== agent.page_url) {
            const existingAgent = await Agent.findOne({ where: { page_url } });
            if (existingAgent) {
                throw new ApiError(400, 'Page URL already exists');
            }
            agent.page_url = page_url;
        }

        // Update fields
        if (agent_name) agent.agent_name = agent_name;
        if (iframe_code) agent.iframe_code = iframe_code;
        if (page_title) agent.page_title = page_title;
        if (description !== undefined) agent.description = description;
        if (status) agent.status = status;
        if (dify_api_key !== undefined) agent.dify_api_key = dify_api_key;

        await agent.save();

        res.json(success(agent, 'Agent updated successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { updateAgent };
