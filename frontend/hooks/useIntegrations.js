'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for integrations management
 */
export const useIntegrations = () => {
    const [integrations, setIntegrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:5000/api/integrations';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const fetchHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const fetchIntegrations = async (type = '', status = '') => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (type) params.append('type', type);
            if (status) params.append('status', status);

            const response = await fetch(`${baseURL}?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch integrations');

            const result = await response.json();
            setIntegrations(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createIntegration = async (integrationData) => {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: fetchHeaders,
                body: JSON.stringify(integrationData)
            });

            if (!response.ok) throw new Error('Failed to create integration');

            const result = await response.json();
            await fetchIntegrations();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const updateIntegration = async (id, integrationData) => {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: 'PUT',
                headers: fetchHeaders,
                body: JSON.stringify(integrationData)
            });

            if (!response.ok) throw new Error('Failed to update integration');

            const result = await response.json();
            await fetchIntegrations();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const deleteIntegration = async (id) => {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete integration');

            await fetchIntegrations();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const testIntegration = async (id) => {
        try {
            const response = await fetch(`${baseURL}/${id}/test`, {
                method: 'POST',
                headers: fetchHeaders
            });

            if (!response.ok) throw new Error('Integration test failed');

            await fetchIntegrations();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchIntegrations();
    }, []);

    return {
        integrations,
        loading,
        error,
        fetchIntegrations,
        createIntegration,
        updateIntegration,
        deleteIntegration,
        testIntegration
    };
};
