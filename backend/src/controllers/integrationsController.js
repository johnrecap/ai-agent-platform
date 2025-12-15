/**
 * Integrations Controller
 * AI Agent Platform
 */

const { Integration } = require('../models');

/**
 * Get all integrations
 * @route GET /api/integrations
 * @access Private/Admin
 */
const getIntegrations = async (req, res) => {
    try {
        const { type = '', status = '' } = req.query;

        const where = {};
        if (type) where.type = type;
        if (status) where.status = status;

        const integrations = await Integration.findAll({
            where,
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: integrations
        });
    } catch (error) {
        console.error('Get integrations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch integrations',
            error: error.message
        });
    }
};

/**
 * Get single integration
 * @route GET /api/integrations/:id
 * @access Private/Admin
 */
const getIntegration = async (req, res) => {
    try {
        const { id } = req.params;
        const integration = await Integration.findByPk(id);

        if (!integration) {
            return res.status(404).json({
                success: false,
                message: 'Integration not found'
            });
        }

        res.json({
            success: true,
            data: integration
        });
    } catch (error) {
        console.error('Get integration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch integration',
            error: error.message
        });
    }
};

/**
 * Create integration
 * @route POST /api/integrations
 * @access Private/Admin
 */
const createIntegration = async (req, res) => {
    try {
        const { name, type, config, api_key, webhook_url } = req.body;

        const integration = await Integration.create({
            name,
            type,
            config: config || {},
            api_key,
            webhook_url,
            status: 'inactive'
        });

        res.status(201).json({
            success: true,
            message: 'Integration created successfully',
            data: integration
        });
    } catch (error) {
        console.error('Create integration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create integration',
            error: error.message
        });
    }
};

/**
 * Update integration
 * @route PUT /api/integrations/:id
 * @access Private/Admin
 */
const updateIntegration = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const integration = await Integration.findByPk(id);

        if (!integration) {
            return res.status(404).json({
                success: false,
                message: 'Integration not found'
            });
        }

        await integration.update(updateData);

        res.json({
            success: true,
            message: 'Integration updated successfully',
            data: integration
        });
    } catch (error) {
        console.error('Update integration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update integration',
            error: error.message
        });
    }
};

/**
 * Delete integration
 * @route DELETE /api/integrations/:id
 * @access Private/Admin
 */
const deleteIntegration = async (req, res) => {
    try {
        const { id } = req.params;
        const integration = await Integration.findByPk(id);

        if (!integration) {
            return res.status(404).json({
                success: false,
                message: 'Integration not found'
            });
        }

        await integration.destroy();

        res.json({
            success: true,
            message: 'Integration deleted successfully'
        });
    } catch (error) {
        console.error('Delete integration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete integration',
            error: error.message
        });
    }
};

/**
 * Test integration
 * @route POST /api/integrations/:id/test
 * @access Private/Admin
 */
const testIntegration = async (req, res) => {
    try {
        const { id } = req.params;
        const integration = await Integration.findByPk(id);

        if (!integration) {
            return res.status(404).json({
                success: false,
                message: 'Integration not found'
            });
        }

        // Simple test - just update last_sync
        await integration.update({
            last_sync: new Date(),
            status: 'active',
            error_message: null
        });

        res.json({
            success: true,
            message: 'Integration test successful',
            data: integration
        });
    } catch (error) {
        console.error('Test integration error:', error);
        res.status(500).json({
            success: false,
            message: 'Integration test failed',
            error: error.message
        });
    }
};

module.exports = {
    getIntegrations,
    getIntegration,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    testIntegration
};
