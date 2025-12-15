'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for automation management
 */
export const useAutomation = () => {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:5000/api/automation';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const fetchHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const fetchRules = async (status = '') => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (status) params.append('status', status);

            const response = await fetch(`${baseURL}?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch automation rules');

            const result = await response.json();
            setRules(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createRule = async (ruleData) => {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: fetchHeaders,
                body: JSON.stringify(ruleData)
            });

            if (!response.ok) throw new Error('Failed to create automation rule');

            const result = await response.json();
            await fetchRules();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const updateRule = async (id, ruleData) => {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: 'PUT',
                headers: fetchHeaders,
                body: JSON.stringify(ruleData)
            });

            if (!response.ok) throw new Error('Failed to update automation rule');

            const result = await response.json();
            await fetchRules();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const deleteRule = async (id) => {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete automation rule');

            await fetchRules();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const executeRule = async (id) => {
        try {
            const response = await fetch(`${baseURL}/${id}/execute`, {
                method: 'POST',
                headers: fetchHeaders
            });

            if (!response.ok) throw new Error('Failed to execute automation rule');

            await fetchRules();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    return {
        rules,
        loading,
        error,
        fetchRules,
        createRule,
        updateRule,
        deleteRule,
        executeRule
    };
};
