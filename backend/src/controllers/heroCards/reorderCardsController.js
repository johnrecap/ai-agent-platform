/**
 * Reorder Hero Cards Controller
 * AI Agent Hosting Platform
 */

const { HeroCard } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   PUT /api/hero-cards/reorder
 * @desc    Update display order of hero cards
 * @access  Private/Admin
 */
const reorderCards = async (req, res, next) => {
    try {
        const { cardOrders } = req.body;

        if (!Array.isArray(cardOrders) || cardOrders.length === 0) {
            throw new ApiError(400, 'cardOrders must be a non-empty array');
        }

        // Update each card's display order
        const updatePromises = cardOrders.map(({ id, display_order }) =>
            HeroCard.update(
                { display_order },
                { where: { id } }
            )
        );

        await Promise.all(updatePromises);

        // Fetch updated cards
        const cards = await HeroCard.findAll({
            order: [['display_order', 'ASC']]
        });

        res.json(success(cards, 'Cards reordered successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { reorderCards };
