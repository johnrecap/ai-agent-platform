'use client';

/**
 * Hero Cards Management Page
 * Admin Panel - AI Agent Platform
 */

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import HeroCardUploader from './components/HeroCardUploader';
import HeroCardList from './components/HeroCardList';

export default function HeroCardsPage() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const res = await api.get('/api/hero-cards/all');
            setCards(res.data.data || []);
        } catch (error) {
            console.error('Failed to fetch hero cards:', error);
            toast.error('Failed to load hero cards');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file, title) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        try {
            const res = await api.post('/api/hero-cards', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success('Hero card uploaded successfully!');
            await fetchCards();
            return res.data.data;
        } catch (error) {
            toast.error(error.response?.data?.error || 'Upload failed');
            throw error;
        } finally {
            setUploading(false);
        }
    };

    const handleReorder = async (newOrder) => {
        const cardOrders = newOrder.map((card, index) => ({
            id: card.id,
            display_order: index + 1
        }));

        try {
            await api.put('/api/hero-cards/reorder', { cardOrders });
            setCards(newOrder);
            toast.success('Cards reordered successfully');
        } catch (error) {
            toast.error('Failed to reorder cards');
            await fetchCards();
        }
    };

    const handleToggleActive = async (id, currentStatus) => {
        try {
            await api.put(`/api/hero-cards/${id}`, { is_active: !currentStatus });
            toast.success('Card status updated');
            await fetchCards();
        } catch (error) {
            toast.error('Failed to update card');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this card?')) return;

        try {
            await api.delete(`/api/hero-cards/${id}`);
            toast.success('Card deleted successfully');
            await fetchCards();
        } catch (error) {
            toast.error('Failed to delete card');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        🎨 Hero Cards Management
                    </h1>
                    <p className="text-gray-400">
                        Manage homepage carousel card images
                    </p>
                </div>

                {/* Upload Section */}
                <HeroCardUploader onUpload={handleUpload} uploading={uploading} />

                {/* Cards List */}
                <HeroCardList
                    cards={cards}
                    onReorder={handleReorder}
                    onToggleActive={handleToggleActive}
                    onDelete={handleDelete}
                />

                {/* Info */}
                {cards.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
                        <p className="text-gray-400 text-lg">
                            No hero cards yet. Upload your first card above!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
