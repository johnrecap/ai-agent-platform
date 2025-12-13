'use client';

/**
 * Professional Landing Page - 2025 Design System
 * AI Agent Platform
 * 
 * Features:
 * - Outcome-first copy
 * - Design token system
 * - Motion hierarchy
 * - Accessibility (reduced motion, focus management)
 * - Performance optimization (animation budget)
 */

import { useEffect, useState } from 'react';
import { isLoggedIn, isAdmin, logout, getUser } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { useMotion } from '@/lib/MotionContext';
import { usePerformance } from '@/lib/PerformanceContext';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import TrustStrip from '@/components/TrustStrip';
import PersonalizationSwitcher from '@/components/PersonalizationSwitcher';
import FloatingChatbot from '@/components/FloatingChatbot';
import ParticleSystem from '@/components/ParticleSystem';
import MorphingBlob from '@/components/MorphingBlob';
import ParallaxOrbs from '@/components/ParallaxOrbs';

// Modern icons from Lucide
import {
  Zap, Shield, Globe, ArrowRight, Check,
  MessageSquare, Clock, Target, TrendingUp,
  Sparkles, Lock, Users
} from 'lucide-react';

export default function LandingPage() {
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [loggedIn] = useState(() => isLoggedIn());
  const [userIsAdmin] = useState(() => isAdmin());
  const [user] = useState(() => getUser());
  const [activeRole, setActiveRole] = useState('startup');
  const { reducedMotion } = useMotion();
  const { animationBudget } = usePerformance();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Role-based content
  const roleContent = {
    startup: {
      headline: isRTL
        ? 'حوّل دعم العملاء إلى آلي خلال 10 دقائق'
        : 'Turn customer support into autopilot in 10 minutes',
      subhead: isRTL
        ? 'منصة AI تقلل 80% من الاستفسارات المتكررة. بدون كود، بدون تعقيد.'
        : 'AI platform that cuts 80% of repetitive inquiries. No code, no complexity.',
      cta: isRTL ? 'ابدأ تجربة مجانية' : 'Start Free Trial'
    },
    agency: {
      headline: isRTL
        ? 'حلول AI بالعلامة البيضاء لجميع عملائك'
        : 'White-label AI solutions for all your clients',
      subhead: isRTL
        ? 'لوحة تحكم موحدة، علامة تجارية مخصصة، وإدارة متعددة المستأجرين.'
        : 'Unified dashboard, custom branding, and multi-tenant management.',
      cta: isRTL ? 'احجز عرض توضيحي' : 'Book Demo'
    },
    solo: {
      headline: isRTL
        ? 'أضف AI chat لـ SaaS الخاص بك في دقائق'
        : 'Add AI chat to your SaaS in minutes',
      subhead: isRTL
        ? 'API بسيط، توثيق كامل، لا حاجة لمعرفة ML.'
        : 'Simple API, full docs, no ML knowledge needed.',
      cta: isRTL ? 'اقرأ التوثيق' : 'Read Docs'
    }
  };

  // Problem → Solution → Result cards
  const problemCards = [
    {
      icon: MessageSquare,
      iconColor: 'text-purple-400',
      problem: isRTL ? 'فريق الدعم مثقل بالأسئلة المتكررة' : 'Support team overwhelmed with repetitive questions',
      solution: isRTL ? 'AI يتعامل مع الأسئلة الشائعة تلقائياً بـ 12 لغة' : 'AI handles FAQs automatically in 12 languages',
      result: isRTL ? '80% تقليل في تذاكر الدعم' : '80% reduction in support tickets',
      metric: isRTL ? '4 ساعات توفير يومياً' : '4 hours saved daily'
    },
    {
      icon: Clock,
      iconColor: 'text-cyan-400',
      problem: isRTL ? 'أوقات استجابة بطيئة تضر برضا العملاء' : 'Slow response times hurt customer satisfaction',
      solution: isRTL ? 'استجابات AI فورية، متاحة 24/7' : 'Instant AI responses, 24/7 availability',
      result: isRTL ? '< 1 ثانية متوسط وقت الاستجابة' : '< 1 second average response time',
      metric: isRTL ? '94% معدل رضا العملاء' : '94% CSAT score'
    },
    {
      icon: Target,
      iconColor: 'text-green-400',
      problem: isRTL ? 'التكامل المعقد يستغرق أسابيع' : 'Complex integration takes weeks',
      solution: isRTL ? 'كود تضمين نسخ-لصق، يعمل في كل مكان' : 'Copy-paste embed code, works everywhere',
      result: isRTL ? 'جاهز في 10 دقائق' : 'Live in 10 minutes',
      metric: isRTL ? 'صفر  وقت تطوير مطلوب' : 'Zero dev time needed'
    }
  ];

  const content = roleContent[activeRole];

  return (
    <div className="min-h-screen bg-[var(--role-background)] text-[var(--role-text-primary)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--role-border)] bg-[var(--role-surface)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 interactive">
            <div className="text-2xl">
              🤖
            </div>
            <span className="font-bold text-[var(--role-text-primary)] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI Agent Platform
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm bg-[var(--role-surface-elevated)] rounded-lg text-[var(--role-text-secondary)] hover:text-[var(--role-text-primary)] interactive"
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </button>

            {loggedIn ? (
              <div className="flex items-center gap-3">
                {userIsAdmin && (
                  <Link href="/admin" className="text-sm text-[var(--role-text-secondary)] hover:text-[var(--role-accent)] interactive">
                    {isRTL ? 'لوحة التحكم' : 'Admin'}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-[var(--role-accent)] text-white rounded-lg interactive"
                >
                  {isRTL ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-[var(--role-accent)] text-white rounded-lg interactive"
              >
                {isRTL ? 'تسجيل الدخول' : 'Login'}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section - Outcome First */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 brand-grid overflow-hidden">
          {/* Background Effects */}
          <ParticleSystem count={30} />
          <MorphingBlob />
          <ParallaxOrbs />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Personalization Switcher */}
            <div className="mb-8 flex justify-center">
              <PersonalizationSwitcher onChange={setActiveRole} />
            </div>

            {/* Headline */}
            <h1 className="text-h1 mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {content.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-h3 text-[var(--role-text-secondary)] mb-12 max-w-3xl mx-auto font-normal">
              {content.subhead}
            </p>

            {/* CTA Button */}
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-[var(--elevation-4)] hover:shadow-[var(--elevation-5)] interactive group"
            >
              <Sparkles className="w-5 h-5" />
              {content.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-[var(--motion-micro-duration)]" />
            </Link>

            {/* Trust Strip */}
            <div className="mt-16">
              <TrustStrip isRTL={isRTL} />
            </div>
          </div>
        </section>

        {/* Problem → Solution → Result Section */}
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-4">
              {isRTL ? 'كيف نحل مشاكلك' : 'How We Solve Your Problems'}
            </h2>
            <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
              {isRTL
                ? 'حلول حقيقية لتحديات حقيقية. كل ميزة مبنية لحل مشكلة محددة.'
                : 'Real solutions for real challenges. Every feature built to solve a specific problem.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-[var(--role-surface)] border border-[var(--role-border)] interactive group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-[var(--motion-ui-duration)]`}>
                    <Icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>

                  {/* Problem */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-[var(--color-error)] uppercase mb-2">
                      {isRTL ? 'المشكلة' : 'Problem'}
                    </div>
                    <p className="text-sm text-[var(--role-text-secondary)]">
                      {card.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-[var(--color-info)] uppercase mb-2">
                      {isRTL ? 'الحل' : 'Solution'}
                    </div>
                    <p className="text-sm text-[var(--role-text-primary)]">
                      {card.solution}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="mb-2">
                    <div className="text-xs font-semibold text-[var(--color-success)] uppercase mb-2">
                      {isRTL ? 'النتيجة' : 'Result'}
                    </div>
                    <p className="text-lg font-bold text-[var(--role-accent)]">
                      {card.result}
                    </p>
                  </div>

                  {/* Metric */}
                  <div className="pt-4 border-t border-[var(--role-border)]">
                    <div className="flex items-center gap-2 text-sm text-[var(--role-text-secondary)]">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      {card.metric}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-4 py-24 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white">
            <h2 className="text-h2 mb-4">
              {isRTL ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {isRTL
                ? 'انضم إلى آلاف الشركات التي تستخدم منصتنا'
                : 'Join thousands of businesses using our platform'
              }
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:scale-105 interactive shadow-[var(--elevation-5)]"
            >
              <Sparkles className="w-5 h-5" />
              {isRTL ? 'ابدأ الآن مجاناً' : 'Start Free Now'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--role-border)] bg-[var(--role-surface)] py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-small text-[var(--role-text-secondary)]">
              © 2025 AI Agent Platform. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
            <p className="text-small text-[var(--role-text-tertiary)] mt-2">
              {isRTL ? 'طُوّر بواسطة' : 'Developed by'}{' '}
              <Link href="/" className="text-[var(--role-accent)] hover:underline">
                Muhammad Saeed
              </Link>
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
