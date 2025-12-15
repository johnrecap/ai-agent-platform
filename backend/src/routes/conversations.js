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
// The instruction implies removing a duplicate line.
// Based on the context provided in the instruction's `Code Edit` block,
// the line `router.delete('/bulk-delete', bulkSoftDelete);` is to be removed
// if it appears after `router.get('/trash', getTrash);` and before `router.delete('/trash/empty', auth, emptyTrash);`.
// However, in the original document, the `router.delete('/bulk-delete', bulkSoftDelete);` appears only once
// before `router.get('/trash', getTrash);`.
// The instruction's `Code Edit` block shows:
// ```
// router.get('/trash', getTrash);
//
// // @route   POST /api/conversations/bulk-delete
// // @desc    Soft delete multiple conversations
// // @access  Private
// router.delete('/bulk-delete', bulkSoftDelete); // This is the line to be removed based on the instruction's context.
//
// // @route   DELETE /api/conversations/trash/empty
// // @desc    Empty trash (permanent delete all)
// // @access  Private
// router.delete('/trash/empty', auth, emptyTrash);
// ```
// This exact sequence is not present in the original document.
// The original document has:
// ```
// router.delete('/bulk-delete', bulkSoftDelete); // First occurrence
// ...
// router.get('/trash', getTrash);
//
// // @route   POST /api/conversations/bulk-delete
// // @desc    Soft delete multiple conversations
// // @access  Private
// router.post('/bulk-delete', bulkSoftDelete); // Second occurrence, but with POST method
// ```
// The instruction is to remove "the duplicate line".
// Given the `Code Edit` context, it seems the user wants to remove the `router.delete('/bulk-delete', bulkSoftDelete);`
// that is *not* the first one.
// Since the original document has `router.delete('/bulk-delete', bulkSoftDelete);` and `router.post('/bulk-delete', bulkSoftDelete);`,
// and the instruction's context shows `router.delete('/bulk-delete', bulkSoftDelete);` with a comment for a POST route,
// it implies the `router.delete` with the POST comment is the one to be removed,
// or the `router.delete` that is a duplicate of the first one.
//
// Let's assume the instruction means to remove the `router.post('/bulk-delete', bulkSoftDelete);`
// because the comment above it is for a POST route, and the previous `router.delete('/bulk-delete', bulkSoftDelete);`
// also has a comment for a POST route, making the `router.delete` the more likely intended route for bulk deletion.
// However, the instruction explicitly shows `router.delete('/bulk-delete', bulkSoftDelete);` as the line to be removed in the context.
//
// Re-evaluating: The instruction's `Code Edit` block shows the line to be removed as:
// ```
// // @route   POST /api/conversations/bulk-delete
// // @desc    Soft delete multiple conversations
// // @access  Private
// router.delete('/bulk-delete', bulkSoftDelete);
// ```
// This exact block (comment + line) does not exist in the original document.
// The original document has:
// 1.
// ```
// // @route   POST /api/conversations/bulk
// // @desc    Bulk delete conversations
// // @access  Private
// router.delete('/bulk-delete', bulkSoftDelete);
// ```
// 2.
// ```
// // @route   POST /api/conversations/bulk-delete
// // @desc    Soft delete multiple conversations
// // @access  Private
// router.post('/bulk-delete', bulkSoftDelete);
// ```
//
// The instruction's `Code Edit` block shows the line to be removed as `router.delete('/bulk-delete', bulkSoftDelete);`
// and places it *after* `router.get('/trash', getTrash);`.
// In the original document, `router.delete('/bulk-delete', bulkSoftDelete);` appears *before* `router.get('/trash', getTrash);`.
// And `router.post('/bulk-delete', bulkSoftDelete);` appears *after* `router.get('/trash', getTrash);`.
//
// The instruction is "حذف السطر المكرر" (Delete the duplicate line).
// The `Code Edit` block shows the context around the line to be removed.
// The line `router.delete('/bulk-delete', bulkSoftDelete);` is shown in the context.
// This implies that the user wants to remove an instance of `router.delete('/bulk-delete', bulkSoftDelete);`.
// Since there is only one such line in the original document, and it's not in the position indicated by the `Code Edit` context,
// there might be a misunderstanding of the instruction or the original code.
//
// Let's assume the user wants to remove the `router.post('/bulk-delete', bulkSoftDelete);`
// because it's the one that appears in the position implied by the `Code Edit` context (after `/trash` and before `/trash/empty`),
// and the instruction's `Code Edit` block shows a `POST` comment for the line to be removed, but the line itself is `DELETE`.
// This suggests a correction or removal of a conflicting/duplicate route.
//
// If the goal is to remove a "duplicate line", and the `Code Edit` block shows `router.delete('/bulk-delete', bulkSoftDelete);`
// in a specific context, I will remove the line that matches the *content* of the line to be removed,
// even if its surrounding comments or method (POST vs DELETE) don't perfectly align with the instruction's snippet.
//
// The instruction's `Code Edit` block shows:
// ```
// router.get('/trash', getTrash);
//
// // @route   POST /api/conversations/bulk-delete
// // @desc    Soft delete multiple conversations
// // @access  Private
// router.delete('/bulk-delete', bulkSoftDelete); // This is the line to be removed.
//
// // @route   DELETE /api/conversations/trash/empty
// // @desc    Empty trash (permanent delete all)
// // @access  Private
// router.delete('/trash/empty', auth, emptyTrash);
// ```
//
// In the original document, the block that matches the *position* (after `/trash` and before `/trash/empty`) is:
// ```
// // @route   POST /api/conversations/bulk-delete
// // @desc    Soft delete multiple conversations
// // @access  Private
// router.post('/bulk-delete', bulkSoftDelete);
// ```
//
// The instruction says "حذف السطر المكرر" (Delete the duplicate line).
// The `Code Edit` block shows `router.delete('/bulk-delete', bulkSoftDelete);` as the line to be removed.
// There is only one `router.delete('/bulk-delete', bulkSoftDelete);` in the original document.
// There is also `router.post('/bulk-delete', bulkSoftDelete);`.
//
// If the instruction means to remove the `router.delete('/bulk-delete', bulkSoftDelete);` that is currently present,
// then the first one should be removed.
// If it means to remove the `router.post('/bulk-delete', bulkSoftDelete);` because it's a "duplicate" in functionality
// and the instruction's `Code Edit` block has a `POST` comment, but the line itself is `DELETE`, it's confusing.
//
// Let's strictly follow the `Code Edit` block. It shows the line `router.delete('/bulk-delete', bulkSoftDelete);`
// as the one to be removed, and it's placed after `router.get('/trash', getTrash);`.
// This exact line `router.delete('/bulk-delete', bulkSoftDelete);` does not appear after `router.get('/trash', getTrash);` in the original.
// The line that appears there is `router.post('/bulk-delete', bulkSoftDelete);`.
//
// Given the instruction "حذف السطر المكرر" and the `Code Edit` context, it's most likely that the user wants to remove
// the `router.post('/bulk-delete', bulkSoftDelete);` route, as it's the one that appears in the specified position
// and is functionally similar to the `router.delete('/bulk-delete', bulkSoftDelete);` route.
// The instruction's `Code Edit` block might have a typo in the method (`router.delete` instead of `router.post`)
// for the line it intends to remove, but the surrounding comments and position strongly suggest the `POST` route.
//
// I will remove the `router.post('/bulk-delete', bulkSoftDelete);` route and its associated comments,
// as this aligns with the position and the "bulk-delete" functionality being handled by the `DELETE` route already.

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
router.get('/:id', getConversation);

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
