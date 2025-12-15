/**
 * Payments Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getPayments,
    createPayment,
    updatePayment
} = require('../controllers/paymentsController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All payments routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/payments
// @desc    Get all payments
// @access  Private/Admin
router.get('/', getPayments);

// @route   POST /api/payments
// @desc    Create new payment
// @access  Private/Admin
router.post('/', createPayment);

// @route   PUT /api/payments/:id
// @desc    Update payment
// @access  Private/Admin
router.put('/:id', updatePayment);

module.exports = router;
