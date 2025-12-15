'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for settings management
 */
export const useSettings = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:5000/api/settings';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const fetchHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const fetchSettings = async (category = '') => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (category) params.append('category', category);

            const response = await fetch(`${baseURL}?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch settings');

            const result = await response.json();
            setSettings(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getSetting = async (category, key) => {
        try {
            const response = await fetch(`${baseURL}/${category}/${key}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch setting');

            const result = await response.json();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const upsertSetting = async (category, key, value) => {
        try {
            const response = await fetch(`${baseURL}/${category}/${key}`, {
                method: 'PUT',
                headers: fetchHeaders,
                body: JSON.stringify({ value })
            });

            if (!response.ok) throw new Error('Failed to save setting');

            const result = await response.json();
            await fetchSettings();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const batchUpdate = async (settingsArray) => {
        try {
            const response = await fetch(`${baseURL}/batch`, {
                method: 'POST',
                headers: fetchHeaders,
                body: JSON.stringify({ settings: settingsArray })
            });

            if (!response.ok) throw new Error('Failed to update settings');

            const result = await response.json();
            await fetchSettings();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const deleteSetting = async (category, key) => {
        try {
            const response = await fetch(`${baseURL}/${category}/${key}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete setting');

            await fetchSettings();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return {
        settings,
        loading,
        error,
        fetchSettings,
        getSetting,
        upsertSetting,
        batchUpdate,
        deleteSetting
    };
};
