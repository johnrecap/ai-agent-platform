/**
 * User Input Validator
 * AI Agent Hosting Platform
 */

const { isValidRole } = require('../constants/userRoles');

/**
 * Validate user creation input
 * @param {Object} data - User data
 * @returns {Object} Validation result
 */
const validateCreateUser = (data) => {
    const errors = [];
    const { name, email, password, role } = data;

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

    if (role && !isValidRole(role)) {
        errors.push('Invalid role');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate user update input
 * @param {Object} data - User update data
 * @returns {Object} Validation result
 */
const validateUpdateUser = (data) => {
    const errors = [];
    const { name, email, password, role } = data;

    if (name !== undefined) {
        if (!name || name.trim().length === 0) {
            errors.push('Name cannot be empty');
        } else if (name.length < 2) {
            errors.push('Name must be at least 2 characters');
        }
    }

    if (email !== undefined) {
        if (!email) {
            errors.push('Email cannot be empty');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Invalid email format');
        }
    }

    if (password !== undefined && password.length > 0) {
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters');
        }
    }

    if (role !== undefined && !isValidRole(role)) {
        errors.push('Invalid role');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateCreateUser,
    validateUpdateUser
};
