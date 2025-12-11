/**
 * Auth Helper Functions
 * AI Agent Hosting Platform
 */

import api from './api';

/**
 * Login user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{token: string, user: object}>}
 */
export const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { token, user } = response.data.data;

    // Store in localStorage
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    return { token, user };
};

/**
 * Logout user
 */
export const logout = async () => {
    try {
        await api.post('/api/auth/logout');
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    }
};

/**
 * Get current user from localStorage
 * @returns {object|null}
 */
export const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

/**
 * Get current token
 * @returns {string|null}
 */
export const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isLoggedIn = () => {
    return !!getToken();
};

/**
 * Check if user is admin
 * @returns {boolean}
 */
export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === 'admin';
};

/**
 * Refresh user data from server
 * @returns {Promise<object>}
 */
export const refreshUser = async () => {
    const response = await api.get('/api/auth/me');
    const user = response.data.data.user;

    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
};

// Alias for getCurrentUser
export const getUser = getCurrentUser;

