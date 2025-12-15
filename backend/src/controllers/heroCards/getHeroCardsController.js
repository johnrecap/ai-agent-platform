/**
 * Get Hero Cards Controller
 * AI Agent Hosting Platform
 */

const { HeroCard } = require('../../models');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   GET /api/hero-cards
 * @desc    Get active hero cards (public)
 * @access  Public
 */
const getActiveCards = async (req, res, next) => {
    try {
        const cards = await HeroCard.findAll({
            where: { is_active: true },
            order: [['display_order', 'ASC']],
            attributes: ['id', 'title', 'image_url', 'display_order']
        });

        res.json(success(cards));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/hero-cards/all
 * @desc    Get all hero cards (admin)
 * @access  Private/Admin
 */
const getAllCards = async (req, res, next) => {
    try {
        const cards = await HeroCard.findAll({
            order: [['display_order', 'ASC']]
        });

        res.json(success(cards));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getActiveCards,
    getAllCards
};
