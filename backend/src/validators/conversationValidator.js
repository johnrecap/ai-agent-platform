/**
 * Conversation Input Validator
 * AI Agent Hosting Platform
 */

const { MIN_SEARCH_LENGTH } = require('../constants/apiConstants');

/**
 * Validate search query
 * @param {string} query - Search query
 * @returns {Object} Validation result
 */
const validateSearchQuery = (query) => {
    const errors = [];

    if (!query || query.trim().length === 0) {
        errors.push('Search query is required');
    } else if (query.length < MIN_SEARCH_LENGTH) {
        errors.push(`Search query must be at least ${MIN_SEARCH_LENGTH} characters`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate bulk operation IDs
 * @param {Array} ids - Array of IDs
 * @returns {Object} Validation result
 */
const validateBulkIds = (ids) => {
    const errors = [];

    if (!ids) {
        errors.push('IDs array is required');
    } else if (!Array.isArray(ids)) {
        errors.push('IDs must be an array');
    } else if (ids.length === 0) {
        errors.push('IDs array cannot be empty');
    } else if (!ids.every(id => Number.isInteger(parseInt(id)))) {
        errors.push('All IDs must be valid integers');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate ID parameter
 * @param {string|number} id - ID to validate
 * @returns {Object} Validation result
 */
const validateId = (id) => {
    const errors = [];

    if (!id) {
        errors.push('ID is required');
    } else if (isNaN(parseInt(id))) {
        errors.push('Invalid ID format');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateSearchQuery,
    validateBulkIds,
    validateId
};
