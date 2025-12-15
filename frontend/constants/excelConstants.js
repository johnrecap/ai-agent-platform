/**
 * Excel Constants
 * Configuration for Excel upload feature
 */

export const EXCEL_TEMPLATES = {
    conversations: {
        name: 'Conversations Template',
        filename: 'conversations_template.xlsx',
        description: 'Template for uploading conversations'
    }
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_EXTENSIONS = ['.xlsx', '.xls'];

export const REQUIRED_COLUMNS = ['title', 'messages'];

export const UPLOAD_STATUSES = [
    { value: 'idle', label: 'Ready', color: 'gray' },
    { value: 'uploading', label: 'Uploading...', color: 'blue' },
    { value: 'processing', label: 'Processing...', color: 'yellow' },
    { value: 'success', label: 'Success', color: 'green' },
    { value: 'error', label: 'Error', color: 'red' }
];
