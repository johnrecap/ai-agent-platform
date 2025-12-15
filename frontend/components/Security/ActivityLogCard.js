'use client';

import React from 'react';
import { getSeverityColor, formatIPAddress, parseUserAgent } from '@/lib/securityUtils';
import { getSecurityText } from '@/locales/securityLocales';

/**
 * Activity Log Card Component
 */
const ActivityLogCard = ({ log }) => {
    const t = (key) => getSecurityText(key);
    const { browser, os } = parseUserAgent(log.user_agent);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{log.action}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(log.severity)}`}>
                            {t(log.severity)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {log.user?.name || t('system')} • {log.entity_type && `${log.entity_type}`}
                    </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.created_at).toLocaleString()}
                </span>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span>🌐</span>
                    <span>{formatIPAddress(log.ip_address)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span>💻</span>
                    <span>{browser} • {os}</span>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogCard;
