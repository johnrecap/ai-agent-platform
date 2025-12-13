'use client';

/**
 * Avatar Upload Component  
 * AI Agent Platform - Reusable avatar upload with preview
 */

import { useState, useRef } from 'react';
import Image from 'next/image';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AvatarUpload({ agentId, currentAvatar, onUploadSuccess }) {
    const [preview, setPreview] = useState(currentAvatar);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size must be less than 10MB');
            return;
        }

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        // Upload to server
        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const res = await api.post(`/api/agents/${agentId}/avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Avatar uploaded successfully!');
                setPreview(res.data.data.avatar_url);
                onUploadSuccess?.(res.data.data);
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.response?.data?.error || 'Upload failed');
            setPreview(currentAvatar); // Revert to previous
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!currentAvatar) return;

        if (!confirm('Are you sure you want to delete this avatar?')) return;

        setUploading(true);
        try {
            const res = await api.delete(`/api/agents/${agentId}/avatar`);

            if (res.data.success) {
                toast.success('Avatar deleted successfully');
                setPreview(null);
                onUploadSuccess?.({ avatar_url: null });
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.error || 'Delete failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Preview */}
            <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl">
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Avatar"
                            fill
                            className="object-cover"
                            unoptimized={preview.startsWith('data:')}
                        />
                    ) : (
                        '🤖'
                    )}
                </div>
                {uploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${dragActive
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-[var(--border-primary)] hover:border-purple-500/50'
                    }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFile(e.dataTransfer.files[0]);
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                    disabled={uploading}
                />
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        disabled={uploading}
                    >
                        📤 Click to upload or drag and drop
                    </button>
                    <p className="text-xs text-[var(--text-muted)]">
                        PNG, JPG, GIF, WebP up to 10MB
                    </p>
                </div>
            </div>

            {/* Delete Button */}
            {preview && (
                <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm"
                    disabled={uploading}
                >
                    🗑️ Delete Avatar
                </button>
            )}
        </div>
    );
}
