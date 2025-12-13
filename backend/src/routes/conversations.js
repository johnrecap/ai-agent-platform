/**
 * Conversation Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const conversationController = require('../controllers/conversationController');
const excelUploadController = require('../controllers/excelUploadController');
const deleteController = require('../controllers/conversationDeleteController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Configure multer for file uploads (memory storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Accept Excel and CSV files
        const allowedMimes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'application/octet-stream',
            'text/csv',
            'text/plain'
        ];
        const allowedExtensions = ['.xlsx', '.xls', '.csv'];
        const hasValidExtension = allowedExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext));

        if (allowedMimes.includes(file.mimetype) || hasValidExtension) {
            cb(null, true);
        } else {
            cb(new Error('Only Excel (.xlsx, .xls) and CSV (.csv) files are allowed'), false);
        }
    }
});

// ============================================
// PROTECTED ROUTES (Auth required)
// ============================================

router.use(auth);

// @route   GET /api/conversations/search
// @desc    Search in conversations
// @access  Private
router.get('/search', conversationController.searchConversations);

// @route   POST /api/conversations/upload-excel
// @desc    Upload Excel file to import conversations
// @access  Private/Admin
router.post('/upload-excel', adminAuth, upload.single('file'), excelUploadController.uploadExcel);

// @route   GET /api/conversations/user/:userId
// @desc    Get user's conversations
// @access  Private
router.get('/user/:userId', conversationController.getUserConversations);

// @route   GET /api/conversations/agent/:agentId
// @desc    Get agent conversations
// @access  Private
router.get('/agent/:agentId', conversationController.getAgentConversations);

// @route   GET /api/conversations/trash
// @desc    Get deleted conversations (trash)
// @access  Private
router.get('/trash', deleteController.getTrash);

// @route   POST /api/conversations/bulk-delete
// @desc    Soft delete multiple conversations
// @access  Private
router.post('/bulk-delete', deleteController.bulkSoftDelete);

// @route   POST /api/conversations/bulk-restore
// @desc    Restore multiple conversations
// @access  Private
router.post('/bulk-restore', deleteController.bulkRestore);

// @route   DELETE /api/conversations/trash/empty
// @desc    Empty trash (permanent delete all)
// @access  Admin
router.delete('/trash/empty', adminAuth, deleteController.emptyTrash);

// @route   POST /api/conversations/:id/restore
// @desc    Restore a deleted conversation
// @access  Private
router.post('/:id/restore', deleteController.restore);

// @route   DELETE /api/conversations/:id/permanent
// @desc    Permanently delete a conversation (hard delete)
// @access  Admin
router.delete('/:id/permanent', adminAuth, deleteController.permanentDelete);

// @route   DELETE /api/conversations/:id
// @desc    Soft delete a conversation (move to trash)
// @access  Private
router.delete('/:id', deleteController.softDelete);

// @route   GET /api/conversations/:id
// @desc    Get single conversation
// @access  Private
router.get('/:id', conversationController.getConversation);

// @route   GET /api/conversations
// @desc    Get current user's conversations
// @access  Private
router.get('/', conversationController.getConversations);

module.exports = router;
