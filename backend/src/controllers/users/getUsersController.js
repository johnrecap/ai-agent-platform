/**
 * Get Users Controller
 * AI Agent Hosting Platform
 */

const { User, Agent } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { parsePaginationParams, buildPaginationResponse } = require('../../helpers/pagination');
const { paginatedSuccess, success } = require('../../helpers/responseBuilder');
const { validateId } = require('../../validators/conversationValidator');
const { Op } = require('sequelize');
const { MIN_SEARCH_LENGTH } = require('../../constants/apiConstants');

/**
 * @route   GET /api/users
 * @desc    Get all users (with pagination & search)
 * @access  Private/Admin
 */
const getUsers = async (req, res, next) => {
    try {
        const { page, limit, offset } = parsePaginationParams(req.query);
        const { search = '' } = req.query;

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
            limit,
            offset,
            order: [['created_at', 'DESC']],
            include: [
                { model: Agent, as: 'agents', attributes: ['id', 'agent_name', 'status'] }
            ]
        });

        const pagination = buildPaginationResponse(count, page, limit);
        res.json(paginatedSuccess(users, pagination));
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
        const validation = validateId(req.params.id);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Agent, as: 'agents', attributes: ['id', 'agent_name', 'status', 'page_url'] }
            ]
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json(success(user));
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

        if (!q || q.length < MIN_SEARCH_LENGTH) {
            throw new ApiError(400, `Search query must be at least ${MIN_SEARCH_LENGTH} characters`);
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

        res.json(success(users));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    searchUsers
};
