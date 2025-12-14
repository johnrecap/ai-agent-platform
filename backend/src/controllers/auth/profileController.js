/**
 * Profile Controller
 * AI Agent Hosting Platform
 */

const { User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
const getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json(success({ user: user.toJSON() }));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client should remove token)
 * @access  Private
 */
const logout = async (req, res, next) => {
    try {
        // In a JWT-based system, we just tell the client to remove the token
        // For enhanced security, you could maintain a token blacklist
        res.json(success(null, 'Logged out successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMe,
    logout
};
