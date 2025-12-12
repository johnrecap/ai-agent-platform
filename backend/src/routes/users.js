/**
 * User Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All routes require admin access
router.use(auth, adminAuth);

// @route   GET /api/users/search
// @desc    Search users
// @access  Private/Admin
router.get('/search', userController.searchUsers);

// @route   GET /api/users
// @desc    Get all users (with pagination & search)
// @access  Private/Admin
router.get('/', userController.getUsers);

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get('/:id', userController.getUser);

// @route   POST /api/users
// @desc    Create new user
// @access  Private/Admin
router.post('/', userController.createUser);
// Assign agent to a user (admin only)
router.post('/:id/assign-agent', userController.assignAgent);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/:id', userController.updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', userController.deleteUser);

module.exports = router;
