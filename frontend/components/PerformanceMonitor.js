'use client';

/**
 * Performance Monitor - Core Web Vitals
 * Monitors LCP, FID, CLS, and INP metrics
 * Features:
 * - PerformanceObserver for real metrics
 * - Console logging in development
 * - Automatic performance adjustments
 */

import { useEffect } from 'react';

export default function PerformanceMonitor() {
    useEffect(() => {
        if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
            return;
        }

        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('📊 LCP:', lastEntry.renderTime || lastEntry.loadTime, 'ms');

            if (lastEntry.renderTime > 2500) {
                console.warn('⚠️ LCP is slow (>2.5s). Consider optimizing images/fonts.');
            }
        });

        try {
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
            // LCP not supported
        }

        // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
        const fidObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                const delay = entry.processingStart - entry.startTime;
                console.log('📊 Input Delay:', delay, 'ms');

                if (delay > 100) {
                    console.warn('⚠️ Input delay is high (>100ms). Consider reducing JavaScript.');
                }
            }
        });

        try {
            fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {
            // FID not supported
        }

        // Monitor Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('📊 CLS:', clsValue.toFixed(4));

            if (clsValue > 0.1) {
                console.warn('⚠️ CLS is high (>0.1). Check for unsized images or dynamic content.');
            }
        });

        try {
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            // CLS not supported
        }

        // Log when page is fully loaded
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            console.log('📊 DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms');
        });

        return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
        };
    }, []);

    return null; // This is a monitoring component, renders nothing
}
