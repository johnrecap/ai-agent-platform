'use client';

/**
 * Trash - Deleted Conversations
 * AI Agent Platform
 */

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/lib/language';
import toast from 'react-hot-toast';
import { GlassCard, GradientButton, EmptyState } from '@/components/ui';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';

export default function TrashPage() {
    const { language, isRTL } = useLanguage();
    const [deletedConversations, setDeletedConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null, permanent: false });

    const txt = {
        title: language === 'ar' ? 'سلة المحذوفات' : 'Trash',
        subtitle: language === 'ar' ? 'المحادثات المحذوفة - يمكن استعادتها' : 'Deleted conversations - Can be restored',
        emptyTrash: language === 'ar' ? 'إفراغ السلة' : 'Empty Trash',
        noItems: language === 'ar' ? 'سلة المحذوفات فارغة' : 'Trash is empty',
        noItemsDesc: language === 'ar' ? 'المحادثات  المحذوفة ستظهر هنا' : 'Deleted conversations will appear here',
        restore: language === 'ar' ? 'استعادة' : 'Restore',
        deleteForever: language === 'ar' ? 'حذف نهائي' : 'Delete Forever',
        deletedOn: language === 'ar' ? 'حذفت في' : 'Deleted on',
        messages: language === 'ar' ? 'رسائل' : 'messages',
        restored: language === 'ar' ? 'تمت الاستعادة!' : 'Restored!',
        deleted: language === 'ar' ? 'تم الحذف نهائياً' : 'Permanently deleted',
        trashEmptied: language === 'ar' ? 'تم إفراغ السلة' : 'Trash emptied',
    };

    useEffect(() => {
        loadTrash();
    }, []);

    const loadTrash = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/conversations/trash');
            setDeletedConversations(res.data.data || []);
        } catch (error) {
            toast.error('Failed to load trash');
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (id) => {
        try {
            await api.post(`/api/conversations/${id}/restore`);
            toast.success(txt.restored);
            loadTrash();
        } catch (error) {
            toast.error('Restore failed');
        }
    };

    const handlePermanentDelete = async (id) => {
        try {
            await api.delete(`/api/conversations/${id}/permanent`);
            toast.success(txt.deleted);
            loadTrash();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleEmptyTrash = async () => {
        try {
            await api.delete('/api/conversations/trash/empty');
            toast.success(txt.trashEmptied);
            loadTrash();
        } catch (error) {
            toast.error('Failed to empty trash');
        }
    };

    return (
        <div className="min-h-screen p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        🗑️ {txt.title}
                    </h1>
                    <p className="text-[var(--text-secondary)]">{txt.subtitle}</p>
                </div>
                {deletedConversations.length > 0 && (
                    <GradientButton
                        onClick={() => setDeleteModal({ open: true, id: null, permanent: true })}
                        variant="danger"
                    >
                        {txt.emptyTrash} ({deletedConversations.length})
                    </GradientButton>
                )}
            </div>

            {/* Content */}
            {loading ? (
                <GlassCard className="p-6">
                    <div className="animate-pulse space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-20 bg-[var(--bg-card-hover)] rounded-lg" />
                        ))}
                    </div>
                </GlassCard>
            ) : deletedConversations.length === 0 ? (
                <EmptyState
                    icon="🗑️"
                    title={txt.noItems}
                    description={txt.noItemsDesc}
                />
            ) : (
                <div className="space-y-3">
                    {deletedConversations.map((conv, index) => (
                        <GlassCard
                            key={conv.id}
                            className="p-4 animate-fadeInUp"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-lg">
                                        💬
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[var(--text-primary)]">
                                            {conv.title || `Conversation #${conv.id}`}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                                            {conv.message_count} {txt.messages} • {txt.deletedOn} {new Date(conv.deleted_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleRestore(conv.id)}
                                        className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        ↩️ {txt.restore}
                                    </button>
                                    <button
                                        onClick={() => setDeleteModal({ open: true, id: conv.id, permanent: true })}
                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        ⚠️ {txt.deleteForever}
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, id: null, permanent: false })}
                onConfirm={() => {
                    if (deleteModal.id) {
                        handlePermanentDelete(deleteModal.id);
                    } else {
                        handleEmptyTrash();
                    }
                }}
                permanent={deleteModal.permanent}
                count={deleteModal.id ? 1 : deletedConversations.length}
            />
        </div>
    );
}
