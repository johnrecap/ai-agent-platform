/**
 * Auth Controllers Index
 * AI Agent Hosting Platform
 * 
 * Central export for all authentication controllers
 */

const { login } = require('./loginController');
const { register } = require('./registerController');
const { getMe, logout } = require('./profileController');

module.exports = {
    login,
    register,
    getMe,
    logout
};
