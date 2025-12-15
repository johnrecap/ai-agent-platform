/**
 * Chat Services Index
 * AI Agent Hosting Platform
 * 
 * Central export for all chat services
 */

const { processStream, collectStreamResponse } = require('./streamHandler');
const { saveConversation } = require('./conversationSaver');

module.exports = {
    processStream,
    collectStreamResponse,
    saveConversation
};
