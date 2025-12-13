'use client';

/**
 * FAQAccordion Component
 * Expandable FAQ accordion for landing page
 */

import { useState } from 'react';

export default function FAQAccordion({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="border border-[var(--border-primary)] rounded-xl bg-[var(--bg-card)] overflow-hidden transition-all duration-300 hover:border-purple-500/30"
                >
                    {/* Question Button */}
                    <button
                        onClick={() => toggleItem(index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-[var(--bg-tertiary)]"
                    >
                        <span className="font-semibold text-[var(--text-primary)] pr-4">
                            {item.question}
                        </span>
                        <span
                            className={`text-purple-500 text-xl transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                }`}
                        >
                            ▼
                        </span>
                    </button>

                    {/* Answer */}
                    <div
                        className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="px-6 pb-4 pt-2 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-primary)]">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
