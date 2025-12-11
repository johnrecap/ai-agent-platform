'use client';

/**
 * Language Context Provider
 * AI Agent Platform
 * 
 * Provides language state and translation functions
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext(null);

const LANG_STORAGE_KEY = 'ai_platform_language';
const LANG_SELECTED_KEY = 'ai_platform_language_selected';

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState('en');
    const [hasSelectedLanguage, setHasSelectedLanguage] = useState(true); // Hide modal initially
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load language preference from localStorage
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
            const hasSelected = localStorage.getItem(LANG_SELECTED_KEY);

            if (savedLang) {
                setLanguageState(savedLang);
            }
            setHasSelectedLanguage(!!hasSelected);
            setIsLoaded(true);

            // Set document direction
            document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = savedLang || 'en';
        }
    }, []);

    const setLanguage = useCallback((lang) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
            localStorage.setItem(LANG_SELECTED_KEY, 'true');
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
        }
        setHasSelectedLanguage(true);
    }, []);

    // Translation function
    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return value || key;
    }, [language]);

    const value = {
        language,
        setLanguage,
        t,
        isRTL: language === 'ar',
        hasSelectedLanguage,
        isLoaded,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        // Return defaults if not in provider
        return {
            language: 'en',
            setLanguage: () => { },
            t: (key) => key,
            isRTL: false,
            hasSelectedLanguage: true,
            isLoaded: true,
        };
    }
    return context;
}

// Language Selector Modal Component
export function LanguageSelector() {
    const { language, setLanguage, hasSelectedLanguage, isLoaded, t } = useLanguage();

    if (!isLoaded || hasSelectedLanguage) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000]" />

            {/* Modal */}
            <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fadeInUp">
                    {/* Icon */}
                    <div className="text-center mb-6">
                        <span className="text-6xl">🌐</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-2">
                        Choose Your Language
                    </h1>
                    <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-4" dir="rtl">
                        اختر لغتك
                    </h2>
                    <p className="text-center text-[var(--text-secondary)] mb-8">
                        Select your preferred language / اختر لغتك المفضلة
                    </p>

                    {/* Language Options */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${language === 'en'
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-[var(--border-primary)] hover:border-purple-500/50'
                                }`}
                        >
                            <span className="text-3xl">🇬🇧</span>
                            <div className="text-left flex-1">
                                <div className="font-semibold text-[var(--text-primary)]">English</div>
                                <div className="text-sm text-[var(--text-secondary)]">Continue in English</div>
                            </div>
                            {language === 'en' && (
                                <span className="text-purple-400 text-xl">✓</span>
                            )}
                        </button>

                        <button
                            onClick={() => setLanguage('ar')}
                            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${language === 'ar'
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-[var(--border-primary)] hover:border-purple-500/50'
                                }`}
                            dir="rtl"
                        >
                            <span className="text-3xl">🇸🇦</span>
                            <div className="text-right flex-1">
                                <div className="font-semibold text-[var(--text-primary)]">العربية</div>
                                <div className="text-sm text-[var(--text-secondary)]">متابعة بالعربية</div>
                            </div>
                            {language === 'ar' && (
                                <span className="text-purple-400 text-xl">✓</span>
                            )}
                        </button>
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={() => setLanguage(language)}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:opacity-90 transition-all"
                    >
                        {language === 'ar' ? 'متابعة' : 'Continue'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default LanguageContext;
