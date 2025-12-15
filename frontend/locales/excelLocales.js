/**
 * Excel Locales
 * All text content for Excel upload
 */

export const excelLocales = {
    en: {
        // Upload
        uploadExcel: 'Upload Excel',
        selectFile: 'Select Excel File',
        dragDrop: 'Drag & drop Excel file here',
        or: 'or',
        browse: 'Browse',

        // Template
        downloadTemplate: 'Download Template',
        templateHint: 'Download sample Excel template',

        // Validation
        invalidFile: 'Invalid file type',
        fileTooLarge: 'File too large',
        noFile: 'No file selected',

        // Progress
        uploading: 'Uploading...',
        processing: 'Processing Excel data...',
        validating: 'Validating data...',
        importing: 'Importing conversations...',

        // Results
        uploadSuccess: 'Excel uploaded successfully!',
        uploadFailed: 'Upload failed',
        imported: 'Imported',
        failed: 'Failed',
        totalRows: 'Total Rows',
        conversations: 'conversations',

        // Errors
        uploadError: 'Failed to upload Excel',
        parseError: 'Failed to parse Excel file',
        validationError: 'Invalid Excel format',
        importError: 'Failed to import conversations',

        // Preview
        preview: 'Preview',
        fileName: 'File Name',
        fileSize: 'File Size',
        rowCount: 'Row Count',
        status: 'Status',

        // Actions
        upload: 'Upload',
        cancel: 'Cancel',
        retry: 'Retry',
        close: 'Close',
        viewErrors: 'View Errors',

        // Requirements
        requirements: 'Requirements',
        reqColumn1: 'Title column (conversation title)',
        reqColumn2: 'Messages column (JSON array or text)',
        reqFormat: 'Excel format (.xlsx or .xls)',
        reqSize: 'Maximum file size: 5MB'
    }
};

export const getExcelText = (key, lang = 'en') => {
    return excelLocales[lang]?.[key] || key;
};
