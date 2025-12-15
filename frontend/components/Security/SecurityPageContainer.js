'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import ActivityLogCard from './ActivityLogCard';
import { useSecurity } from '@/hooks/useSecurity';
import { getSecurityText } from '@/locales/securityLocales';
import { LOG_SEVERITIES } from '@/constants/securityConstants';

/**
 * Security Page Container
 */
const SecurityPageContainer = () => {
    const t = (key) => getSecurityText(key);
    const { logs, stats, loading } = useSecurity();
    const [filterSeverity, setFilterSeverity] = useState('');

    if (loading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    const filteredLogs = filterSeverity
        ? logs.filter(log => log.severity === filterSeverity)
        : logs;

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Shield size={32} className="text-blue-600" />
                        {t('pageTitle')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{t('pageSubtitle')}</p>
                </div>
            </div>

            {/* Stats */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('totalLogs')}</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('criticalEvents')}</p>
                        <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('warningEvents')}</p>
                        <p className="text-3xl font-bold text-yellow-600">{stats.warning}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('todayActivity')}</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.today}</p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="mb-6">
                <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                >
                    <option value="">{t('allSeverities')}</option>
                    {LOG_SEVERITIES.map(severity => (
                        <option key={severity.value} value={severity.value}>
                            {severity.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Activity Logs */}
            <div className="space-y-4">
                {filteredLogs.length > 0 ? (
                    filteredLogs.map(log => (
                        <ActivityLogCard key={log.id} log={log} />
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        {t('noLogs')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecurityPageContainer;
