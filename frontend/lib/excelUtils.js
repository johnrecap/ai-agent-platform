/**
 * Excel Utilities
 * Helper functions for Excel upload
 */

import { MAX_FILE_SIZE, ALLOWED_EXTENSIONS } from '@/constants/excelConstants';

/**
 * Validate Excel file
 * @param {File} file - File object
 * @returns {Object} - Validation result
 */
export const validateExcelFile = (file) => {
    const errors = [];

    if (!file) {
        return { valid: false, errors: ['No file selected'] };
    }

    // Check file extension
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
        errors.push(`Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`);
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        errors.push(`File too large. Maximum size: ${formatFileSize(MAX_FILE_SIZE)}`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

/**
 * Format file size
 * @param {Number} bytes - File size in bytes
 * @returns {String} - Formatted size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Parse Excel preview data
 * @param {Object} response - Upload response
 * @returns {Object} - Formatted preview
 */
export const parseExcelPreview = (response) => {
    if (!response || !response.data) {
        return { rows: 0, imported: 0, failed: 0 };
    }

    return {
        rows: response.data.totalRows || 0,
        imported: response.data.imported || 0,
        failed: response.data.failed || 0,
        errors: response.data.failedRows || []
    };
};

/**
 * Download template
 * @returns {void}
 */
export const downloadTemplate = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:5000/api/conversations/excel-template';
    link.download = 'conversations_template.xlsx';
    link.click();
};
