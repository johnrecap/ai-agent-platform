/**
 * Security Controller
 * AI Agent Platform
 */

const { ActivityLog, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Get activity logs
 * @route GET /api/security/logs
 * @access Private/Admin
 */
const getActivityLogs = async (req, res) => {
    try {
        const { page = 1, limit = 20, severity = '', action = '' } = req.query;
        const offset = (page - 1) * limit;

        const where = {};
        if (severity) where.severity = severity;
        if (action) where.action = { [Op.iLike]: `%${action}%` };

        const { count, rows } = await ActivityLog.findAndCountAll({
            where,
            include: [{
                model: User,
                as: 'user',
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
        console.error('Get activity logs error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch activity logs',
            error: error.message
        });
    }
};

/**
 * Create activity log
 * @route POST /api/security/logs
 * @access Private
 */
const createActivityLog = async (req, res) => {
    try {
        const { action, entity_type, entity_id, metadata, severity = 'info' } = req.body;
        const userId = req.user ? req.user.id : null;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('user-agent');

        const log = await ActivityLog.create({
            user_id: userId,
            action,
            entity_type,
            entity_id,
            ip_address: ipAddress,
            user_agent: userAgent,
            metadata: metadata || {},
            severity
        });

        res.status(201).json({
            success: true,
            message: 'Activity log created',
            data: log
        });
    } catch (error) {
        console.error('Create activity log error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create activity log',
            error: error.message
        });
    }
};

/**
 * Get security stats
 * @route GET /api/security/stats
 * @access Private/Admin
 */
const getSecurityStats = async (req, res) => {
    try {
        const totalLogs = await ActivityLog.count();
        const criticalLogs = await ActivityLog.count({ where: { severity: 'critical' } });
        const warningLogs = await ActivityLog.count({ where: { severity: 'warning' } });
        const todayLogs = await ActivityLog.count({
            where: {
                created_at: {
                    [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
                }
            }
        });

        res.json({
            success: true,
            data: {
                total: totalLogs,
                critical: criticalLogs,
                warning: warningLogs,
                today: todayLogs
            }
        });
    } catch (error) {
        console.error('Get security stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch security stats',
            error: error.message
        });
    }
};

module.exports = {
    getActivityLogs,
    createActivityLog,
    getSecurityStats
};
