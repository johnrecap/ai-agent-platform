/**
 * Cloudinary Configuration
 * AI Agent Platform - Avatar Upload System
 */

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Verify configuration (optional, for debugging)
if (process.env.NODE_ENV === 'development') {
    console.log('📸 Cloudinary configured:', {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing'
    });
}

module.exports = cloudinary;
