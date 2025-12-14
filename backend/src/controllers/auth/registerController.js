/**
 * Register Controller
 * AI Agent Hosting Platform
 */

const { User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateRegisterInput } = require('../../validators/authValidator');
const { success } = require('../../helpers/responseBuilder');
const { DEFAULT_ROLE } = require('../../constants/userRoles');

/**
 * @route   POST /api/auth/register
 * @desc    Register new user (admin only)
 * @access  Private/Admin
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password, role = DEFAULT_ROLE } = req.body;

        // Validate input
        const validation = validateRegisterInput(name, email, password);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new ApiError(400, 'Email already registered');
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json(success(
            { user: user.toJSON() },
            'User registered successfully'
        ));
    } catch (error) {
        next(error);
    }
};

module.exports = { register };
