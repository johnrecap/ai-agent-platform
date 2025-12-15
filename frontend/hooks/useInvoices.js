'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for invoices management
 */
export const useInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchInvoices = async (searchQuery = '', status = '') => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...(searchQuery && { search: searchQuery }),
                ...(status && { status })
            });

            const response = await fetch(`http://localhost:5000/api/invoices?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch invoices');

            const result = await response.json();
            setInvoices(result.data);
            setTotalPages(result.pagination.pages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createInvoice = async (invoiceData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(invoiceData)
            });

            if (!response.ok) throw new Error('Failed to create invoice');

            const result = await response.json();
            await fetchInvoices();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const updateInvoice = async (id, invoiceData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/invoices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(invoiceData)
            });

            if (!response.ok) throw new Error('Failed to update invoice');

            const result = await response.json();
            await fetchInvoices();
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const deleteInvoice = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/invoices/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete invoice');

            await fetchInvoices();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [page]);

    return {
        invoices,
        loading,
        error,
        page,
        totalPages,
        setPage,
        fetchInvoices,
        createInvoice,
        updateInvoice,
        deleteInvoice
    };
};
