/**
 * Advanced Analytics Controller
 * AI Agent Platform
 */

const { Invoice, Customer, Product, Payment } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Get revenue analytics
 * @route GET /api/analytics/revenue
 * @access Private/Admin
 */
const getRevenueAnalytics = async (req, res) => {
    try {
        const { period = 'month' } = req.query;

        // Get revenue by period
        const revenueData = await Invoice.findAll({
            attributes: [
                [sequelize.fn('DATE_TRUNC', period, sequelize.col('issue_date')), 'period'],
                [sequelize.fn('SUM', sequelize.col('total')), 'revenue'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: {
                status: 'paid',
                issue_date: {
                    [Op.gte]: sequelize.literal(`CURRENT_DATE - INTERVAL '12 ${period}s'`)
                }
            },
            group: [sequelize.fn('DATE_TRUNC', period, sequelize.col('issue_date'))],
            order: [[sequelize.fn('DATE_TRUNC', period, sequelize.col('issue_date')), 'ASC']],
            raw: true
        });

        res.json({
            success: true,
            data: revenueData
        });
    } catch (error) {
        console.error('Get revenue analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch revenue analytics',
            error: error.message
        });
    }
};

/**
 * Get growth analytics
 * @route GET /api/analytics/growth
 * @access Private/Admin
 */
const getGrowthAnalytics = async (req, res) => {
    try {
        const { period = 'month' } = req.query;

        const customerGrowth = await Customer.findAll({
            attributes: [
                [sequelize.fn('DATE_TRUNC', period, sequelize.col('created_at')), 'period'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: {
                created_at: {
                    [Op.gte]: sequelize.literal(`CURRENT_DATE - INTERVAL '12 ${period}s'`)
                }
            },
            group: [sequelize.fn('DATE_TRUNC', period, sequelize.col('created_at'))],
            order: [[sequelize.fn('DATE_TRUNC', period, sequelize.col('created_at')), 'ASC']],
            raw: true
        });

        res.json({
            success: true,
            data: customerGrowth
        });
    } catch (error) {
        console.error('Get growth analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch growth analytics',
            error: error.message
        });
    }
};

/**
 * Get top products analytics
 * @route GET /api/analytics/top-products
 * @access Private/Admin
 */
const getTopProducts = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        // For now, return products ordered by created_at
        // In real implementation, this would be based on sales data
        const topProducts = await Product.findAll({
            limit: parseInt(limit),
            order: [['created_at', 'DESC']],
            attributes: ['id', 'name', 'price', 'category', 'stock_quantity']
        });

        res.json({
            success: true,
            data: topProducts
        });
    } catch (error) {
        console.error('Get top products error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch top products',
            error: error.message
        });
    }
};

/**
 * Get payment methods distribution
 * @route GET /api/analytics/payment-methods
 * @access Private/Admin
 */
const getPaymentMethodsDistribution = async (req, res) => {
    try {
        const distribution = await Payment.findAll({
            attributes: [
                'payment_method',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
                [sequelize.fn('SUM', sequelize.col('amount')), 'total']
            ],
            where: {
                payment_status: 'completed'
            },
            group: ['payment_method'],
            raw: true
        });

        res.json({
            success: true,
            data: distribution
        });
    } catch (error) {
        console.error('Get payment methods distribution error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment methods distribution',
            error: error.message
        });
    }
};

/**
 * Get dashboard summary
 * @route GET /api/analytics/summary
 * @access Private/Admin
 */
const getDashboardSummary = async (req, res) => {
    try {
        const totalRevenue = await Invoice.sum('total', { where: { status: 'paid' } }) || 0;
        const totalCustomers = await Customer.count();
        const totalProducts = await Product.count();
        const pendingInvoices = await Invoice.count({ where: { status: { [Op.in]: ['sent', 'overdue'] } } });

        res.json({
            success: true,
            data: {
                totalRevenue: parseFloat(totalRevenue).toFixed(2),
                totalCustomers,
                totalProducts,
                pendingInvoices
            }
        });
    } catch (error) {
        console.error('Get dashboard summary error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard summary',
            error: error.message
        });
    }
};

module.exports = {
    getRevenueAnalytics,
    getGrowthAnalytics,
    getTopProducts,
    getPaymentMethodsDistribution,
    getDashboardSummary
};
