'use client';

/**
 * Hero Card Item Component
 * Single card item in the list
 */

import Image from 'next/image';

export default function HeroCardItem({
    card,
    index,
    totalCards,
    onMoveUp,
    onMoveDown,
    onToggleActive,
    onDelete
}) {
    return (
        <div className="flex items-center gap-4 p-4 bg-[#0f0f1e] rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
            {/* Order number */}
            <div className="flex-shrink-0 w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">
                {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                <Image
                    src={card.image_url}
                    alt={card.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{card.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${card.is_active
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                        {card.is_active ? '✓ Active' : '● Inactive'}
                    </span>
                    <span className="text-xs text-gray-500">
                        Order: {card.display_order}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
                {/* Move Up */}
                <button
                    onClick={onMoveUp}
                    disabled={index === 0}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>

                {/* Move Down */}
                <button
                    onClick={onMoveDown}
                    disabled={index === totalCards - 1}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Toggle Active */}
                <button
                    onClick={onToggleActive}
                    className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${card.is_active ? 'text-green-400' : 'text-gray-400'
                        }`}
                    title={card.is_active ? 'Deactivate' : 'Activate'}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>

                {/* Delete */}
                <button
                    onClick={onDelete}
                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    title="Delete"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
