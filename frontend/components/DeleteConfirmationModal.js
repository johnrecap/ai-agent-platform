'use client';

/**
 * Delete Confirmation Modal
 * AI Agent Platform - Reusable confirmation dialog
 */

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    count,
    permanent = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
            <div
                className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-2xl animate-fadeInUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${permanent ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                        {permanent ? '⚠️' : '🗑️'}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                            {title || (permanent ? 'Permanently Delete?' : 'Delete Conversation?')}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {message || (permanent
                                ? 'This action cannot be undone. The conversation will be permanently deleted.'
                                : 'This will move the conversation to trash. You can restore it later.'
                            )}
                        </p>
                        {count > 1 && (
                            <p className="text-sm font-semibold text-[var(--primary)] mt-2">
                                {count} items will be {permanent ? 'permanently deleted' : 'moved to trash'}
                            </p>
                        )}
                    </div>
                </div>

                {/* Warning for permanent delete */}
                {permanent && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-400 font-medium">
                            ⚠️ Warning: This cannot be undone!
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${permanent
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            }`}
                    >
                        {permanent ? 'Delete Forever' : 'Move to Trash'}
                    </button>
                </div>
            </div>
        </div>
    );
}
