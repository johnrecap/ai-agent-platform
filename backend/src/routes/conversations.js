/**
 * Conversation Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
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
const { uploadExcel, downloadTemplate } = require('../controllers/excelController');
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

// @route   POST /api/conversations/bulk
// @desc    Bulk delete conversations
// @access  Private
router.delete('/bulk-delete', bulkSoftDelete);

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
// @access  Private
router.delete('/trash/empty', auth, emptyTrash);

// @route   POST /api/conversations/:id/restore
// @desc    Restore deleted conversation
// @access  Private
router.post('/:id/restore', restore);

// @route   DELETE /api/conversations/:id/permanent
// @access  Admin
router.delete('/:id/permanent', adminAuth, permanentDelete);

// @route   DELETE /api/conversations/:id
// @desc    Soft delete a conversation (move to trash)
// @access  Private
router.delete('/:id', softDelete);

// @route   GET /api/conversations/:id
// @desc    Get single conversation
// @access  Private
router.delete('/:id', softDelete);

// @route   GET /api/conversations
// @desc    Get current user's conversations
// @access  Private
router.get('/', getConversations);

// ============================================
// Excel Upload Routes
// ============================================

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route   POST /api/conversations/upload-excel
// @desc    Upload Excel file with conversations
// @access  Private
router.post('/upload-excel', auth, upload.single('file'), uploadExcel);

// @route   GET /api/conversations/excel-template
// @desc    Download Excel template
// @access  Private
router.get('/excel-template', auth, downloadTemplate);

module.exports = router;
