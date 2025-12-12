/**
 * User Controller
 * AI Agent Hosting Platform
 */

const { User, Agent } = require('../models');
const { ApiError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

/**
 * @route   GET /api/users
 * @desc    Get all users (with pagination & search)
 * @access  Private/Admin
 */
const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const { count, rows: users } = await User.findAndCountAll({
            where: whereClause,
            attributes: { exclude: ['password'] },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agents', attributes: ['id', 'agent_name', 'status'] }
            ]
        });

        res.json({
            success: true,
            data: users,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/users/:id
 * @desc    Get single user
 * @access  Private/Admin
 */
const getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Agent, as: 'agents', attributes: ['id', 'agent_name', 'status', 'page_url'] }
            ]
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Private/Admin
 */
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

        // Validate input
        if (!name || !email || !password) {
            throw new ApiError(400, 'Please provide name, email, and password');
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new ApiError(400, 'Email already registered');
        }

        // Create user
        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            success: true,
            data: user.toJSON(),
            message: 'User created successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private/Admin
 */
const updateUser = async (req, res, next) => {
    try {
        const { name, email, password, role, is_active, agent_id } = req.body;

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
            const existingLink = await User.findOne({ where: { agent_id, id: { [Op.ne]: user.id } } });
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

        res.json({
            success: true,
            data: user.toJSON(),
            message: 'User updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private/Admin
 */
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Prevent admin from deleting themselves
        if (req.user.id === user.id) {
            throw new ApiError(400, 'Cannot delete your own account');
        }

        await user.destroy();

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/users/search
 * @desc    Search users
 * @access  Private/Admin
 */
const searchUsers = async (req, res, next) => {
    try {
        const { q = '' } = req.query;

        if (!q || q.length < 2) {
            throw new ApiError(400, 'Search query must be at least 2 characters');
        }

        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${q}%` } },
                    { email: { [Op.iLike]: `%${q}%` } }
                ]
            },
            attributes: { exclude: ['password'] },
            limit: 20
        });

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// New endpoint: assign agent to a user (admin only)
const assignAgent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { agent_id } = req.body;

        // User is already fetched by ID in routes usually, but handled here manually
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

        res.json({
            success: true,
            data: user.toJSON(),
            message: 'Agent assigned to user successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    assignAgent
};
