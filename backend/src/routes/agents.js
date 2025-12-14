/**
 * Agent Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const {
    getAgents,
    getAgent,
    getUserAgents,
    getPublicAgents,
    createAgent,
    updateAgent,
    deleteAgent
} = require('../controllers/agents');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/public', getPublicAgents);

// @route   GET /api/agents/:id
// @desc    Get single agent
// @access  Public (for agent page)
router.get('/:id', getAgent);

// Protected routes (require authentication)
router.use(auth);

// @route   GET /api/agents/user/:userId
// @desc    Get user's agents
// @access  Private
router.get('/user/:userId', getUserAgents);

// Admin-only routes
router.use(adminAuth);

// @route   GET /api/agents
// @desc    Get all agents (with pagination)
// @access  Private/Admin
router.get('/', getAgents);

// @route   POST /api/agents
// @desc    Create new agent
// @access  Private/Admin
router.post('/', createAgent);

// @route   PUT /api/agents/:id
// @desc    Update agent
// @access  Private/Admin
router.put('/:id', updateAgent);

// @route   DELETE /api/agents/:id
// @desc    Delete agent
// @access  Private/Admin
router.delete('/:id', deleteAgent);

module.exports = router;
