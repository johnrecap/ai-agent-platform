'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import CustomerFormFields from './CustomerFormFields';
import { validateCustomer } from '@/lib/customersUtils';
import { getCustomerText } from '@/locales/customersLocales';

/**
 * Customer Form Component
 * Handles form state and submission logic
 */
const CustomerForm = ({ customer, onSubmit, onCancel, isLoading }) => {
    const t = (key) => getCustomerText(key);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        customer_type: 'individual',
        address: '',
        city: '',
        country: '',
        postal_code: '',
        status: 'active',
        notes: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name || '',
                email: customer.email || '',
                phone: customer.phone || '',
                company: customer.company || '',
                customer_type: customer.customer_type || 'individual',
                address: customer.address || '',
                city: customer.city || '',
                country: customer.country || '',
                postal_code: customer.postal_code || '',
                status: customer.status || 'active',
                notes: customer.notes || ''
            });
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateCustomer(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {customer ? t('formTitleEdit') : t('formTitleCreate')}
                    </h2>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <CustomerFormFields formData={formData} errors={errors} onChange={handleChange} />

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
                            {isLoading ? t('saving') : (customer ? t('updateCustomer') : t('createCustomer'))}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;
