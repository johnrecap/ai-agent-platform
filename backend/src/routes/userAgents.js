/**
 * User-Agent Routes
 * AI Agent Hosting Platform
 * 
 * Handles user-agent assignment operations
 */

const express = require('express');
const router = express.Router();
const {
    getMyAgents,
    getUserAgents,
    assignAgents,
    unassignAgent
} = require('../controllers/userAgents');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All routes require authentication
router.use(auth);

/**
 * @route   GET /api/user-agents/my-agents
 * @desc    Get current user's agents (owned + assigned)
 * @access  Private (any authenticated user)
 */
router.get('/my-agents', getMyAgents);

// Admin-only routes below
router.use(adminAuth);

/**
 * @route   GET /api/user-agents/:userId
 * @desc    Get agents assigned to a user
 * @access  Private/Admin
 */
router.get('/:userId', getUserAgents);

/**
 * @route   POST /api/user-agents/:userId
 * @desc    Assign agents to a user
 * @access  Private/Admin
 */
router.post('/:userId', assignAgents);

/**
 * @route   DELETE /api/user-agents/:userId/:agentId
 * @desc    Remove agent assignment from user
 * @access  Private/Admin
 */
router.delete('/:userId/:agentId', unassignAgent);

module.exports = router;
