/**
 * Products Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories
} = require('../controllers/productsController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// All products routes require authentication and admin access
router.use(auth);
router.use(adminAuth);

// @route   GET /api/products/categories
// @desc    Get all product categories
// @access  Private/Admin
router.get('/categories', getCategories);

// @route   GET /api/products
// @desc    Get all products with pagination
// @access  Private/Admin
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Private/Admin
router.get('/:id', getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Private/Admin
router.post('/', createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', deleteProduct);

module.exports = router;
