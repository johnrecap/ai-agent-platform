'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for products management
 * Handles fetching, creating, updating, and deleting products
 */
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch products
    const fetchProducts = async (searchQuery = '', category = '', status = '') => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...(searchQuery && { search: searchQuery }),
                ...(category && { category }),
                ...(status && { status })
            });

            const response = await fetch(`http://localhost:5000/api/products?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            const result = await response.json();
            setProducts(result.data);
            setTotalPages(result.pagination.pages);
        } catch (err) {
            setError(err.message);
            console.error('Fetch products error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create product
    const createProduct = async (productData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) throw new Error('Failed to create product');

            const result = await response.json();
            await fetchProducts(); // Refresh list
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Update product
    const updateProduct = async (id, productData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) throw new Error('Failed to update product');

            const result = await response.json();
            await fetchProducts(); // Refresh list
            return { success: true, data: result.data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete product');

            await fetchProducts(); // Refresh list
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
    }, [page]);

    return {
        products,
        loading,
        error,
        page,
        totalPages,
        setPage,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
};
