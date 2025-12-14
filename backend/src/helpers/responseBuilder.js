/**
 * Response Builder Helper
 * AI Agent Hosting Platform
 * 
 * Standardize API response formats
 */

/**
 * Build success response
 * @param {any} data - Response data
 * @param {string} message - Optional success message
 * @returns {Object} Standardized success response
 */
const success = (data, message = null) => {
    const response = {
        success: true,
        data
    };

    if (message) {
        response.message = message;
    }

    return response;
};

/**
 * Build error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Standardized error response
 */
const error = (message, statusCode = 500) => {
    return {
        success: false,
        error: message,
        statusCode
    };
};

/**
 * Build paginated success response
 * @param {Array} data - Response data array
 * @param {Object} pagination - Pagination metadata
 * @param {string} message - Optional success message
 * @returns {Object} Standardized paginated response
 */
const paginatedSuccess = (data, pagination, message = null) => {
    const response = {
        success: true,
        data,
        pagination
    };

    if (message) {
        response.message = message;
    }

    return response;
};

module.exports = {
    success,
    error,
    paginatedSuccess
};
