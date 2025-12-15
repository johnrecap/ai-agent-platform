'use client';

import React from 'react';
import { getIntegrationTypeColor, getIntegrationStatusColor, formatLastSync } from '@/lib/integrationsUtils';
import { getIntegrationText } from '@/locales/integrationsLocales';
import { Settings, X, CheckCircle } from 'lucide-react';

/**
 * Integration Card Component
 * Displays a single integration
 */
const IntegrationCard = ({ integration, onConfigure, onDisconnect, onTest }) => {
    const t = (key) => getIntegrationText(key);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="text-4xl">{integration.config?.icon || '⚙️'}</div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${getIntegrationTypeColor(integration.type)}`}>
                            {t(integration.type)}
                        </span>
                    </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getIntegrationStatusColor(integration.status)}`}>
                    {t(integration.status)}
                </span>
            </div>

            {integration.config?.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {integration.config.description}
                </p>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t('lastSync')}: {formatLastSync(integration.last_sync)}
                </div>
                <div className="flex gap-2">
                    {integration.status === 'active' && (
                        <button
                            onClick={() => onTest(integration.id)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                            title={t('test')}
                        >
                            <CheckCircle size={18} />
                        </button>
                    )}
                    <button
                        onClick={() => onConfigure(integration)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title={t('configure')}
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={() => onDisconnect(integration.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title={t('disconnect')}
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntegrationCard;
