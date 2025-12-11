/**
 * API Client - Axios Configuration
 * AI Agent Hosting Platform
 */

import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Request interceptor - add JWT token
api.interceptors.request.use(
    (config) => {
        // Only access localStorage on client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Redirect to login if not already there
                if (!window.location.pathname.includes('/login')) {
                    toast.error('Session expired. Please login again.');
                    window.location.href = '/login';
                }
            }
        }

        // Handle network errors
        if (!error.response) {
            toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

export default api;
