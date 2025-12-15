/**
 * Invoices Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceAnalytics
} = require('../controllers/invoicesController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All invoices routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/invoices/analytics/overview
// @desc    Get invoice analytics
// @access  Private/Admin
router.get('/analytics/overview', getInvoiceAnalytics);

// @route   GET /api/invoices
// @desc    Get all invoices with pagination
// @access  Private/Admin
router.get('/', getInvoices);

// @route   GET /api/invoices/:id
// @desc    Get single invoice
// @access  Private/Admin
router.get('/:id', getInvoice);

// @route   POST /api/invoices
// @desc    Create new invoice
// @access  Private/Admin
router.post('/', createInvoice);

// @route   PUT /api/invoices/:id
// @desc    Update invoice
// @access  Private/Admin
router.put('/:id', updateInvoice);

// @route   DELETE /api/invoices/:id
// @desc    Delete invoice
// @access  Private/Admin
router.delete('/:id', deleteInvoice);

module.exports = router;
