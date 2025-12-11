/**
 * Helper Functions
 * AI Agent Hosting Platform
 */

/**
 * Generate a unique session ID
 * @returns {string} Unique session ID
 */
const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate a random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
const generateRandomString = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Slugify a string for URL use
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start
        .replace(/-+$/, '');         // Trim - from end
};

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Paginate array results
 * @param {Array} array - Array to paginate
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Object} Paginated result
 */
const paginate = (array, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const data = array.slice(offset, offset + limit);

    return {
        data,
        pagination: {
            total: array.length,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(array.length / limit)
        }
    };
};

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
const sanitize = (input) => {
    if (typeof input !== 'string') return input;
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
};

/**
 * Extract error message from error object
 * @param {Error|string} error - Error to extract message from
 * @returns {string} Error message
 */
const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return 'An unknown error occurred';
};

module.exports = {
    generateSessionId,
    generateRandomString,
    slugify,
    formatDate,
    paginate,
    sleep,
    sanitize,
    getErrorMessage
};
