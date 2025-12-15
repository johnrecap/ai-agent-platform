/**
 * Hero Cards Routes
 * AI Agent Hosting Platform
 */

const express = require('express');
const router = express.Router();
const {
    getActiveCards,
    getAllCards,
    uploadHeroCard,
    updateHeroCard,
    deleteHeroCard,
    reorderCards
} = require('../controllers/heroCards');
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

/**
 * @route   GET /api/hero-cards
 * @desc    Get active hero cards
 * @access  Public
 */
router.get('/', getActiveCards);

// Protected routes (admin only)
router.use(auth, adminAuth);

/**
 * @route   GET /api/hero-cards/all
 * @desc    Get all hero cards
 * @access  Private/Admin
 */
router.get('/all', getAllCards);

/**
 * @route   POST /api/hero-cards
 * @desc    Upload new hero card
 * @access  Private/Admin
 */
router.post('/', upload.single('image'), uploadHeroCard);

/**
 * @route   PUT /api/hero-cards/reorder
 * @desc    Reorder hero cards
 * @access  Private/Admin
 */
router.put('/reorder', reorderCards);

/**
 * @route   PUT /api/hero-cards/:id
 * @desc    Update hero card
 * @access  Private/Admin
 */
router.put('/:id', updateHeroCard);

/**
 * @route   DELETE /api/hero-cards/:id
 * @desc    Delete hero card
 * @access  Private/Admin
 */
router.delete('/:id', deleteHeroCard);

module.exports = router;
