/**
 * Conversation Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const {
    getConversations,
    getUserConversations,
    getAgentConversations,
    getConversation,
    searchConversations,
    softDelete,
    bulkSoftDelete,
    permanentDelete,
    emptyTrash,
    restore,
    bulkRestore,
    getTrash
} = require('../controllers/conversations');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// ============================================
// PROTECTED ROUTES (Auth required)
// ============================================

router.use(auth);

router.get('/search', searchConversations);

// @route   GET /api/conversations/user/:userId
// @desc    Get user's conversations
// @access  Private
router.get('/user/:userId', getUserConversations);

// @route   GET /api/conversations/agent/:agentId
// @desc    Get agent conversations
// @access  Private
router.get('/agent/:agentId', getAgentConversations);

// @route   GET /api/conversations/trash
// @desc    Get deleted conversations (trash)
// @access  Private
router.get('/trash', getTrash);

// @route   POST /api/conversations/bulk-delete
// @desc    Soft delete multiple conversations
// @access  Private
router.post('/bulk-delete', bulkSoftDelete);

// @route   POST /api/conversations/bulk-restore
// @desc    Restore multiple conversations
// @access  Private
router.post('/bulk-restore', bulkRestore);

// @route   DELETE /api/conversations/trash/empty
// @desc    Empty trash (permanent delete all)
// @access  Admin
router.delete('/trash/empty', adminAuth, emptyTrash);

// @route   POST /api/conversations/:id/restore
// @desc    Restore a deleted conversation
// @access  Private
router.post('/:id/restore', restore);

// @route   DELETE /api/conversations/:id/permanent
// @desc    Permanently delete a conversation (hard delete)
// @access  Admin
router.delete('/:id/permanent', adminAuth, permanentDelete);

// @route   DELETE /api/conversations/:id
// @desc    Soft delete a conversation (move to trash)
// @access  Private
router.delete('/:id', softDelete);

// @route   GET /api/conversations/:id
// @desc    Get single conversation
// @access  Private
router.get('/:id', getConversation);

// @route   GET /api/conversations
// @desc    Get current user's conversations
// @access  Private
router.get('/', getConversations);

module.exports = router;
