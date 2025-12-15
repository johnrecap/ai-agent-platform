'use client';

/**
 * Hero Card List Component
 * Displays and manages hero cards
 */

import HeroCardItem from './HeroCardItem';

export default function HeroCardList({ cards, onReorder, onToggleActive, onDelete }) {
    const handleMoveUp = (index) => {
        if (index === 0) return;
        const newCards = [...cards];
        [newCards[index - 1], newCards[index]] = [newCards[index], newCards[index - 1]];
        onReorder(newCards);
    };

    const handleMoveDown = (index) => {
        if (index === cards.length - 1) return;
        const newCards = [...cards];
        [newCards[index], newCards[index + 1]] = [newCards[index + 1], newCards[index]];
        onReorder(newCards);
    };

    if (cards.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#1a1a2e] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                    🎴 Hero Cards ({cards.length})
                </h2>
                <div className="text-sm text-gray-400">
                    Active: {cards.filter(c => c.is_active).length}
                </div>
            </div>

            <div className="space-y-3">
                {cards.map((card, index) => (
                    <HeroCardItem
                        key={card.id}
                        card={card}
                        index={index}
                        totalCards={cards.length}
                        onMoveUp={() => handleMoveUp(index)}
                        onMoveDown={() => handleMoveDown(index)}
                        onToggleActive={() => onToggleActive(card.id, card.is_active)}
                        onDelete={() => onDelete(card.id)}
                    />
                ))}
            </div>

            {cards.length >= 5 && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-sm">
                        ✅ Great! You have {cards.length} cards. The animation will look perfect.
                    </p>
                </div>
            )}

            {cards.length < 5 && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                        ⚠️ Recommended: Add at least 5 cards for best visual experience.
                    </p>
                </div>
            )}
        </div>
    );
}
