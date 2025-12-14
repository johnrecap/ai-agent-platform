/**
 * Create Agent Controller
 * AI Agent Hosting Platform
 */

const { Agent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateCreateAgent } = require('../../validators/agentValidator');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   POST /api/agents
 * @desc    Create new agent
 * @access  Private/Admin
 */
const createAgent = async (req, res, next) => {
    try {
        const { agent_name, iframe_code, page_url, page_title, description, dify_api_key } = req.body;

        // Validate input
        const validation = validateCreateAgent(req.body);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Use the authenticated user's ID
        const user_id = req.user.id;

        // Auto-generate page_url if not provided
        const finalPageUrl = page_url || `/agent/${agent_name.replace(/\s+/g, '-')}-${Date.now()}`;

        // Check if page_url is unique
        const existingAgent = await Agent.findOne({ where: { page_url: finalPageUrl } });
        if (existingAgent) {
            throw new ApiError(400, 'Page URL already exists');
        }

        // Create agent
        const agent = await Agent.create({
            user_id,
            agent_name,
            iframe_code: iframe_code || `<!-- Dify API Agent: ${agent_name} -->`,
            page_url: finalPageUrl,
            page_title: page_title || agent_name,
            description,
            dify_api_key
        });

        res.status(201).json(success(agent, 'Agent created successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { createAgent };
