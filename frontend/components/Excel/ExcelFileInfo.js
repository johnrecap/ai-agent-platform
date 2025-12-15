import { formatFileSize } from '@/lib/excelUtils';
import ExcelProgressBar from './ExcelProgressBar';

/**
 * Excel File Info Component
 * Shows selected file info, progress, and action buttons
 */
const ExcelFileInfo = ({
    file,
    uploading,
    progress,
    result,
    t,
    onUpload,
    onReset
}) => {
    if (!file || result) return null;

    return (
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
                        onClick={onReset}
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
                        onClick={onUpload}
                        className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                    >
                        📤 {t('upload')}
                    </button>
                    <button
                        onClick={onReset}
                        className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] rounded-lg transition-colors"
                    >
                        {t('cancel')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExcelFileInfo;
