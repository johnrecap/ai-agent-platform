'use client';

import React from 'react';
import { getExcelText } from '@/locales/excelLocales';
import { formatFileSize } from '@/lib/excelUtils';

/**
 * Excel Upload Zone Component
 * Drag & drop area for Excel files
 */
const ExcelUploadZone = ({ onFileSelect, disabled }) => {
    const t = (key) => getExcelText(key);
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const file = e.dataTransfer.files[0];
        if (file) onFileSelect(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) onFileSelect(file);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
        border-2 border-dashed rounded-xl p-8 text-center transition-all
        ${isDragging
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-[var(--border-primary)] hover:border-purple-500/50'
                }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
        >
            <div className="flex flex-col items-center gap-4">
                <span className="text-5xl">📊</span>
                <div>
                    <p className="text-[var(--text-primary)] font-medium mb-1">
                        {t('dragDrop')}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                        {t('or')}
                    </p>
                </div>
                <label className={`
          px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors
          ${disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}>
                    {t('browse')}
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileInput}
                        disabled={disabled}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};

export default ExcelUploadZone;
