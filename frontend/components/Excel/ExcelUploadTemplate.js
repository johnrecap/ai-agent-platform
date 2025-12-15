import { downloadTemplate } from '@/lib/excelUtils';

/**
 * Excel Upload Template Section
 * Shows template download button with hint
 */
const ExcelUploadTemplate = ({ t }) => {
    return (
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
    );
};

export default ExcelUploadTemplate;
