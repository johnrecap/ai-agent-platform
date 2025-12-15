'use client';

import { useState } from 'react';

/**
 * Custom hook for Dify integration
 */
export const useDify = () => {
    const [syncing, setSyncing] = useState(false);
    const [testing, setTesting] = useState(false);
    const [status, setStatus] = useState(null);

    const baseURL = 'http://localhost:5000/api/dify';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const fetchHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    /**
     * Test Dify connection
     */
    const testConnection = async (apiKey, appId) => {
        setTesting(true);

        try {
            const response = await fetch(`${baseURL}/test`, {
                method: 'POST',
                headers: fetchHeaders,
                body: JSON.stringify({ apiKey, appId })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        } finally {
            setTesting(false);
        }
    };

    /**
     * Sync conversations from Dify
     */
    const syncNow = async (agentId) => {
        setSyncing(true);

        try {
            const response = await fetch(`${baseURL}/sync`, {
                method: 'POST',
                headers: fetchHeaders,
                body: JSON.stringify({ agentId })
            });

            if (!response.ok) {
                throw new Error('Sync failed');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        } finally {
            setSyncing(false);
        }
    };

    /**
     * Get Dify status
     */
    const getStatus = async (agentId) => {
        try {
            const params = agentId ? `?agentId=${agentId}` : '';
            const response = await fetch(`${baseURL}/status${params}`, {
                headers: fetchHeaders
            });

            const result = await response.json();
            setStatus(result.data);
            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    };

    return {
        syncing,
        testing,
        status,
        testConnection,
        syncNow,
        getStatus
    };
};
