/**
 * Documentation Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getDocs,
    getDocBySlug,
    createDoc,
    updateDoc,
    deleteDoc
} = require('../controllers/docsController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/docs
// @desc    Get all documentation
// @access  Public
router.get('/', getDocs);

// @route   GET /api/docs/:slug
// @desc    Get documentation by slug
// @access  Public
router.get('/:slug', getDocBySlug);

// Admin routes (require authentication)
router.use(auth);
router.use(adminAuth);

// @route   POST /api/docs
// @desc    Create documentation
// @access  Private/Admin
router.post('/', createDoc);

// @route   PUT /api/docs/:id
// @desc    Update documentation
// @access  Private/Admin
router.put('/:id', updateDoc);

// @route   DELETE /api/docs/:id
// @desc    Delete documentation
// @access  Private/Admin
router.delete('/:id', deleteDoc);

module.exports = router;
