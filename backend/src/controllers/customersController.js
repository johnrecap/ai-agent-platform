/**
 * Customers Controller
 * AI Agent Platform
 * 
 * CRUD operations for customers
 */

const { Customer } = require('../models');
const { Op } = require('sequelize');

/**
 * Get all customers with pagination
 * @route GET /api/customers
 * @access Private/Admin
 */
const getCustomers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status = '', type = '' } = req.query;
        const offset = (page - 1) * limit;

        const where = {};

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { company: { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (status) {
            where.status = status;
        }

        if (type) {
            where.customer_type = type;
        }

        const { count, rows } = await Customer.findAndCountAll({
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
        console.error('Get customers error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch customers',
            error: error.message
        });
    }
};

/**
 * Get single customer by ID
 * @route GET /api/customers/:id
 * @access Private/Admin
 */
const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        console.error('Get customer error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch customer',
            error: error.message
        });
    }
};

/**
 * Create new customer
 * @route POST /api/customers
 * @access Private/Admin
 */
const createCustomer = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            address,
            city,
            country,
            postal_code,
            status,
            customer_type,
            notes
        } = req.body;

        const customer = await Customer.create({
            name,
            email,
            phone,
            company,
            address,
            city,
            country,
            postal_code,
            status: status || 'active',
            customer_type: customer_type || 'individual',
            notes
        });

        res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            data: customer
        });
    } catch (error) {
        console.error('Create customer error:', error);

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
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
            message: 'Failed to create customer',
            error: error.message
        });
    }
};

/**
 * Update customer
 * @route PUT /api/customers/:id
 * @access Private/Admin
 */
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        await customer.update(updateData);

        res.json({
            success: true,
            message: 'Customer updated successfully',
            data: customer
        });
    } catch (error) {
        console.error('Update customer error:', error);

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
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
            message: 'Failed to update customer',
            error: error.message
        });
    }
};

/**
 * Delete customer
 * @route DELETE /api/customers/:id
 * @access Private/Admin
 */
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        await customer.destroy();

        res.json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        console.error('Delete customer error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete customer',
            error: error.message
        });
    }
};

/**
 * Get customer analytics
 * @route GET /api/customers/analytics/overview
 * @access Private/Admin
 */
const getCustomerAnalytics = async (req, res) => {
    try {
        const totalCustomers = await Customer.count();
        const activeCustomers = await Customer.count({ where: { status: 'active' } });
        const businessCustomers = await Customer.count({ where: { customer_type: 'business' } });

        const totalSpent = await Customer.sum('total_spent') || 0;

        res.json({
            success: true,
            data: {
                total: totalCustomers,
                active: activeCustomers,
                business: businessCustomers,
                individual: totalCustomers - businessCustomers,
                totalSpent: parseFloat(totalSpent).toFixed(2)
            }
        });
    } catch (error) {
        console.error('Get customer analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics',
            error: error.message
        });
    }
};

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerAnalytics
};
