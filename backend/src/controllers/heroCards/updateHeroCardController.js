/**
 * Update Hero Card Controller
 * AI Agent Hosting Platform
 */

const { HeroCard } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   PUT /api/hero-cards/:id
 * @desc    Update hero card
 * @access  Private/Admin
 */
const updateHeroCard = async (req, res, next) => {
    try {
        const { title, is_active } = req.body;

        const card = await HeroCard.findByPk(req.params.id);
        if (!card) {
            throw new ApiError(404, 'Hero card not found');
        }

        if (title !== undefined) {
            if (title.trim().length < 3) {
                throw new ApiError(400, 'Title must be at least 3 characters');
            }
            card.title = title.trim();
        }

        if (is_active !== undefined) {
            card.is_active = Boolean(is_active);
        }

        await card.save();

        res.json(success(card, 'Hero card updated successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { updateHeroCard };
