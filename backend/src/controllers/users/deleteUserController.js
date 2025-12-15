/**
 * Delete User Controller
 * AI Agent Hosting Platform
 */

const { User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { validateId } = require('../../validators/conversationValidator');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private/Admin
 */
const deleteUser = async (req, res, next) => {
    try {
        const validation = validateId(req.params.id);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Prevent admin from deleting themselves
        if (req.user.id === user.id) {
            throw new ApiError(400, 'Cannot delete your own account');
        }

        await user.destroy();

        res.json(success(null, 'User deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { deleteUser };
