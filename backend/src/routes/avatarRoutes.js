/**
 * Avatar Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const avatarController = require('../controllers/avatarController');
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/auth');

// Upload/Update avatar
router.post('/agents/:id/avatar',
    auth,
    upload.single('avatar'),
    avatarController.uploadAvatar
);

// Delete avatar
router.delete('/agents/:id/avatar',
    auth,
    avatarController.deleteAvatar
);

module.exports = router;
