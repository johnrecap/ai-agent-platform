/**
 * Products Controller
 * AI Agent Platform
 * 
 * CRUD operations for products
 */

const { Product } = require('../models');
const { Op } = require('sequelize');

/**
 * Get all products with pagination
 * @route GET /api/products
 * @access Private/Admin
 */
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', category = '', status = '' } = req.query;
        const offset = (page - 1) * limit;

        // Build where clause
        const where = {};

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (category) {
            where.category = category;
        }

        if (status) {
            where.status = status;
        }

        const { count, rows } = await Product.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message
        });
    }
};

/**
 * Get single product by ID
 * @route GET /api/products/:id
 * @access Private/Admin
 */
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: error.message
        });
    }
};

/**
 * Create new product
 * @route POST /api/products
 * @access Private/Admin
 */
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, status, stock_quantity, image_url, sku } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            status: status || 'active',
            stock_quantity: stock_quantity || 0,
            image_url,
            sku
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        console.error('Create product error:', error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: error.message
        });
    }
};

/**
 * Update product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, status, stock_quantity, image_url, sku } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.update({
            name: name !== undefined ? name : product.name,
            description: description !== undefined ? description : product.description,
            price: price !== undefined ? price : product.price,
            category: category !== undefined ? category : product.category,
            status: status !== undefined ? status : product.status,
            stock_quantity: stock_quantity !== undefined ? stock_quantity : product.stock_quantity,
            image_url: image_url !== undefined ? image_url : product.image_url,
            sku: sku !== undefined ? sku : product.sku
        });

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        console.error('Update product error:', error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: error.message
        });
    }
};

/**
 * Delete product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.destroy();

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: error.message
        });
    }
};

/**
 * Get product categories
 * @route GET /api/products/categories
 * @access Private/Admin
 */
const getCategories = async (req, res) => {
    try {
        const categories = await Product.findAll({
            attributes: [[Product.sequelize.fn('DISTINCT', Product.sequelize.col('category')), 'category']],
            where: {
                category: { [Op.ne]: null }
            },
            raw: true
        });

        res.json({
            success: true,
            data: categories.map(c => c.category)
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories
};
