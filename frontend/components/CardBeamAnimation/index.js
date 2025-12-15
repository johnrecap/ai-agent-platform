'use client';

/**
 * Card Beam Animation Component
 * Main container for the hero section animation
 */

import { useState, useEffect, Suspense, lazy } from 'react';
import api from '@/lib/api';
import styles from './styles.module.css';
import ScannerBeam from './ScannerBeam';
import CardStream from './CardStream';

// Lazy load Three.js particle system
const ParticleSystem = lazy(() => import('./ParticleSystem'));

export default function CardBeamAnimation() {
    const [cards, setCards] = useState(getPlaceholderCards());
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const res = await api.get('/api/hero-cards');
            const fetchedCards = res.data.data || [];

            // Ensure we have at least 5 cards for smooth carousel
            if (fetchedCards.length > 0) {
                const duplicatedCards = [...fetchedCards];
                while (duplicatedCards.length < 30) {
                    duplicatedCards.push(...fetchedCards);
                }
                setCards(duplicatedCards.slice(0, 30));
            }
        } catch (error) {
            console.error('Failed to fetch hero cards:', error);
            // Keep placeholders on error
        }
    };

    const getPlaceholderCards = () => {
        return Array.from({ length: 10 }, (_, i) => ({
            id: `placeholder-${i}`,
            title: `Card ${i + 1}`,
            image_url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Cdefs%3E%3ClinearGradient id='grad${i}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad${i})' /%3E%3C/svg%3E`
        }));
    };

    return (
        <section className={styles.cardBeamContainer}>
            {/* Canvas container */}
            <div className={styles.canvasContainer}>
                {/* Particle System (Three.js) */}
                <Suspense fallback={null}>
                    <ParticleSystem />
                </Suspense>

                {/* Scanner Beam */}
                <ScannerBeam isScanning={isScanning} />

                {/* Card Stream */}
                <CardStream
                    cards={cards}
                    onScanningChange={setIsScanning}
                />
            </div>
        </section>
    );
}
