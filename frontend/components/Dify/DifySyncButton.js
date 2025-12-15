'use client';

import React from 'react';
import { getDifyText } from '@/locales/difyLocales';

/**
 * Dify Sync Button Component
 */
const DifySyncButton = ({ onClick, syncing, disabled }) => {
    const t = (key) => getDifyText(key);

    return (
        <button
            onClick={onClick}
            disabled={disabled || syncing}
            className={`
        px-4 py-2 rounded-lg font-medium transition-all
        ${disabled || syncing
                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }
        ${syncing ? 'animate-pulse' : ''}
      `}
        >
            {syncing ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('syncing')}
                </span>
            ) : (
                <>🔄 {t('syncNow')}</>
            )}
        </button>
    );
};

export default DifySyncButton;
