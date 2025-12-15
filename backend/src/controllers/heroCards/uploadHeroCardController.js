/**
 * Upload Hero Card Controller
 * AI Agent Hosting Platform
 */

const cloudinary = require('../../config/cloudinaryConfig');
const sharp = require('sharp');
const { HeroCard } = require('../../models');
const { ApiError } = require('../../middleware/errorHandler');
const { success } = require('../../helpers/responseBuilder');

/**
 * @route   POST /api/hero-cards
 * @desc    Upload new hero card image
 * @access  Private/Admin
 */
const uploadHeroCard = async (req, res, next) => {
    try {
        const { title } = req.body;

        if (!req.file) {
            throw new ApiError(400, 'No image file uploaded');
        }

        if (!title || title.trim().length < 3) {
            throw new ApiError(400, 'Card title is required (min 3 characters)');
        }

        // Process image with sharp (resize + optimize)
        const processedImage = await sharp(req.file.buffer)
            .resize(800, 500, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 90 })
            .toBuffer();

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'hero-cards',
                    public_id: `hero_${Date.now()}`,
                    resource_type: 'image',
                    transformation: [
                        { width: 800, height: 500, crop: 'fill' },
                        { quality: 'auto:good' },
                        { fetch_format: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(processedImage);
        });

        // Get next display order
        const maxOrder = await HeroCard.max('display_order') || 0;

        // Create hero card record
        const card = await HeroCard.create({
            title: title.trim(),
            image_url: result.secure_url,
            image_public_id: result.public_id,
            display_order: maxOrder + 1,
            is_active: true
        });

        res.status(201).json(success(card, 'Hero card uploaded successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = { uploadHeroCard };
