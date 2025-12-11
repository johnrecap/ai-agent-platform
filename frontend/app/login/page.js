'use client';

/**
 * Login Page - Premium 2026 Design with i18n
 * AI Agent Platform
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isLoggedIn, isAdmin } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { GradientButton, Spinner } from '@/components/ui';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const { t, isRTL, language, setLanguage } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isLoggedIn()) {
            router.push(isAdmin() ? '/admin' : '/profile');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error(t('login.loginFailed'));
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            toast.success(t('login.loginSuccess'));
            router.push(isAdmin() ? '/admin' : '/profile');
        } catch (error) {
            toast.error(error.message || t('login.loginFailed'));
        } finally {
            setLoading(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    return (
        <div className="min-h-screen flex bg-[var(--bg-primary)]" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-3xl animate-float" />
                <div className="absolute bottom-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-2xl animate-float" style={{ animationDelay: '2s' }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center p-16 text-white">
                    <div className="mb-8">
                        <span className="text-6xl mb-4 block animate-float">🤖</span>
                        <h1 className="text-5xl font-bold mb-4">
                            {t('nav.aiAgentPlatform')}
                        </h1>
                        <p className="text-xl text-white/80 max-w-md">
                            {t('home.heroSubtitle')}
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mt-8">
                        {[
                            { icon: '⚡', text: language === 'ar' ? 'مراقبة الوكلاء في الوقت الفعلي' : 'Real-time agent monitoring' },
                            { icon: '📊', text: language === 'ar' ? 'تحليلات ورؤى متقدمة' : 'Advanced analytics & insights' },
                            { icon: '🔒', text: language === 'ar' ? 'أمان على مستوى المؤسسات' : 'Enterprise-grade security' },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 text-white/90 animate-fadeInUp"
                                style={{ animationDelay: `${i * 200}ms` }}
                            >
                                <span className="text-2xl">{feature.icon}</span>
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md animate-fadeIn">
                    {/* Language Toggle */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            {language === 'ar' ? '🇬🇧 English' : '🇸🇦 العربية'}
                        </button>
                    </div>

                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <span className="text-5xl">🤖</span>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-2">{t('nav.aiAgentPlatform')}</h1>
                    </div>

                    {/* Form Card */}
                    <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-3xl p-8 shadow-xl">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t('login.title')}</h2>
                            <p className="text-[var(--text-secondary)] mt-2">{t('login.subtitle')}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                                >
                                    {t('login.email')}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                                >
                                    {t('login.password')}
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1`}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <GradientButton
                                type="submit"
                                size="lg"
                                loading={loading}
                                className="w-full"
                            >
                                {loading ? t('login.signingIn') : t('login.signIn')}
                            </GradientButton>
                        </form>


                    </div>

                    {/* Footer */}
                    <p className="text-center text-[var(--text-muted)] text-sm mt-8">
                        © 2025 {t('nav.aiAgentPlatform')}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
