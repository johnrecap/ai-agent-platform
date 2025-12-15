/**
 * Settings Routes
 * AI Agent Platform
 */

const express = require('express');
const router = express.Router();
const {
    getSettings,
    getSetting,
    upsertSetting,
    batchUpdateSettings,
    deleteSetting
} = require('../controllers/settingsController');
const auth = require('../middleware/auth');

// All settings routes require authentication
router.use(auth);

// @route   GET /api/settings
// @desc    Get all settings for current user
// @access  Private
router.get('/', getSettings);

// @route   POST /api/settings/batch
// @desc    Batch update settings
// @access  Private
router.post('/batch', batchUpdateSettings);

// @route   GET /api/settings/:category/:key
// @desc    Get single setting
// @access  Private
router.get('/:category/:key', getSetting);

// @route   PUT /api/settings/:category/:key
// @desc    Update or create setting
// @access  Private
router.put('/:category/:key', upsertSetting);

// @route   DELETE /api/settings/:category/:key
// @desc    Delete setting
// @access  Private
router.delete('/:category/:key', deleteSetting);

module.exports = router;
