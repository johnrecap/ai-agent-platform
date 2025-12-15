'use client';

import { useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';
import { getAdvancedAnalyticsText } from '@/locales/advancedAnalyticsLocales';
import { TIME_PERIODS } from '@/constants/advancedAnalyticsConstants';
import SalesOverview from '../Dashboard/SalesOverview';
import SubscriberChart from '../Dashboard/SubscriberChart';
import { formatCurrency } from '@/lib/customersUtils';

/**
 * Advanced Analytics Page Container
 * Reuses existing chart components from Dashboard
 */
const AdvancedAnalyticsPageContainer = () => {
    const t = (key) => getAdvancedAnalyticsText(key);
    const [period, setPeriod] = useState('month');
    const {
        summary,
        revenueData,
        growthData,
        loading,
        fetchAllData
    } = useAdvancedAnalytics();

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
        fetchAllData(newPeriod);
    };

    const handleRefresh = () => {
        fetchAllData(period);
    };

    const handleExport = () => {
        // Export functionality
        alert('Export feature - Coming soon!');
    };

    if (loading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('pageTitle')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{t('pageSubtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <RefreshCw size={18} />
                        {t('refresh')}
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Download size={18} />
                        {t('export')}
                    </button>
                </div>
            </div>

            {/* Period Selector */}
            <div className="mb-6">
                <div className="flex gap-2">
                    {TIME_PERIODS.map(p => (
                        <button
                            key={p.value}
                            onClick={() => handlePeriodChange(p.value)}
                            className={`px-4 py-2 rounded-lg transition-colors ${period === p.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('totalRevenue')}</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                            {formatCurrency(summary.totalRevenue)}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('totalCustomers')}</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{summary.totalCustomers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('totalProducts')}</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{summary.totalProducts}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('pendingInvoices')}</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{summary.pendingInvoices}</p>
                    </div>
                </div>
            )}

            {/* Charts - Reuse from Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesOverview />
                <SubscriberChart />
            </div>
        </div>
    );
};

export default AdvancedAnalyticsPageContainer;
