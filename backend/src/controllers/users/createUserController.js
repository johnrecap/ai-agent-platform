/**
 * Create User Controller
 * AI Agent Hosting Platform
 */

const { User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateCreateUser } = require('../../validators/userValidator');
const { success } = require('../../helpers/responseBuilder');
const { DEFAULT_ROLE } = require('../../constants/userRoles');

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Private/Admin
 */
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role = DEFAULT_ROLE } = req.body;

        // Validate input
        const validation = validateCreateUser(req.body);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new ApiError(400, 'Email already registered');
        }

        // Create user
        const user = await User.create({ name, email, password, role });

        res.status(201).json(success(user.toJSON(), 'User created successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { createUser };
