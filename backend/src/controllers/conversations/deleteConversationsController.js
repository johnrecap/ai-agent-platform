/**
 * Delete Conversations Controller
 * AI Agent Platform - Soft Delete System
 */

const { Conversation } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { canModifyResource, canPerformAdminAction } = require('../../helpers/permissionChecker');
const { success } = require('../../helpers/responseBuilder');
const { validateId, validateBulkIds } = require('../../validators/conversationValidator');
const { Op } = require('sequelize');

/**
 * Soft delete a conversation (move to trash)
 * @route   DELETE /api/conversations/:id
 */
const softDelete = async (req, res, next) => {
    try {
        const validation = validateId(req.params.id);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        const conversation = await Conversation.findByPk(req.params.id);
        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        // Check permissions
        if (!canModifyResource(req.user, conversation)) {
            throw new ApiError(403, 'Access denied');
        }

        // Soft delete using Sequelize paranoid
        await conversation.destroy();

        // Update who deleted it
        await conversation.update(
            { deleted_by: req.user.id },
            { paranoid: false }
        );

        res.json(success(
            { id: conversation.id, deleted_at: new Date() },
            'Conversation moved to trash'
        ));
    } catch (error) {
        next(error);
    }
};

/**
 * Bulk soft delete conversations
 * @route   POST /api/conversations/bulk-delete
 */
const bulkSoftDelete = async (req, res, next) => {
    try {
        const { ids } = req.body;

        // Validate bulk IDs
        const validation = validateBulkIds(ids);
        if (!validation.isValid) {
            throw new ApiError(400, validation.errors.join(', '));
        }

        // Build where clause based on role
        const whereClause = { id: ids };
        if (!canPerformAdminAction(req.user)) {
            whereClause.user_id = req.user.id; // Non-admins can only delete their own
        }

        // Soft delete
        const deleted = await Conversation.destroy({
            where: whereClause
        });

        // Update deleted_by for all deleted conversations
        await Conversation.update(
            { deleted_by: req.user.id },
            {
                where: { id: ids },
                paranoid: false
            }
        );

        res.json(success(
            { deletedCount: deleted },
            `Successfully moved ${deleted} conversations to trash`
        ));
    } catch (error) {
        next(error);
    }
};

/**
 * Permanently delete a conversation (admin only)
 * @route   DELETE /api/conversations/:id/permanent
 */
const permanentDelete = async (req, res, next) => {
    try {
        // Admin only
        if (!canPerformAdminAction(req.user)) {
            throw new ApiError(403, 'Admin access required');
        }

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

        // Permanently delete
        await conversation.destroy({ force: true });

        res.json(success(null, 'Conversation permanently deleted'));
    } catch (error) {
        next(error);
    }
};

/**
 * Empty trash (delete all soft-deleted conversations) - Admin only
 * @route   DELETE /api/conversations/trash/empty
 */
const emptyTrash = async (req, res, next) => {
    try {
        // Admin only
        if (!canPerformAdminAction(req.user)) {
            throw new ApiError(403, 'Admin access required');
        }

        // Find all soft-deleted conversations
        const deletedConversations = await Conversation.findAll({
            where: {
                deleted_at: { [Op.not]: null }
            },
            paranoid: false
        });

        // Permanently delete all
        const count = deletedConversations.length;
        for (const conversation of deletedConversations) {
            await conversation.destroy({ force: true });
        }

        res.json(success(
            { deletedCount: count },
            `Successfully emptied trash (${count} conversations permanently deleted)`
        ));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    softDelete,
    bulkSoftDelete,
    permanentDelete,
    emptyTrash
};
