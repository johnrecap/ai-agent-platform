/**
 * API-Related Constants
 * AI Agent Hosting Platform
 */

// Dify API Configuration
const DIFY_API_URL = 'https://api.dify.ai/v1';

// Pagination
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

// Timeouts (milliseconds)
const REQUEST_TIMEOUT = 60000; // 60 seconds
const STREAM_TIMEOUT = 120000; // 120 seconds

// Search
const MIN_SEARCH_LENGTH = 2;
const MAX_SEARCH_RESULTS = 20;

// Upload Limits
const MAX_JSON_SIZE = '10mb';
const MAX_URL_ENCODED_SIZE = '10mb';

// Compression
const COMPRESSION_THRESHOLD = 1024; // 1kb

/**
 * Get pagination parameters with validation
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Object} Validated pagination params
 */
const getPaginationParams = (page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE) => {
    const validPage = Math.max(1, parseInt(page) || DEFAULT_PAGE);
    const validLimit = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(limit) || DEFAULT_PAGE_SIZE));
    const offset = (validPage - 1) * validLimit;

    return { page: validPage, limit: validLimit, offset };
};

module.exports = {
    DIFY_API_URL,
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
    REQUEST_TIMEOUT,
    STREAM_TIMEOUT,
    MIN_SEARCH_LENGTH,
    MAX_SEARCH_RESULTS,
    MAX_JSON_SIZE,
    MAX_URL_ENCODED_SIZE,
    COMPRESSION_THRESHOLD,
    getPaginationParams
};
