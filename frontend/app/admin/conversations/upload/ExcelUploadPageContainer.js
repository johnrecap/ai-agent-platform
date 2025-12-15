'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useExcelUpload } from '@/hooks/useExcelUpload';
import { getExcelText } from '@/locales/excelLocales';
import ExcelUploadHeader from '@/components/Excel/ExcelUploadHeader';
import ExcelUploadTemplate from '@/components/Excel/ExcelUploadTemplate';
import ExcelUploadZone from '@/components/Excel/ExcelUploadZone';
import ExcelFileInfo from '@/components/Excel/ExcelFileInfo';
import ExcelPreviewTable from '@/components/Excel/ExcelPreviewTable';
import ExcelUploadRequirements from '@/components/Excel/ExcelUploadRequirements';
import toast from 'react-hot-toast';

/**
 * Excel Upload Page Container
 * Main container - imports only (under 100 lines)
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
            <ExcelUploadHeader onBack={() => router.back()} t={t} />

            <ExcelUploadTemplate t={t} />

            {!file && !result && (
                <ExcelUploadZone onFileSelect={handleFileSelect} disabled={uploading} />
            )}

            <ExcelFileInfo
                file={file}
                uploading={uploading}
                progress={progress}
                result={result}
                t={t}
                onUpload={handleUpload}
                onReset={handleReset}
            />

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

            <ExcelUploadRequirements t={t} />
        </div>
    );
};

export default ExcelUploadPageContainer;
