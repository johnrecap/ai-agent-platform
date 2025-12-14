/**
 * User Roles and Permissions Constants
 * AI Agent Hosting Platform
 */

const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

const DEFAULT_ROLE = 'user';

/**
 * Check if role is admin
 * @param {string} role - User role
 * @returns {boolean}
 */
const isAdmin = (role) => role === ROLES.ADMIN;

/**
 * Check if role is valid
 * @param {string} role - User role
 * @returns {boolean}
 */
const isValidRole = (role) => Object.values(ROLES).includes(role);

module.exports = {
    ROLES,
    DEFAULT_ROLE,
    isAdmin,
    isValidRole
};
