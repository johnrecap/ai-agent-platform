/**
 * Customers Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerAnalytics
} = require('../controllers/customersController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All customers routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/customers/analytics/overview
// @desc    Get customer analytics
// @access  Private/Admin
router.get('/analytics/overview', getCustomerAnalytics);

// @route   GET /api/customers
// @desc    Get all customers with pagination
// @access  Private/Admin
router.get('/', getCustomers);

// @route   GET /api/customers/:id
// @desc    Get single customer
// @access  Private/Admin
router.get('/:id', getCustomer);

// @route   POST /api/customers
// @desc    Create new customer
// @access  Private/Admin
router.post('/', createCustomer);

// @route   PUT /api/customers/:id
// @desc    Update customer
// @access  Private/Admin
router.put('/:id', updateCustomer);

// @route   DELETE /api/customers/:id
// @desc    Delete customer
// @access  Private/Admin
router.delete('/:id', deleteCustomer);

module.exports = router;
