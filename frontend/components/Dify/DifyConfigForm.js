'use client';

import React from 'react';
import { getDifyText } from '@/locales/difyLocales';
import { DIFY_PROVIDERS } from '@/constants/difyConstants';

/**
 * Dify Configuration Form Fields
 */
const DifyConfigForm = ({ formData, onChange, showTestButton, onTest, testing }) => {
    const t = (key) => getDifyText(key);

    const handleChange = (field, value) => {
        onChange({ ...formData, [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* Provider Type */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    {t('providerType')}
                </label>
                <select
                    value={formData.provider_type || 'custom'}
                    onChange={(e) => handleChange('provider_type', e.target.value)}
                    className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)]"
                >
                    {DIFY_PROVIDERS.map(provider => (
                        <option key={provider.value} value={provider.value}>
                            {provider.icon} {provider.label}
                        </option>
                    ))}
                </select>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {t('providerHint')}
                </p>
            </div>

            {/* Show Dify fields only if Dify is selected */}
            {formData.provider_type === 'dify' && (
                <>
                    {/* Dify API Key */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('difyApiKey')} *
                        </label>
                        <input
                            type="password"
                            value={formData.dify_api_key || ''}
                            onChange={(e) => handleChange('dify_api_key', e.target.value)}
                            placeholder="sk-..."
                            className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)]"
                        />
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                            {t('apiKeyHint')}
                        </p>
                    </div>

                    {/* Dify App ID */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('difyAppId')} *
                        </label>
                        <input
                            type="text"
                            value={formData.dify_app_id || ''}
                            onChange={(e) => handleChange('dify_app_id', e.target.value)}
                            placeholder="app-..."
                            className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)]"
                        />
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                            {t('appIdHint')}
                        </p>
                    </div>

                    {/* Test Connection Button */}
                    {showTestButton && onTest && (
                        <button
                            type="button"
                            onClick={onTest}
                            disabled={testing || !formData.dify_api_key || !formData.dify_app_id}
                            className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${testing || !formData.dify_api_key || !formData.dify_app_id
                                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }
              `}
                        >
                            {testing ? t('testingConnection') : t('testConnection')}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default DifyConfigForm;
