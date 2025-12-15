'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for security management
 */
export const useSecurity = () => {
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:5000/api/security';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const fetchHeaders = {
        'Authorization': `Bearer ${token}`
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`${baseURL}/stats`, {
                headers: fetchHeaders
            });

            if (!response.ok) throw new Error('Failed to fetch stats');

            const result = await response.json();
            setStats(result.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchLogs = async (page = 1, limit = 20, severity = '', action = '') => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);
            if (severity) params.append('severity', severity);
            if (action) params.append('action', action);

            const response = await fetch(`${baseURL}/logs?${params}`, {
                headers: fetchHeaders
            });

            if (!response.ok) throw new Error('Failed to fetch logs');

            const result = await response.json();
            setLogs(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createLog = async (logData) => {
        try {
            const response = await fetch(`${baseURL}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(logData)
            });

            if (!response.ok) throw new Error('Failed to create log');

            await fetchLogs();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchStats();
        fetchLogs();
    }, []);

    return {
        logs,
        stats,
        loading,
        error,
        fetchLogs,
        fetchStats,
        createLog
    };
};
