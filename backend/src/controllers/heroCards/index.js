/**
 * Hero Cards Controllers Index
 * AI Agent Hosting Platform
 */

const { getActiveCards, getAllCards } = require('./getHeroCardsController');
const { uploadHeroCard } = require('./uploadHeroCardController');
const { updateHeroCard } = require('./updateHeroCardController');
const { deleteHeroCard } = require('./deleteHeroCardController');
const { reorderCards } = require('./reorderCardsController');

module.exports = {
    getActiveCards,
    getAllCards,
    uploadHeroCard,
    updateHeroCard,
    deleteHeroCard,
    reorderCards
};
