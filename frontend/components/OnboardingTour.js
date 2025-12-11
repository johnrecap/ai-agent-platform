'use client';

/**
 * Onboarding Tour Component
 * AI Agent Platform - Premium 2026 Design
 * 
 * Interactive walkthrough for first-time users
 */

import { useState, useEffect } from 'react';
import { GradientButton } from '@/components/ui';

const TOUR_STEPS = [
    {
        id: 'welcome',
        title: 'Welcome to AI Agent Platform! 🎉',
        description: 'Let us show you around. This quick tour will help you get started.',
        target: null,
        position: 'center',
    },
    {
        id: 'dashboard',
        title: 'Dashboard Overview 📊',
        description: 'Here you can see all your key metrics at a glance - users, agents, conversations, and performance.',
        target: '[data-tour="dashboard"]',
        position: 'bottom',
    },
    {
        id: 'agents',
        title: 'Manage AI Agents 🤖',
        description: 'Create and configure your AI agents. Each agent can be embedded on your website.',
        target: '[data-tour="agents"]',
        position: 'right',
    },
    {
        id: 'conversations',
        title: 'View Conversations 💬',
        description: 'Upload and review all conversations. Use bulk actions to manage them efficiently.',
        target: '[data-tour="conversations"]',
        position: 'right',
    },
    {
        id: 'users',
        title: 'User Management 👥',
        description: 'Add team members and manage user permissions from here.',
        target: '[data-tour="users"]',
        position: 'right',
    },
    {
        id: 'complete',
        title: 'You\'re All Set! 🚀',
        description: 'Start by creating your first agent or uploading some conversations.',
        target: null,
        position: 'center',
    },
];

export default function OnboardingTour({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const step = TOUR_STEPS[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === TOUR_STEPS.length - 1;
    const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;

    const handleNext = () => {
        if (isLast) {
            handleComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirst) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        handleComplete();
    };

    const handleComplete = () => {
        setIsVisible(false);
        localStorage.setItem('onboarding_complete', 'true');
        onComplete?.();
    };

    useEffect(() => {
        // Highlight target element
        if (step.target) {
            const el = document.querySelector(step.target);
            if (el) {
                el.classList.add('tour-highlight');
                return () => el.classList.remove('tour-highlight');
            }
        }
    }, [currentStep, step.target]);

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]" />

            {/* Tour Card */}
            <div className={`fixed z-[1001] ${step.position === 'center' ? 'inset-0 flex items-center justify-center p-4' : ''}`}>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeInUp">
                    {/* Progress Bar */}
                    <div className="h-1 bg-[var(--bg-tertiary)] rounded-full mb-6 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Step Counter */}
                    <div className="text-xs text-[var(--text-muted)] mb-2">
                        Step {currentStep + 1} of {TOUR_STEPS.length}
                    </div>

                    {/* Content */}
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                        {step.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                        {step.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSkip}
                            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        >
                            Skip tour
                        </button>
                        <div className="flex gap-2">
                            {!isFirst && (
                                <GradientButton variant="secondary" size="sm" onClick={handlePrev}>
                                    ← Back
                                </GradientButton>
                            )}
                            <GradientButton size="sm" onClick={handleNext}>
                                {isLast ? 'Get Started' : 'Next →'}
                            </GradientButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlight Style */}
            <style jsx global>{`
                .tour-highlight {
                    position: relative;
                    z-index: 1002;
                    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3);
                    border-radius: 12px;
                }
            `}</style>
        </>
    );
}

// Hook to check if onboarding is needed
export function useOnboarding() {
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem('onboarding_complete');
        if (!completed) {
            // Delay to let page load
            setTimeout(() => setShowTour(true), 1000);
        }
    }, []);

    const resetTour = () => {
        localStorage.removeItem('onboarding_complete');
        setShowTour(true);
    };

    return { showTour, setShowTour, resetTour };
}
