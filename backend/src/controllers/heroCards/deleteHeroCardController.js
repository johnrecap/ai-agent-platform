/**
 * Delete Hero Card Controller
 * AI Agent Hosting Platform
 */

const cloudinary = require('../../config/cloudinaryConfig');
const { HeroCard } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   DELETE /api/hero-cards/:id
 * @desc    Delete hero card and its Cloudinary image
 * @access  Private/Admin
 */
const deleteHeroCard = async (req, res, next) => {
    try {
        const card = await HeroCard.findByPk(req.params.id);
        if (!card) {
            throw new ApiError(404, 'Hero card not found');
        }

        // Delete from Cloudinary if exists
        if (card.image_public_id) {
            try {
                await cloudinary.uploader.destroy(card.image_public_id);
            } catch (error) {
                console.warn('Failed to delete image from Cloudinary:', error.message);
            }
        }

        await card.destroy();

        res.json(success(null, 'Hero card deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { deleteHeroCard };
