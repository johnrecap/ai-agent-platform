/**
 * Settings Controller
 * AI Agent Platform
 */

const { Setting } = require('../models');

/**
 * Get all settings
 * @route GET /api/settings
 * @access Private
 */
const getSettings = async (req, res) => {
    try {
        const { category = '' } = req.query;
        const userId = req.user.id;

        const where = { user_id: userId };
        if (category) where.category = category;

        const settings = await Setting.findAll({
            where,
            order: [['category', 'ASC'], ['key', 'ASC']]
        });

        res.json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch settings',
            error: error.message
        });
    }
};

/**
 * Get single setting
 * @route GET /api/settings/:category/:key
 * @access Private
 */
const getSetting = async (req, res) => {
    try {
        const { category, key } = req.params;
        const userId = req.user.id;

        const setting = await Setting.findOne({
            where: { user_id: userId, category, key }
        });

        if (!setting) {
            return res.status(404).json({
                success: false,
                message: 'Setting not found'
            });
        }

        res.json({
            success: true,
            data: setting
        });
    } catch (error) {
        console.error('Get setting error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch setting',
            error: error.message
        });
    }
};

/**
 * Update or create setting
 * @route PUT /api/settings/:category/:key
 * @access Private
 */
const upsertSetting = async (req, res) => {
    try {
        const { category, key } = req.params;
        const { value } = req.body;
        const userId = req.user.id;

        const [setting, created] = await Setting.findOrCreate({
            where: { user_id: userId, category, key },
            defaults: { value }
        });

        if (!created) {
            await setting.update({ value });
        }

        res.json({
            success: true,
            message: created ? 'Setting created successfully' : 'Setting updated successfully',
            data: setting
        });
    } catch (error) {
        console.error('Upsert setting error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save setting',
            error: error.message
        });
    }
};

/**
 * Batch update settings
 * @route POST /api/settings/batch
 * @access Private
 */
const batchUpdateSettings = async (req, res) => {
    try {
        const { settings } = req.body;
        const userId = req.user.id;

        if (!Array.isArray(settings)) {
            return res.status(400).json({
                success: false,
                message: 'Settings must be an array'
            });
        }

        const promises = settings.map(async ({ category, key, value }) => {
            const [setting, created] = await Setting.findOrCreate({
                where: { user_id: userId, category, key },
                defaults: { value }
            });

            if (!created) {
                await setting.update({ value });
            }

            return setting;
        });

        const results = await Promise.all(promises);

        res.json({
            success: true,
            message: 'Settings updated successfully',
            data: results
        });
    } catch (error) {
        console.error('Batch update settings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update settings',
            error: error.message
        });
    }
};

/**
 * Delete setting
 * @route DELETE /api/settings/:category/:key
 * @access Private
 */
const deleteSetting = async (req, res) => {
    try {
        const { category, key } = req.params;
        const userId = req.user.id;

        const setting = await Setting.findOne({
            where: { user_id: userId, category, key }
        });

        if (!setting) {
            return res.status(404).json({
                success: false,
                message: 'Setting not found'
            });
        }

        await setting.destroy();

        res.json({
            success: true,
            message: 'Setting deleted successfully'
        });
    } catch (error) {
        console.error('Delete setting error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete setting',
            error: error.message
        });
    }
};

module.exports = {
    getSettings,
    getSetting,
    upsertSetting,
    batchUpdateSettings,
    deleteSetting
};
