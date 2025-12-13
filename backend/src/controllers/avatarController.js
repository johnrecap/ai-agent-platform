/**
 * Avatar Controller
 * AI Agent Platform - Avatar Upload System
 */

const cloudinary = require('../config/cloudinaryConfig');
const sharp = require('sharp');
const Agent = require('../models/Agent');

/**
 * Upload or update agent avatar
 */
exports.uploadAvatar = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        // Find agent
        const agent = await Agent.findByPk(id);
        if (!agent) {
            return res.status(404).json({
                success: false,
                error: 'Agent not found'
            });
        }

        // Process image with sharp (resize + optimize)
        const processedImage = await sharp(req.file.buffer)
            .resize(400, 400, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 85 })
            .toBuffer();

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'agent-avatars',
                    public_id: `agent_${id}_${Date.now()}`,
                    resource_type: 'image',
                    transformation: [
                        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
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

        // Delete old avatar from Cloudinary if exists
        if (agent.avatar_public_id) {
            try {
                await cloudinary.uploader.destroy(agent.avatar_public_id);
            } catch (error) {
                console.warn('Failed to delete old avatar:', error.message);
            }
        }

        // Update database
        await agent.update({
            avatar_url: result.secure_url,
            avatar_public_id: result.public_id,
            avatar_updated_at: new Date()
        });

        res.json({
            success: true,
            message: 'Avatar uploaded successfully',
            data: {
                avatar_url: result.secure_url,
                updated_at: agent.avatar_updated_at
            }
        });

    } catch (error) {
        console.error('Avatar upload error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to upload avatar'
        });
    }
};

/**
 * Delete agent avatar
 */
exports.deleteAvatar = async (req, res) => {
    try {
        const { id } = req.params;

        // Find agent
        const agent = await Agent.findByPk(id);
        if (!agent) {
            return res.status(404).json({
                success: false,
                error: 'Agent not found'
            });
        }

        if (!agent.avatar_public_id) {
            return res.status(400).json({
                success: false,
                error: 'Agent has no avatar to delete'
            });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(agent.avatar_public_id);

        // Update database
        await agent.update({
            avatar_url: null,
            avatar_public_id: null,
            avatar_updated_at: new Date()
        });

        res.json({
            success: true,
            message: 'Avatar deleted successfully'
        });

    } catch (error) {
        console.error('Avatar delete error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete avatar'
        });
    }
};
