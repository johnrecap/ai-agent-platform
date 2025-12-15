/**
 * Excel Upload Header Component
 * Displays page header with back button and title
 */
const ExcelUploadHeader = ({ onBack, t }) => {
    return (
        <div className="mb-8">
            <button
                onClick={onBack}
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
    );
};

export default ExcelUploadHeader;
