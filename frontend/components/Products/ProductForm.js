'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ProductFormFields from './ProductFormFields';
import { validateProduct } from '@/lib/productsUtils';
import { getProductText } from '@/locales/productsLocales';

/**
 * Product Form Component
 * Handles form state and submission logic
 */
const ProductForm = ({ product, onSubmit, onCancel, isLoading }) => {
    const t = (key) => getProductText(key);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        status: 'active',
        stock_quantity: '0',
        sku: '',
        image_url: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '0.00',
                category: product.category || '',
                status: product.status || 'active',
                stock_quantity: product.stock_quantity || '0',
                sku: product.sku || '',
                image_url: product.image_url || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateProduct(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product ? t('formTitleEdit') : t('formTitleCreate')}
                    </h2>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <ProductFormFields formData={formData} errors={errors} onChange={handleChange} />

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? t('saving') : (product ? t('updateProduct') : t('createProduct'))}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
