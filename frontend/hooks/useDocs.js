'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for documentation management
 */
export const useDocs = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:5000/api/docs';

    const fetchDocs = async (category = '', search = '') => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (category) params.append('category', category);
            if (search) params.append('search', search);

            const response = await fetch(`${baseURL}?${params}`);

            if (!response.ok) throw new Error('Failed to fetch docs');

            const result = await response.json();
            setDocs(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getDocBySlug = async (slug) => {
        try {
            const response = await fetch(`${baseURL}/${slug}`);

            if (!response.ok) throw new Error('Failed to fetch doc');

            const result = await response.json();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    return {
        docs,
        loading,
        error,
        fetchDocs,
        getDocBySlug
    };
};
