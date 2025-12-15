/**
 * User Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    searchUsers,
    createUser,
    updateUser,
    deleteUser,
    assignAgent
} = require('../controllers/users');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All routes require admin access
router.use(auth, adminAuth);

router.get('/search', searchUsers);

// @route   GET /api/users
// @desc    Get all users (with pagination & search)
// @access  Private/Admin
router.get('/', getUsers);

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get('/:id', getUser);

// @route   POST /api/users
// @desc    Create new user
// @access  Private/Admin
router.post('/', createUser);

// Assign agent to a user (admin only)
router.post('/:id/assign-agent', assignAgent);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/:id', updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', deleteUser);

module.exports = router;
