/**
 * Conversation Delete Controller
 * AI Agent Platform - Soft Delete System
 */

const { Conversation } = require('../models');
const { ApiError } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

/**
 * Soft delete a conversation (move to trash)
 * @route   DELETE /api/conversations/:id
 */
exports.softDelete = async (req, res, next) => {
    try {
        const conversation = await Conversation.findByPk(req.params.id);

        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        // Check permissions (admin or owner)
        if (req.user.role !== 'admin' && req.user.id !== conversation.user_id) {
            throw new ApiError(403, 'Access denied');
        }

        // Soft delete using Sequelize paranoid
        await conversation.destroy(); // This sets deleted_at automatically

        // Update who deleted it
        await conversation.update(
            { deleted_by: req.user.id },
            { paranoid: false } // Allow update on soft-deleted record
        );

        res.json({
            success: true,
            message: 'Conversation moved to trash',
            data: {
                id: conversation.id,
                deleted_at: new Date()
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Bulk soft delete conversations
 * @route   POST /api/conversations/bulk-delete
 */
exports.bulkSoftDelete = async (req, res, next) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new ApiError(400, 'Please provide an array of conversation IDs');
        }

        // Build where clause based on role
        const whereClause = { id: ids };
        if (req.user.role !== 'admin') {
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

        res.json({
            success: true,
            message: `Successfully moved ${deleted} conversations to trash`,
            deletedCount: deleted
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Restore a soft-deleted conversation
 * @route   POST /api/conversations/:id/restore
 */
exports.restore = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            where: { id: req.params.id },
            paranoid: false // Include soft-deleted records
        });

        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        if (!conversation.deleted_at) {
            throw new ApiError(400, 'Conversation is not in trash');
        }

        // Check permissions
        if (req.user.role !== 'admin' && req.user.id !== conversation.user_id) {
            throw new ApiError(403, 'Access denied');
        }

        // Restore
        await conversation.restore();

        // Clear deleted_by
        await conversation.update({ deleted_by: null });

        res.json({
            success: true,
            message: 'Conversation restored successfully',
            data: { id: conversation.id }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Bulk restore conversations
 * @route   POST /api/conversations/bulk-restore
 */
exports.bulkRestore = async (req, res, next) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new ApiError(400, 'Please provide an array of conversation IDs');
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
        if (req.user.role !== 'admin') {
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

        res.json({
            success: true,
            message: `Successfully restored ${restored} conversations`,
            restoredCount: restored
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Permanently delete a conversation (admin only)
 * @route   DELETE /api/conversations/:id/permanent
 */
exports.permanentDelete = async (req, res, next) => {
    try {
        // Admin only
        if (req.user.role !== 'admin') {
            throw new ApiError(403, 'Admin access required');
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

        res.json({
            success: true,
            message: 'Conversation permanently deleted'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Empty trash (delete all soft-deleted conversations) - Admin only
 * @route   DELETE /api/conversations/trash/empty
 */
exports.emptyTrash = async (req, res, next) => {
    try {
        // Admin only
        if (req.user.role !== 'admin') {
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

        res.json({
            success: true,
            message: `Successfully emptied trash (${count} conversations permanently deleted)`,
            deletedCount: count
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get deleted conversations (trash)
 * @route   GET /api/conversations/trash
 */
exports.getTrash = async (req, res, next) => {
    try {
        const whereClause = {
            deleted_at: { [Op.not]: null }
        };

        // Non-admins can only see their own
        if (req.user.role !== 'admin') {
            whereClause.user_id = req.user.id;
        }

        const conversations = await Conversation.findAll({
            where: whereClause,
            paranoid: false,
            order: [['deleted_at', 'DESC']],
            include: [
                {
                    model: require('../models').User,
                    as: 'User',
                    attributes: ['id', 'email', 'first_name', 'last_name']
                }
            ]
        });

        res.json({
            success: true,
            data: conversations
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    softDelete: exports.softDelete,
    bulkSoftDelete: exports.bulkSoftDelete,
    restore: exports.restore,
    bulkRestore: exports.bulkRestore,
    permanentDelete: exports.permanentDelete,
    emptyTrash: exports.emptyTrash,
    getTrash: exports.getTrash
};
