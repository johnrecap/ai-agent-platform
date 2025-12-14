/**
 * Login Controller
 * AI Agent Hosting Platform
 */

const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateLoginInput } = require('../../validators/authValidator');
const { success } = require('../../helpers/responseBuilder');

/**
 * Generate JWT token
 * @param {number} userId - User ID
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expire
    });
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        const validation = validateLoginInput(email, password);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Check if user is active
        if (!user.is_active) {
            throw new ApiError(401, 'Account is deactivated');
        }

        // Generate token
        const token = generateToken(user.id);

        res.json(success(
            {
                token,
                user: user.toJSON()
            },
            'Login successful'
        ));
    } catch (error) {
        next(error);
    }
};

module.exports = { login };
