/**
 * Pagination Helper
 * AI Agent Hosting Platform
 * 
 * Reusable pagination logic for consistent API responses
 */

const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } = require('../constants/apiConstants');

/**
 * Calculate offset from page and limit
 * @param {number} page - Current page (1-indexed)
 * @param {number} limit - Items per page
 * @returns {number} Offset for database query
 */
const calculateOffset = (page, limit) => {
    return (parseInt(page) - 1) * parseInt(limit);
};

/**
 * Build pagination response object
 * @param {number} total - Total number of items
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} Pagination metadata
 */
const buildPaginationResponse = (total, page, limit) => {
    const currentPage = parseInt(page) || DEFAULT_PAGE;
    const pageSize = parseInt(limit) || DEFAULT_PAGE_SIZE;

    return {
        total,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
    };
};

/**
 * Parse and validate pagination parameters from request
 * @param {Object} query - Request query object
 * @returns {Object} Validated pagination params
 */
const parsePaginationParams = (query = {}) => {
    const page = Math.max(1, parseInt(query.page) || DEFAULT_PAGE);
    const limit = Math.min(
        MAX_PAGE_SIZE,
        Math.max(1, parseInt(query.limit) || DEFAULT_PAGE_SIZE)
    );
    const offset = calculateOffset(page, limit);

    return { page, limit, offset };
};

module.exports = {
    calculateOffset,
    buildPaginationResponse,
    parsePaginationParams
};
