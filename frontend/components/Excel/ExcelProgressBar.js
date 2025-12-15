'use client';

import React from 'react';
import { getExcelText } from '@/locales/excelLocales';

/**
 * Excel Progress Bar Component
 * Shows upload progress
 */
const ExcelProgressBar = ({ progress, status }) => {
    const t = (key) => getExcelText(key);

    const getStatusText = () => {
        if (progress < 30) return t('uploading');
        if (progress < 70) return t('processing');
        if (progress < 100) return t('importing');
        return t('uploadSuccess');
    };

    const getStatusColor = () => {
        if (status === 'error') return 'bg-red-500';
        if (progress === 100) return 'bg-green-500';
        return 'bg-purple-500';
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                    {getStatusText()}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                    {progress}%
                </span>
            </div>
            <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div
                    className={`h-full ${getStatusColor()} transition-all duration-300 ease-out`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ExcelProgressBar;
