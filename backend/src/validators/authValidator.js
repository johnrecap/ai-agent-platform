/**
 * Authentication Input Validator
 * AI Agent Hosting Platform
 */

/**
 * Validate login input
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Validation result
 */
const validateLoginInput = (email, password) => {
    const errors = [];

    if (!email) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email format');
    }

    if (!password) {
        errors.push('Password is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate registration input
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Validation result
 */
const validateRegisterInput = (name, email, password) => {
    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Name is required');
    } else if (name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!email) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email format');
    }

    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateLoginInput,
    validateRegisterInput
};
