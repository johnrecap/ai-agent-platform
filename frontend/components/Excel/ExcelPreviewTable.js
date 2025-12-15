'use client';

import React from 'react';
import { getExcelText } from '@/locales/excelLocales';

/**
 * Excel Preview Table Component
 * Shows upload results
 */
const ExcelPreviewTable = ({ result }) => {
    const t = (key) => getExcelText(key);

    if (!result) return null;

    const hasErrors = result.failed > 0;

    return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                📊 {t('preview')}
            </h3>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-lg">
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{result.rows}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{t('totalRows')}</p>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">{result.imported}</p>
                    <p className="text-sm text-green-400">{t('imported')}</p>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-red-400">{result.failed}</p>
                    <p className="text-sm text-red-400">{t('failed')}</p>
                </div>
            </div>

            {/* Success Message */}
            {!hasErrors && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                    ✅ {t('uploadSuccess')} - {result.imported} {t('conversations')}
                </div>
            )}

            {/* Errors Table */}
            {hasErrors && result.errors && result.errors.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-red-400 mb-2">⚠️ {t('viewErrors')}:</p>
                    <div className="max-h-48 overflow-y-auto bg-[var(--bg-tertiary)] rounded-lg p-3">
                        {result.errors.map((err, index) => (
                            <div key={index} className="text-sm text-red-400 mb-2 pb-2 border-b border-red-500/20 last:border-0">
                                <span className="font-medium">Row {err.row}:</span> {err.title} - {err.error}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExcelPreviewTable;
