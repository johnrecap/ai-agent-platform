'use client';

import React, { useState } from 'react';
import { getDifyText } from '@/locales/difyLocales';
import { useDify } from '@/hooks/useDify';
import toast from 'react-hot-toast';

/**
 * Dify Test Connection Component
 */
const DifyTestConnection = ({ apiKey, appId }) => {
    const t = (key) => getDifyText(key);
    const { testing, testConnection } = use Dify();
    const [result, setResult] = useState(null);

    const handleTest = async () => {
        if (!apiKey || !appId) {
            toast.error(apiKey ? t('appIdRequired') : t('apiKeyRequired'));
            return;
        }

        const response = await testConnection(apiKey, appId);
        setResult(response);

        if (response.success) {
            toast.success(t('connectionSuccess'));
        } else {
            toast.error(t('connectionFailed'));
        }
    };

    return (
        <div>
            <button
                onClick={handleTest}
                disabled={testing}
                className={`
          px-4 py-2 rounded-lg font-medium transition-all
          ${testing
                        ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }
        `}
            >
                {testing ? t('testingConnection') : t('testConnection')}
            </button>

            {result && (
                <div className={`mt-3 p-3 rounded-lg ${result.success
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                    {result.success ? '✅' : '❌'} {result.message || result.error || (result.success ? t('connectionSuccess') : t('connectionFailed'))}
                </div>
            )}
        </div>
    );
};

export default DifyTestConnection;
