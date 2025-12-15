'use client';

/**
 * Hero Card Uploader Component
 * Drag & drop image upload for hero cards
 */

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function HeroCardUploader({ onUpload, uploading }) {
    const [title, setTitle] = useState('');
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title.trim()) {
            alert('Please provide both image and title');
            return;
        }

        try {
            await onUpload(file, title.trim());
            // Reset form
            setFile(null);
            setPreview(null);
            setTitle('');
        } catch (error) {
            // Error already handled by parent
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#1a1a2e] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">📤 Upload New Card</h2>

            {/* Preview */}
            {preview && (
                <div className="mb-4">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image src={preview} alt="Preview" fill className="object-cover" />
                    </div>
                </div>
            )}

            {/* Upload Zone */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-purple-500/50'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                />
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm">PNG, JPG, WebP up to 10MB</p>
            </div>

            {/* Title Input */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Card Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., AI Dashboard Preview"
                    className="w-full px-4 py-2 bg-[#0f0f1e] border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    required
                    minLength={3}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!file || !title.trim() || uploading}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {uploading ? 'Uploading...' : 'Upload Hero Card'}
            </button>
        </form>
    );
}
