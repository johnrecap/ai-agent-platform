/**
 * Agent Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/agents/public
// @desc    Get all active agents (public)
// @access  Public
router.get('/public', agentController.getPublicAgents);

// @route   GET /api/agents/:id
// @desc    Get single agent
// @access  Public (for agent page)
router.get('/:id', agentController.getAgent);

// Protected routes (require authentication)
router.use(auth);

// @route   GET /api/agents/user/:userId
// @desc    Get user's agents
// @access  Private
router.get('/user/:userId', agentController.getUserAgents);

// Admin-only routes
router.use(adminAuth);

// @route   GET /api/agents
// @desc    Get all agents (with pagination)
// @access  Private/Admin
router.get('/', agentController.getAgents);

// @route   POST /api/agents
// @desc    Create new agent
// @access  Private/Admin
router.post('/', agentController.createAgent);

// @route   PUT /api/agents/:id
// @desc    Update agent
// @access  Private/Admin
router.put('/:id', agentController.updateAgent);

// @route   DELETE /api/agents/:id
// @desc    Delete agent
// @access  Private/Admin
router.delete('/:id', agentController.deleteAgent);

module.exports = router;
