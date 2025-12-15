/**
 * Documentation Controller
 * AI Agent Platform
 */

const { Documentation } = require('../models');
const { Op } = require('sequelize');

/**
 * Get all documentation
 * @route GET /api/docs
 * @access Public
 */
const getDocs = async (req, res) => {
    try {
        const { category = '', search = '' } = req.query;

        const where = { is_published: true };
        if (category) where.category = category;
        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { content: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const docs = await Documentation.findAll({
            where,
            order: [['category', 'ASC'], ['order', 'ASC']]
        });

        res.json({
            success: true,
            data: docs
        });
    } catch (error) {
        console.error('Get docs error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch documentation',
            error: error.message
        });
    }
};

/**
 * Get single doc by slug
 * @route GET /api/docs/:slug
 * @access Public
 */
const getDocBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const doc = await Documentation.findOne({
            where: { slug, is_published: true }
        });

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'Documentation not found'
            });
        }

        res.json({
            success: true,
            data: doc
        });
    } catch (error) {
        console.error('Get doc error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch documentation',
            error: error.message
        });
    }
};

/**
 * Create documentation (Admin)
 * @route POST /api/docs
 * @access Private/Admin
 */
const createDoc = async (req, res) => {
    try {
        const { title, slug, content, category, order = 0 } = req.body;

        const doc = await Documentation.create({
            title,
            slug,
            content,
            category,
            order
        });

        res.status(201).json({
            success: true,
            message: 'Documentation created successfully',
            data: doc
        });
    } catch (error) {
        console.error('Create doc error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create documentation',
            error: error.message
        });
    }
};

/**
 * Update documentation (Admin)
 * @route PUT /api/docs/:id
 * @access Private/Admin
 */
const updateDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const doc = await Documentation.findByPk(id);

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'Documentation not found'
            });
        }

        await doc.update(updateData);

        res.json({
            success: true,
            message: 'Documentation updated successfully',
            data: doc
        });
    } catch (error) {
        console.error('Update doc error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update documentation',
            error: error.message
        });
    }
};

/**
 * Delete documentation (Admin)
 * @route DELETE /api/docs/:id
 * @access Private/Admin
 */
const deleteDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await Documentation.findByPk(id);

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'Documentation not found'
            });
        }

        await doc.destroy();

        res.json({
            success: true,
            message: 'Documentation deleted successfully'
        });
    } catch (error) {
        console.error('Delete doc error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete documentation',
            error: error.message
        });
    }
};

module.exports = {
    getDocs,
    getDocBySlug,
    createDoc,
    updateDoc,
    deleteDoc
};
