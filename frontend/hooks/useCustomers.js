'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for customers management
 * Handles fetching, creating, updating, and deleting customers
 */
export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch customers
    const fetchCustomers = async (searchQuery = '', status = '', type = '') => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...(searchQuery && { search: searchQuery }),
                ...(status && { status }),
                ...(type && { type })
            });

            const response = await fetch(`http://localhost:5000/api/customers?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch customers');

            const result = await response.json();
            setCustomers(result.data);
            setTotalPages(result.pagination.pages);
        } catch (err) {
            setError(err.message);
            console.error('Fetch customers error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create customer
    const createCustomer = async (customerData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(customerData)
            });

            if (!response.ok) throw new Error('Failed to create customer');

            const result = await response.json();
            await fetchCustomers(); // Refresh list
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Update customer
    const updateCustomer = async (id, customerData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(customerData)
            });

            if (!response.ok) throw new Error('Failed to update customer');

            const result = await response.json();
            await fetchCustomers(); // Refresh list
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Delete customer
    const deleteCustomer = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete customer');

            await fetchCustomers(); // Refresh list
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Load customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, [page]);

    return {
        customers,
        loading,
        error,
        page,
        totalPages,
        setPage,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer
    };
};
