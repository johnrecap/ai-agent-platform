/**
 * Automation Controller
 * AI Agent Platform
 */

const { AutomationRule } = require('../models');

/**
 * Get all automation rules
 * @route GET /api/automation
 * @access Private/Admin
 */
const getAutomationRules = async (req, res) => {
    try {
        const { status = '' } = req.query;

        const where = {};
        if (status) where.status = status;

        const rules = await AutomationRule.findAll({
            where,
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: rules
        });
    } catch (error) {
        console.error('Get automation rules error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch automation rules',
            error: error.message
        });
    }
};

/**
 * Get single automation rule
 * @route GET /api/automation/:id
 * @access Private/Admin
 */
const getAutomationRule = async (req, res) => {
    try {
        const { id } = req.params;
        const rule = await AutomationRule.findByPk(id);

        if (!rule) {
            return res.status(404).json({
                success: false,
                message: 'Automation rule not found'
            });
        }

        res.json({
            success: true,
            data: rule
        });
    } catch (error) {
        console.error('Get automation rule error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch automation rule',
            error: error.message
        });
    }
};

/**
 * Create automation rule
 * @route POST /api/automation
 * @access Private/Admin
 */
const createAutomationRule = async (req, res) => {
    try {
        const { name, description, trigger, conditions, actions } = req.body;

        const rule = await AutomationRule.create({
            name,
            description,
            trigger,
            conditions: conditions || [],
            actions: actions || [],
            status: 'inactive'
        });

        res.status(201).json({
            success: true,
            message: 'Automation rule created successfully',
            data: rule
        });
    } catch (error) {
        console.error('Create automation rule error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create automation rule',
            error: error.message
        });
    }
};

/**
 * Update automation rule
 * @route PUT /api/automation/:id
 * @access Private/Admin
 */
const updateAutomationRule = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const rule = await AutomationRule.findByPk(id);

        if (!rule) {
            return res.status(404).json({
                success: false,
                message: 'Automation rule not found'
            });
        }

        await rule.update(updateData);

        res.json({
            success: true,
            message: 'Automation rule updated successfully',
            data: rule
        });
    } catch (error) {
        console.error('Update automation rule error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update automation rule',
            error: error.message
        });
    }
};

/**
 * Delete automation rule
 * @route DELETE /api/automation/:id
 * @access Private/Admin
 */
const deleteAutomationRule = async (req, res) => {
    try {
        const { id } = req.params;
        const rule = await AutomationRule.findByPk(id);

        if (!rule) {
            return res.status(404).json({
                success: false,
                message: 'Automation rule not found'
            });
        }

        await rule.destroy();

        res.json({
            success: true,
            message: 'Automation rule deleted successfully'
        });
    } catch (error) {
        console.error('Delete automation rule error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete automation rule',
            error: error.message
        });
    }
};

/**
 * Execute automation rule
 * @route POST /api/automation/:id/execute
 * @access Private/Admin
 */
const executeAutomationRule = async (req, res) => {
    try {
        const { id } = req.params;
        const rule = await AutomationRule.findByPk(id);

        if (!rule) {
            return res.status(404).json({
                success: false,
                message: 'Automation rule not found'
            });
        }

        if (rule.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Automation rule is not active'
            });
        }

        // Simulate execution
        await rule.update({
            execution_count: rule.execution_count + 1,
            last_executed: new Date()
        });

        res.json({
            success: true,
            message: 'Automation rule executed successfully',
            data: rule
        });
    } catch (error) {
        console.error('Execute automation rule error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to execute automation rule',
            error: error.message
        });
    }
};

module.exports = {
    getAutomationRules,
    getAutomationRule,
    createAutomationRule,
    updateAutomationRule,
    deleteAutomationRule,
    executeAutomationRule
};
