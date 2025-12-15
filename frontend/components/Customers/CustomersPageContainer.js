'use client';

import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import CustomersTable from './CustomersTable';
import CustomerForm from './CustomerForm';
import { useCustomers } from '@/hooks/useCustomers';
import { getCustomerText } from '@/locales/customersLocales';
import toast from 'react-hot-toast';

/**
 * Customers Page Container
 * Main container component for customers management
 */
const CustomersPageContainer = () => {
    const t = (key) => getCustomerText(key);
    const {
        customers,
        loading,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer
    } = useCustomers();

    const [showForm, setShowForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCreate = () => {
        setEditingCustomer(null);
        setShowForm(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowForm(true);
    };

    const handleSubmit = async (formData) => {
        setFormLoading(true);
        const result = editingCustomer
            ? await updateCustomer(editingCustomer.id, formData)
            : await createCustomer(formData);

        setFormLoading(false);

        if (result.success) {
            toast.success(t(editingCustomer ? 'customerUpdated' : 'customerCreated'));
            setShowForm(false);
            setEditingCustomer(null);
        } else {
            toast.error(result.error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(t('deleteConfirm'))) return;

        const result = await deleteCustomer(id);
        if (result.success) {
            toast.success(t('customerDeleted'));
        } else {
            toast.error(result.error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        fetchCustomers(e.target.value);
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('pageTitle')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{t('pageSubtitle')}</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    {t('addCustomer')}
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter size={20} />
                    {t('filter')}
                </button>
            </div>

            <CustomersTable
                customers={customers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
            />

            {showForm && (
                <CustomerForm
                    customer={editingCustomer}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingCustomer(null);
                    }}
                    isLoading={formLoading}
                />
            )}
        </div>
    );
};

export default CustomersPageContainer;
