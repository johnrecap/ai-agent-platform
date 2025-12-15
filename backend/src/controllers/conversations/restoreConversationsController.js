/**
 * Restore Conversations Controller
 * AI Agent Platform - Soft Delete System
 */

const { Conversation, User } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { canModifyResource, canPerformAdminAction } = require('../../helpers/permissionChecker');
const { success } = require('../../helpers/responseBuilder');
const { validateId, validateBulkIds } = require('../../validators/conversationValidator');
const { Op } = require('sequelize');

/**
 * Restore a soft-deleted conversation
 * @route   POST /api/conversations/:id/restore
 */
const restore = async (req, res, next) => {
    try {
        const validation = validateId(req.params.id);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const conversation = await Conversation.findOne({
            where: { id: req.params.id },
            paranoid: false
        });

        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        if (!conversation.deleted_at) {
            throw new ApiError(400, 'Conversation is not in trash');
        }

        // Check permissions
        if (!canModifyResource(req.user, conversation)) {
            throw new ApiError(403, 'Access denied');
        }

        // Restore
        await conversation.restore();

        // Clear deleted_by
        await conversation.update({ deleted_by: null });

        res.json(success(
            { id: conversation.id },
            'Conversation restored successfully'
        ));
    } catch (error) {
        next(error);
    }
};

/**
 * Bulk restore conversations
 * @route   POST /api/conversations/bulk-restore
 */
const bulkRestore = async (req, res, next) => {
    try {
        const { ids } = req.body;

        // Validate bulk IDs
        const validation = validateBulkIds(ids);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Find all soft-deleted conversations
        const conversations = await Conversation.findAll({
            where: { id: ids },
            paranoid: false
        });

        if (conversations.length === 0) {
            throw new ApiError(404, 'No conversations found in trash');
        }

        // Check permissions
        if (!canPerformAdminAction(req.user)) {
            const hasUnauthorized = conversations.some(c => c.user_id !== req.user.id);
            if (hasUnauthorized) {
                throw new ApiError(403, 'You can only restore your own conversations');
            }
        }

        // Restore all
        let restored = 0;
        for (const conversation of conversations) {
            if (conversation.deleted_at) {
                await conversation.restore();
                await conversation.update({ deleted_by: null });
                restored++;
            }
        }

        res.json(success(
            { restoredCount: restored },
            `Successfully restored ${restored} conversations`
        ));
    } catch (error) {
        next(error);
    }
};

/**
 * Get deleted conversations (trash)
 * @route   GET /api/conversations/trash
 */
const getTrash = async (req, res, next) => {
    try {
        const whereClause = {
            deleted_at: { [Op.not]: null }
        };

        // Non-admins can only see their own
        if (!canPerformAdminAction(req.user)) {
            whereClause.user_id = req.user.id;
        }

        const conversations = await Conversation.findAll({
            where: whereClause,
            paranoid: false,
            order: [['deleted_at', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        res.json(success(conversations));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    restore,
    bulkRestore,
    getTrash
};
