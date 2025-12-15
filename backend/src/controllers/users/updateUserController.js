/**
 * Update User Controller
 * AI Agent Hosting Platform
 */

const { User, Agent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateUpdateUser } = require('../../validators/userValidator');
const { validateId } = require('../../validators/conversationValidator');
const { success } = require('../../helpers/responseBuilder');
const { Op } = require('sequelize');

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private/Admin
 */
const updateUser = async (req, res, next) => {
    try {
        const { name, email, password, role, is_active, agent_id } = req.body;

        // Validate ID
        const idValidation = validateId(req.params.id);
        if (!idValidation.isValid) {
            throw new ApiError(400, idValidation.errors.join(', '));
        }

        // Validate update data
        const validation = validateUpdateUser(req.body);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Prevent admin from changing their own role
        if (req.user.id === user.id && role && role !== user.role) {
            throw new ApiError(400, 'Cannot change your own role');
        }

        // Enforce single admin if role is being changed to admin
        if (role === 'admin' && user.role !== 'admin') {
            const existingAdmin = await User.findOne({ where: { role: 'admin' } });
            if (existingAdmin && existingAdmin.id !== user.id) {
                throw new ApiError(400, 'An admin already exists');
            }
        }

        // If agent_id provided, validate existence and uniqueness
        if (agent_id) {
            const agent = await Agent.findByPk(agent_id);
            if (!agent) {
                throw new ApiError(400, 'Agent not found');
            }
            const existingLink = await User.findOne({
                where: { agent_id, id: { [Op.ne]: user.id } }
            });
            if (existingLink) {
                throw new ApiError(400, 'Agent already assigned to another user');
            }
            user.agent_id = agent_id;
        }

        // Update other fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if (role) user.role = role;
        if (is_active !== undefined) user.is_active = is_active;

        await user.save();

        res.json(success(user.toJSON(), 'User updated successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { updateUser };
