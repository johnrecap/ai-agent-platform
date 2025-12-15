'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useExcelUpload } from '@/hooks/useExcelUpload';
import { getExcelText } from '@/locales/excelLocales';
import { downloadTemplate, formatFileSize } from '@/lib/excelUtils';
import ExcelUploadZone from '@/components/Excel/ExcelUploadZone';
import ExcelProgressBar from '@/components/Excel/ExcelProgressBar';
import ExcelPreviewTable from '@/components/Excel/ExcelPreviewTable';
import toast from 'react-hot-toast';

/**
 * Excel Upload Page Container
 * Main container for Excel upload functionality
 */
const ExcelUploadPageContainer = () => {
    const t = (key) => getExcelText(key);
    const router = useRouter();

    const {
        file,
        uploading,
        progress,
        result,
        error,
        selectFile,
        uploadFile,
        reset
    } = useExcelUpload();

    const handleFileSelect = (selectedFile) => {
        const success = selectFile(selectedFile);
        if (success) {
            toast.success(`Selected: ${selectedFile.name}`);
        } else if (error) {
            toast.error(error);
        }
    };

    const handleUpload = async () => {
        const response = await uploadFile();
        if (response.success) {
            toast.success(t('uploadSuccess'));
        } else {
            toast.error(response.error || t('uploadFailed'));
        }
    };

    const handleReset = () => {
        reset();
        toast.success('Reset successfully');
    };

    return (
        <div className="min-h-screen p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.back()}
                    className="text-sm text-purple-400 hover:text-purple-300 mb-4"
                >
                    ← Back
                </button>
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    📤 {t('uploadExcel')}
                </h1>
                <p className="text-[var(--text-secondary)]">
                    Upload Excel file with conversations
                </p>
            </div>

            {/* Template Download */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-blue-400 mb-1">📋 {t('downloadTemplate')}</p>
                        <p className="text-sm text-blue-400/70">{t('templateHint')}</p>
                    </div>
                    <button
                        onClick={downloadTemplate}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        ⬇️ Download
                    </button>
                </div>
            </div>

            {/* Upload Zone */}
            {!file && !result && (
                <ExcelUploadZone onFileSelect={handleFileSelect} disabled={uploading} />
            )}

            {/* File Info */}
            {file && !result && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">📊</span>
                            <div>
                                <p className="font-medium text-[var(--text-primary)]">{file.name}</p>
                                <p className="text-sm text-[var(--text-secondary)]">{formatFileSize(file.size)}</p>
                            </div>
                        </div>
                        {!uploading && (
                            <button
                                onClick={handleReset}
                                className="text-red-400 hover:text-red-300"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Progress */}
                    {uploading && (
                        <ExcelProgressBar progress={progress} status="uploading" />
                    )}

                    {/* Action Buttons */}
                    {!uploading && !result && (
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleUpload}
                                className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                            >
                                📤 {t('upload')}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] rounded-lg transition-colors"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="space-y-4">
                    <ExcelPreviewTable result={result} />
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push('/admin/conversations')}
                            className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                        >
                            View Conversations
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] rounded-lg transition-colors"
                        >
                            Upload Another
                        </button>
                    </div>
                </div>
            )}

            {/* Requirements */}
            <div className="mt-8 p-4 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl">
                <p className="font-medium text-[var(--text-primary)] mb-3">ℹ️ {t('requirements')}:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                    <li>• {t('reqColumn1')}</li>
                    <li>• {t('reqColumn2')}</li>
                    <li>• {t('reqFormat')}</li>
                    <li>• {t('reqSize')}</li>
                </ul>
            </div>
        </div>
    );
};

export default ExcelUploadPageContainer;
