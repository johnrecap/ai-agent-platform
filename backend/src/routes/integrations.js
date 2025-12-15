/**
 * Integrations Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getIntegrations,
    getIntegration,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    testIntegration
} = require('../controllers/integrationsController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All integrations routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/integrations
// @desc    Get all integrations
// @access  Private/Admin
router.get('/', getIntegrations);

// @route   GET /api/integrations/:id
// @desc    Get single integration
// @access  Private/Admin
router.get('/:id', getIntegration);

// @route   POST /api/integrations
// @desc    Create integration
// @access  Private/Admin
router.post('/', createIntegration);

// @route   PUT /api/integrations/:id
// @desc    Update integration
// @access  Private/Admin
router.put('/:id', updateIntegration);

// @route   POST /api/integrations/:id/test
// @desc    Test integration
// @access  Private/Admin
router.post('/:id/test', testIntegration);

// @route   DELETE /api/integrations/:id
// @desc    Delete integration
// @access  Private/Admin
router.delete('/:id', deleteIntegration);

module.exports = router;
