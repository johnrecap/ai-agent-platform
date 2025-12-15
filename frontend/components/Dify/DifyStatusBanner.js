'use client';

import React from 'react';
import { getDifyText } from '@/locales/difyLocales';
import { getStatusColor } from '@/lib/difyUtils';

/**
 * Dify Status Banner Component
 */
const DifyStatusBanner = ({ status, onTest }) => {
  const t = (key) => getDifyText(key);

  if (!status) return null;

  const configured = status.configured;
  const statusColor = getStatusColor(configured);

  return (
    <div className={`p-4 rounded-xl border ${statusColor} backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="font-medium">
              {t('difyIntegration')}
            </p>
            <p className="text-sm opacity-80">
              {configured ? t('configured') : t('notConfigured')}
            </p>
          </div>
        </div>
        {configured && onTest && (
          <button
            onClick={onTest}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
          >
            {t('testConnection')}
          </button>
        )}
      </div>
    </div>
  );
};

export default DifyStatusBanner;
