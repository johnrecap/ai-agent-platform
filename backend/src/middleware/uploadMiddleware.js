/**
 * Upload Middleware - Multer Configuration
 * AI Agent Platform
 */

const multer = require('multer');
const path = require('path');

// Memory storage (files stored in buffer, not disk)
const storage = multer.memoryStorage();

// File filter - only allow images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }

    cb(new Error('Only image files (JPEG, PNG, GIF, WebP, SVG) are allowed'));
};

// Multer upload instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
    fileFilter: fileFilter
});

module.exports = upload;
