'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for advanced analytics
 */
export const useAdvancedAnalytics = () => {
    const [summary, setSummary] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const [growthData, setGrowthData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:5000/api/analytics/advanced';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const fetchHeaders = {
        'Authorization': `Bearer ${token}`
    };

    const fetchSummary = async () => {
        try {
            const response = await fetch(`${baseURL}/summary`, { headers: fetchHeaders });
            if (!response.ok) throw new Error('Failed to fetch summary');
            const result = await response.json();
            setSummary(result.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchRevenueData = async (period = 'month') => {
        try {
            const response = await fetch(`${baseURL}/revenue?period=${period}`, { headers: fetchHeaders });
            if (!response.ok) throw new Error('Failed to fetch revenue data');
            const result = await response.json();
            setRevenueData(result.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchGrowthData = async (period = 'month') => {
        try {
            const response = await fetch(`${baseURL}/growth?period=${period}`, { headers: fetchHeaders });
            if (!response.ok) throw new Error('Failed to fetch growth data');
            const result = await response.json();
            setGrowthData(result.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchTopProducts = async (limit = 10) => {
        try {
            const response = await fetch(`${baseURL}/top-products?limit=${limit}`, { headers: fetchHeaders });
            if (!response.ok) throw new Error('Failed to fetch top products');
            const result = await response.json();
            setTopProducts(result.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchPaymentMethods = async () => {
        try {
            const response = await fetch(`${baseURL}/payment-methods`, { headers: fetchHeaders });
            if (!response.ok) throw new Error('Failed to fetch payment methods');
            const result = await response.json();
            setPaymentMethods(result.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchAllData = async (period = 'month') => {
        setLoading(true);
        setError(null);
        await Promise.all([
            fetchSummary(),
            fetchRevenueData(period),
            fetchGrowthData(period),
            fetchTopProducts(),
            fetchPaymentMethods()
        ]);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return {
        summary,
        revenueData,
        growthData,
        topProducts,
        paymentMethods,
        loading,
        error,
        fetchAllData,
        fetchRevenueData,
        fetchGrowthData
    };
};
