/**
 * Payments Controller
 * AI Agent Platform
 */

const { Payment, Invoice } = require('../models');

/**
 * Get all payments
 * @route GET /api/payments
 * @access Private/Admin
 */
const getPayments = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = '' } = req.query;
        const offset = (page - 1) * limit;

        const where = {};
        if (status) {
            where.payment_status = status;
        }

        const { count, rows } = await Payment.findAndCountAll({
            where,
            include: [{
                model: Invoice,
                as: 'invoice',
                attributes: ['invoice_number', 'total']
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
        console.error('Get payments error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payments',
            error: error.message
        });
    }
};

/**
 * Create payment
 * @route POST /api/payments
 * @access Private/Admin
 */
const createPayment = async (req, res) => {
    try {
        const { invoice_id, amount, payment_method, transaction_id, notes } = req.body;

        const payment = await Payment.create({
            invoice_id,
            amount,
            payment_method,
            transaction_id,
            payment_status: 'pending',
            notes
        });

        res.status(201).json({
            success: true,
            message: 'Payment created successfully',
            data: payment
        });
    } catch (error) {
        console.error('Create payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment',
            error: error.message
        });
    }
};

/**
 * Update payment status
 * @route PUT /api/payments/:id
 * @access Private/Admin
 */
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_status, payment_date } = req.body;

        const payment = await Payment.findByPk(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        await payment.update({
            payment_status,
            payment_date: payment_date || (payment_status === 'completed' ? new Date() : null)
        });

        // Update invoice status if payment completed
        if (payment_status === 'completed') {
            const invoice = await Invoice.findByPk(payment.invoice_id);
            if (invoice && invoice.status !== 'paid') {
                await invoice.update({ status: 'paid' });
            }
        }

        res.json({
            success: true,
            message: 'Payment updated successfully',
            data: payment
        });
    } catch (error) {
        console.error('Update payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update payment',
            error: error.message
        });
    }
};

module.exports = {
    getPayments,
    createPayment,
    updatePayment
};
