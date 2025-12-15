/**
 * Analytics Controller
 * AI Agent Platform
 * 
 * Provides analytics endpoints for dashboard metrics
 */

const { User, Agent, Conversation } = require('../models');
const { Op } = require('sequelize');

/**
 * Get overview statistics
 * @route GET /api/admin/analytics/overview
 * @access Private/Admin
 */
const getOverviewStats = async (req, res) => {
    try {
        const { startDate, endDate, period = 'monthly' } = req.query;

        // Total counts
        const totalUsers = await User.count();
        const totalAgents = await Agent.count();
        const totalConversations = await Conversation.count();
        const activeConversations = await Conversation.count({
            where: {
                deletedAt: null
            }
        });

        // Calculate growth percentages (mock for now)
        const usersGrowth = 15.8;
        const agentsGrowth = 8.3;
        const conversationsGrowth = 24.2;

        res.json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    growth: usersGrowth,
                    isPositive: true
                },
                agents: {
                    total: totalAgents,
                    growth: agentsGrowth,
                    isPositive: true
                },
                conversations: {
                    total: totalConversations,
                    active: activeConversations,
                    growth: conversationsGrowth,
                    isPositive: true
                },
                revenue: {
                    total: 9257.51,
                    growth: 15.8,
                    increased: 143.50,
                    isPositive: true
                }
            }
        });
    } catch (error) {
        console.error('Get overview stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch overview statistics',
            error: error.message
        });
    }
};

/**
 * Get sales data for charts
 * @route GET /api/admin/analytics/sales
 * @access Private/Admin
 */
const getSalesData = async (req, res) => {
    try {
        const { period = 'weekly' } = req.query;

        // Mock data - in production, this would come from real payment/subscription data
        const weeklySalesData = [
            { name: 'Mon', China: 400, UAE: 240, USA: 300, Canada: 180, Other: 120 },
            { name: 'Tue', China: 300, UAE: 138, USA: 210, Canada: 150, Other: 90 },
            { name: 'Wed', China: 200, UAE: 380, USA: 290, Canada: 200, Other: 140 },
            { name: 'Thu', China: 278, UAE: 390, USA: 300, Canada: 220, Other: 160 },
            { name: 'Fri', China: 189, UAE: 480, USA: 330, Canada: 180, Other: 100 },
            { name: 'Sat', China: 239, UAE: 380, USA: 280, Canada: 190, Other: 130 },
            { name: 'Sun', China: 349, UAE: 430, USA: 350, Canada: 200, Other: 150 }
        ];

        const monthlySalesData = [
            { name: 'Jan', China: 4000, UAE: 2400, USA: 2400, Canada: 1800, Other: 1200 },
            { name: 'Feb', China: 3000, UAE: 1398, USA: 2210, Canada: 1500, Other: 900 },
            { name: 'Mar', China: 2000, UAE: 9800, USA: 2290, Canada: 2000, Other: 1400 },
            { name: 'Apr', China: 2780, UAE: 3908, USA: 2000, Canada: 2200, Other: 1600 },
            { name: 'May', China: 1890, UAE: 4800, USA: 2181, Canada: 1800, Other: 1000 },
            { name: 'Jun', China: 2390, UAE: 3800, USA: 2500, Canada: 1900, Other: 1300 },
            { name: 'Jul', China: 3490, UAE: 4300, USA: 2100, Canada: 2000, Other: 1500 }
        ];

        const data = period === 'weekly' ? weeklySalesData : monthlySalesData;

        res.json({
            success: true,
            data,
            period
        });
    } catch (error) {
        console.error('Get sales data error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sales data',
            error: error.message
        });
    }
};

/**
 * Get subscriber/user growth data
 * @route GET /api/admin/analytics/subscribers
 * @access Private/Admin
 */
const getSubscriberData = async (req, res) => {
    try {
        // Mock data - in production, aggregate from User creation dates
        const subscriberData = [
            { day: 'Mon', value: 2400 },
            { day: 'Tue', value: 1398 },
            { day: 'Wed', value: 3800 },
            { day: 'Thu', value: 3908 },
            { day: 'Fri', value: 4800 },
            { day: 'Sat', value: 3800 },
            { day: 'Sun', value: 2100 }
        ];

        res.json({
            success: true,
            data: subscriberData,
            total: 24473,
            growth: 8.3,
            increased: 749
        });
    } catch (error) {
        console.error('Get subscriber data error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscriber data',
            error: error.message
        });
    }
};

/**
 * Get conversation metrics over time
 * @route GET /api/admin/analytics/conversations
 * @access Private/Admin
 */
const getConversationMetrics = async (req, res) => {
    try {
        const { period = 'daily', days = 7 } = req.query;

        // Get conversations count by date
        // This is simplified - in production, you'd aggregate by date
        const totalConversations = await Conversation.count();
        const activeConversations = await Conversation.count({
            where: { deletedAt: null }
        });

        // Mock trend data
        const conversationTrend = [
            { date: '2024-01-01', count: 45 },
            { date: '2024-01-02', count: 52 },
            { date: '2024-01-03', count: 48 },
            { date: '2024-01-04', count: 61 },
            { date: '2024-01-05', count: 55 },
            { date: '2024-01-06', count: 67 },
            { date: '2024-01-07', count: 73 }
        ];

        res.json({
            success: true,
            data: {
                total: totalConversations,
                active: activeConversations,
                trend: conversationTrend
            }
        });
    } catch (error) {
        console.error('Get conversation metrics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch conversation metrics',
            error: error.message
        });
    }
};

/**
 * Get agent performance metrics
 * @route GET /api/admin/analytics/agents-performance
 * @access Private/Admin
 */
const getAgentPerformance = async (req, res) => {
    try {
        const agents = await Agent.findAll({
            attributes: ['id', 'name', 'status'],
            include: [{
                model: Conversation,
                attributes: []
            }],
            group: ['Agent.id'],
            raw: false
        });

        const agentStats = await Promise.all(agents.map(async (agent) => {
            const conversationCount = await Conversation.count({
                where: { agentId: agent.id }
            });

            return {
                id: agent.id,
                name: agent.name,
                status: agent.status,
                conversations: conversationCount,
                responseRate: Math.floor(Math.random() * 30) + 70, // Mock: 70-100%
                avgResponseTime: Math.floor(Math.random() * 120) + 30 // Mock: 30-150s
            };
        }));

        res.json({
            success: true,
            data: agentStats
        });
    } catch (error) {
        console.error('Get agent performance error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch agent performance',
            error: error.message
        });
    }
};

module.exports = {
    getOverviewStats,
    getSalesData,
    getSubscriberData,
    getConversationMetrics,
    getAgentPerformance
};
