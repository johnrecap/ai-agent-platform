/**
 * Invoices Controller
 * AI Agent Platform
 */

const { Invoice, Customer, Payment } = require('../models');
const { Op } = require('sequelize');

/**
 * Get all invoices with pagination
 * @route GET /api/invoices
 * @access Private/Admin
 */
const getInvoices = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status = '' } = req.query;
        const offset = (page - 1) * limit;

        const where = {};

        if (search) {
            where.invoice_number = { [Op.iLike]: `%${search}%` };
        }

        if (status) {
            where.status = status;
        }

        const { count, rows } = await Invoice.findAndCountAll({
            where,
            include: [{
                model: Customer,
                as: 'customer',
                attributes: ['id', 'name', 'email']
            }],
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
        console.error('Get invoices error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch invoices',
            error: error.message
        });
    }
};

/**
 * Get single invoice by ID
 * @route GET /api/invoices/:id
 * @access Private/Admin
 */
const getInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findByPk(id, {
            include: [
                {
                    model: Customer,
                    as: 'customer'
                },
                {
                    model: Payment,
                    as: 'payments'
                }
            ]
        });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        res.json({
            success: true,
            data: invoice
        });
    } catch (error) {
        console.error('Get invoice error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch invoice',
            error: error.message
        });
    }
};

/**
 * Create new invoice
 * @route POST /api/invoices
 * @access Private/Admin
 */
const createInvoice = async (req, res) => {
    try {
        const {
            invoice_number,
            customer_id,
            issue_date,
            due_date,
            items,
            tax_rate,
            notes
        } = req.body;

        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
        const tax_amount = (subtotal * tax_rate) / 100;
        const total = subtotal + tax_amount;

        const invoice = await Invoice.create({
            invoice_number,
            customer_id,
            issue_date,
            due_date,
            items,
            subtotal,
            tax_rate,
            tax_amount,
            total,
            notes,
            status: 'draft'
        });

        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            data: invoice
        });
    } catch (error) {
        console.error('Create invoice error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create invoice',
            error: error.message
        });
    }
};

/**
 * Update invoice
 * @route PUT /api/invoices/:id
 * @access Private/Admin
 */
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const invoice = await Invoice.findByPk(id);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        // Recalculate if items or tax_rate changed
        if (updateData.items || updateData.tax_rate) {
            const items = updateData.items || invoice.items;
            const tax_rate = updateData.tax_rate !== undefined ? updateData.tax_rate : invoice.tax_rate;

            const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
            const tax_amount = (subtotal * tax_rate) / 100;
            const total = subtotal + tax_amount;

            updateData.subtotal = subtotal;
            updateData.tax_amount = tax_amount;
            updateData.total = total;
        }

        await invoice.update(updateData);

        res.json({
            success: true,
            message: 'Invoice updated successfully',
            data: invoice
        });
    } catch (error) {
        console.error('Update invoice error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update invoice',
            error: error.message
        });
    }
};

/**
 * Delete invoice
 * @route DELETE /api/invoices/:id
 * @access Private/Admin
 */
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findByPk(id);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        await invoice.destroy();

        res.json({
            success: true,
            message: 'Invoice deleted successfully'
        });
    } catch (error) {
        console.error('Delete invoice error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete invoice',
            error: error.message
        });
    }
};

/**
 * Get invoice analytics
 * @route GET /api/invoices/analytics/overview
 * @access Private/Admin
 */
const getInvoiceAnalytics = async (req, res) => {
    try {
        const totalInvoices = await Invoice.count();
        const paidInvoices = await Invoice.count({ where: { status: 'paid' } });
        const overdueInvoices = await Invoice.count({ where: { status: 'overdue' } });

        const totalRevenue = await Invoice.sum('total', { where: { status: 'paid' } }) || 0;
        const pendingRevenue = await Invoice.sum('total', { where: { status: { [Op.in]: ['sent', 'overdue'] } } }) || 0;

        res.json({
            success: true,
            data: {
                total: totalInvoices,
                paid: paidInvoices,
                overdue: overdueInvoices,
                totalRevenue: parseFloat(totalRevenue).toFixed(2),
                pendingRevenue: parseFloat(pendingRevenue).toFixed(2)
            }
        });
    } catch (error) {
        console.error('Get invoice analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics',
            error: error.message
        });
    }
};

module.exports = {
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceAnalytics
};
