'use client';

/**
 * Split Screen Layout
 * AI Agent Platform - For AI Agent views (Chat + Actions)
 */

import { useState } from 'react';

export default function SplitScreen({
    left,
    right,
    leftTitle = 'Chat',
    rightTitle = 'Agent Actions',
    defaultRatio = 50, // Left panel percentage
    minRatio = 30,
    maxRatio = 70,
    collapsible = true,
}) {
    const [ratio, setRatio] = useState(defaultRatio);
    const [isDragging, setIsDragging] = useState(false);
    const [mobileTab, setMobileTab] = useState('left'); // For mobile view

    const handleMouseDown = () => setIsDragging(true);

    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const newRatio = ((e.clientX - rect.left) / rect.width) * 100;
        setRatio(Math.min(maxRatio, Math.max(minRatio, newRatio)));
    };

    return (
        <div className="h-full flex flex-col">
            {/* Mobile Tab Switcher */}
            <div className="lg:hidden flex border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                <button
                    onClick={() => setMobileTab('left')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${mobileTab === 'left'
                            ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                            : 'text-[var(--text-secondary)]'
                        }`}
                >
                    💬 {leftTitle}
                </button>
                <button
                    onClick={() => setMobileTab('right')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${mobileTab === 'right'
                            ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                            : 'text-[var(--text-secondary)]'
                        }`}
                >
                    🤖 {rightTitle}
                </button>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden flex-1 overflow-hidden">
                <div className={`h-full ${mobileTab === 'left' ? 'block' : 'hidden'}`}>
                    {left}
                </div>
                <div className={`h-full ${mobileTab === 'right' ? 'block' : 'hidden'}`}>
                    {right}
                </div>
            </div>

            {/* Desktop Split View */}
            <div
                className="hidden lg:flex flex-1 overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Left Panel */}
                <div
                    className="h-full overflow-hidden flex flex-col"
                    style={{ width: `${ratio}%` }}
                >
                    {left}
                </div>

                {/* Resizer */}
                <div
                    className={`
            w-1 cursor-col-resize relative group
            bg-[var(--border-primary)]
            hover:bg-[var(--primary)] hover:w-1.5
            transition-all duration-150
            ${isDragging ? 'bg-[var(--primary)] w-1.5' : ''}
          `}
                    onMouseDown={handleMouseDown}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-4 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">⋮</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div
                    className="h-full overflow-hidden flex flex-col"
                    style={{ width: `${100 - ratio}%` }}
                >
                    {right}
                </div>
            </div>
        </div>
    );
}
