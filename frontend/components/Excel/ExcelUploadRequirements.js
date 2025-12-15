/**
 * Excel Upload Requirements
 * Shows upload requirements info
 */
const ExcelUploadRequirements = ({ t }) => {
    return (
        <div className="mt-8 p-4 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl">
            <p className="font-medium text-[var(--text-primary)] mb-3">ℹ️ {t('requirements')}:</p>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• {t('reqColumn1')}</li>
                <li>• {t('reqColumn2')}</li>
                <li>• {t('reqFormat')}</li>
                <li>• {t('reqSize')}</li>
            </ul>
        </div>
    );
};

export default ExcelUploadRequirements;
