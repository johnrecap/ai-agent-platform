/**
 * Automation Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getAutomationRules,
    getAutomationRule,
    createAutomationRule,
    updateAutomationRule,
    deleteAutomationRule,
    executeAutomationRule
} = require('../controllers/automationController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All automation routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/automation
// @desc    Get all automation rules
// @access  Private/Admin
router.get('/', getAutomationRules);

// @route   GET /api/automation/:id
// @desc    Get single automation rule
// @access  Private/Admin
router.get('/:id', getAutomationRule);

// @route   POST /api/automation
// @desc    Create automation rule
// @access  Private/Admin
router.post('/', createAutomationRule);

// @route   PUT /api/automation/:id
// @desc    Update automation rule
// @access  Private/Admin
router.put('/:id', updateAutomationRule);

// @route   POST /api/automation/:id/execute
// @desc    Execute automation rule
// @access  Private/Admin
router.post('/:id/execute', executeAutomationRule);

// @route   DELETE /api/automation/:id
// @desc    Delete automation rule
// @access  Private/Admin
router.delete('/:id', deleteAutomationRule);

module.exports = router;
