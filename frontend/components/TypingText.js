'use client';

import { useEffect, useState } from 'react';

/**
 * TypingText Component
 * Text that appears letter-by-letter with cursor blink
 * Features:
 * - Letter-by-letter animation
 * - Configurable speed
 * - Cursor blink after completion
 * - Respects prefers-reduced-motion
 */

export default function TypingText({
    text,
    speed = 80,
    className = '',
    cursorChar = '|'
}) {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            setDisplayText(text);
            setIsComplete(true);
            setShowCursor(false);
            return;
        }

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    // Cursor blink effect after typing completes
    useEffect(() => {
        if (!isComplete) return;

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);

        return () => clearInterval(cursorInterval);
    }, [isComplete]);

    return (
        <span className={className}>
            {displayText}
            <span
                className="inline-block ml-1 text-purple-400"
                style={{ opacity: showCursor ? 1 : 0 }}
            >
                {cursorChar}
            </span>
        </span>
    );
}
