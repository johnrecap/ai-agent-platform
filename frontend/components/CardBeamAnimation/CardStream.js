'use client';

/**
 * Card Stream Component
 * Horizontal carousel of cards with scanner intersection detection
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { generateCode, calculateCodeDimensions, createFallbackImage } from './cardUtils';
import styles from './styles.module.css';

export default function CardStream({ cards, onScanningChange }) {
    const containerRef = useRef(null);
    const cardLineRef = useRef(null);
    const [position, setPosition] = useState(0);
    const [velocity, setVelocity] = useState(120);
    const [direction, setDirection] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const lastMouseX = useRef(0);
    const lastTime = useRef(0);

    const updateCardClipping = useCallback(() => {
        if (!cardLineRef.current) return;

        const scannerX = window.innerWidth / 2;
        const scannerWidth = 8;
        const scannerLeft = scannerX - scannerWidth / 2;
        const scannerRight = scannerX + scannerWidth / 2;
        let anyScanningActive = false;

        const wrappers = cardLineRef.current.querySelectorAll(`.${styles.cardWrapper}`);
        wrappers.forEach((wrapper) => {
            const rect = wrapper.getBoundingClientRect();
            const cardLeft = rect.left;
            const cardRight = rect.right;
            const cardWidth = rect.width;

            const normalCard = wrapper.querySelector(`.${styles.cardNormal}`);
            const asciiCard = wrapper.querySelector(`.${styles.cardAscii}`);

            if (cardLeft < scannerRight && cardRight > scannerLeft) {
                anyScanningActive = true;
                const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
                const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

                normalCard.style.setProperty('--clip-right', `${normalClipRight}%`);
                asciiCard.style.setProperty('--clip-left', `${asciiClipLeft}%`);
            } else {
                if (cardRight < scannerLeft) {
                    normalCard.style.setProperty('--clip-right', '100%');
                    asciiCard.style.setProperty('--clip-left', '100%');
                } else {
                    normalCard.style.setProperty('--clip-right', '0%');
                    asciiCard.style.setProperty('--clip-left', '0%');
                }
            }
        });

        if (onScanningChange) onScanningChange(anyScanningActive);
    }, [onScanningChange]);

    useEffect(() => {
        const animate = () => {
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime.current) / 1000;
            lastTime.current = currentTime;

            if (isAnimating && !isDragging && cardLineRef.current) {
                setPosition((prev) => {
                    const newPos = prev + velocity * direction * deltaTime;
                    const containerWidth = window.innerWidth;
                    const lineWidth = cardLineRef.current.scrollWidth / 2; // Divide by 2 because we duplicate cards

                    // Seamless loop: reset when half the cards pass
                    if (newPos < -lineWidth) {
                        return newPos + lineWidth;
                    }
                    if (newPos > containerWidth) {
                        return newPos - lineWidth;
                    }

                    return newPos;
                });
            }

            requestAnimationFrame(animate);
        };

        lastTime.current = performance.now();
        const animId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animId);
    }, [isAnimating, isDragging, velocity, direction]);

    useEffect(() => {
        updateCardClipping();
    }, [position, updateCardClipping]);

    const startDrag = (e) => {
        setIsDragging(true);
        setIsAnimating(false);
        lastMouseX.current = e.clientX;
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastMouseX.current;
        setPosition((prev) => prev + deltaX);
        lastMouseX.current = e.clientX;
    };

    const endDrag = () => {
        setIsDragging(false);
        setIsAnimating(true);
    };

    const { width, height, fontSize, lineHeight } = calculateCodeDimensions(400, 250);

    return (
        <div ref={containerRef} className={styles.cardStream}>
            <div
                ref={cardLineRef}
                className={`${styles.cardLine} ${isDragging ? styles.dragging : ''}`}
                style={{ transform: `translateX(${position}px)` }}
                onMouseDown={startDrag}
                onMouseMove={onDrag}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
            >
                {/* Render cards twice for seamless loop */}
                {[...cards, ...cards].map((card, index) => (
                    <div key={`${card.id}-${index}`} className={styles.cardWrapper}>
                        <div className={`${styles.card} ${styles.cardNormal}`}>
                            <Image
                                src={card.image_url}
                                alt={card.title}
                                fill
                                className={styles.cardImage}
                                onError={(e) => {
                                    e.target.src = createFallbackImage();
                                }}
                            />
                        </div>
                        <div className={`${styles.card} ${styles.cardAscii}`}>
                            <div
                                className={styles.asciiContent}
                                style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
                            >
                                {generateCode(width, height)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
