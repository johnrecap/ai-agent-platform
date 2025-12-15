'use client';

import { useState } from 'react';
import { validateExcelFile, parseExcelPreview } from '@/lib/excelUtils';

/**
 * Custom hook for Excel upload
 */
export const useExcelUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:5000/api/conversations';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    /**
     * Select file
     */
    const selectFile = (selectedFile) => {
        const validation = validateExcelFile(selectedFile);

        if (!validation.valid) {
            setError(validation.errors.join(', '));
            setFile(null);
            return false;
        }

        setFile(selectedFile);
        setError(null);
        return true;
    };

    /**
     * Upload file
     */
    const uploadFile = async (agentId = null) => {
        if (!file) {
            setError('No file selected');
            return { success: false };
        }

        setUploading(true);
        setProgress(0);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            if (agentId) formData.append('agentId', agentId);

            setProgress(30);

            const response = await fetch(`${baseURL}/upload-excel`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            setProgress(70);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            const data = await response.json();
            setProgress(100);
            setResult(parseExcelPreview(data));

            return { success: true, data };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setUploading(false);
        }
    };

    /**
     * Reset state
     */
    const reset = () => {
        setFile(null);
        setUploading(false);
        setProgress(0);
        setResult(null);
        setError(null);
    };

    /**
     * Validate uploaded data
     */
    const validateData = () => {
        return file !== null;
    };

    return {
        file,
        uploading,
        progress,
        result,
        error,
        selectFile,
        uploadFile,
        reset,
        validateData
    };
};
