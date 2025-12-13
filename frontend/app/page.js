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
 * - Lazy loading for heavy components
 */

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { isLoggedIn, isAdmin, logout, getUser } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { useMotion } from '@/lib/MotionContext';
import { usePerformance } from '@/lib/PerformanceContext';
import useParallax from '@/hooks/useParallax';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import TrustStrip from '@/components/TrustStrip';
import PersonalizationSwitcher from '@/components/PersonalizationSwitcher';
import MagneticButton from '@/components/MagneticButton';
import TypingText from '@/components/TypingText';
import TiltCard from '@/components/TiltCard';
import ScrollReveal from '@/components/ScrollReveal';
import BentoGrid from '@/components/BentoGrid';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import FAQAccordion from '@/components/FAQAccordion';
import LogoShowcase from '@/components/LogoShowcase';
import Timeline from '@/components/Timeline';

// Lazy load heavy animation components for better performance
const ParticleSystem = dynamic(() => import('@/components/ParticleSystem'), {
  loading: () => null,
  ssr: false
});

const MorphingBlob = dynamic(() => import('@/components/MorphingBlob'), {
  loading: () => null,
  ssr: false
});

const ParallaxOrbs = dynamic(() => import('@/components/ParallaxOrbs'), {
  loading: () => null,
  ssr: false
});

const MeshGradient = dynamic(() => import('@/components/MeshGradient'), {
  loading: () => null,
  ssr: false
});

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  loading: () => null,
  ssr: false
});

const FloatingChatbot = dynamic(() => import('@/components/FloatingChatbot'), {
  loading: () => null,
  ssr: false
});

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
  const [isScrolled, setIsScrolled] = useState(false);

  // Parallax refs for hero elements
  const headlineRef = useParallax(0.2);
  const subheadRef = useParallax(0.15);
  const ctaRef = useParallax(0.1);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Noise Texture Overlay */}
      <svg
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.03,
          zIndex: 1,
          top: 0,
          left: 0
        }}
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend mode="overlay" in="SourceGraphic" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Skip to Main Content - Accessibility */}
      <a
        href="#main-content"
        className="skip-to-main"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#A855F7',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 600,
          zIndex: 10000,
          transition: 'top 250ms ease-out',
          textDecoration: 'none',
        }}
        onFocus={(e) => e.currentTarget.style.top = '16px'}
        onBlur={(e) => e.currentTarget.style.top = '-100px'}
      >
        {isRTL ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {/* Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${isScrolled
          ? 'border-[var(--role-border)] bg-[var(--role-surface)]/90 backdrop-blur-md shadow-lg'
          : 'border-[var(--role-border)]/50 bg-[var(--role-surface)]/60 backdrop-blur-2xl'
          }`}
        style={{
          boxShadow: isScrolled ? '0 4px 16px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
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
      <main className="pt-16" id="main-content">
        {/* Hero Section - Outcome First */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 brand-grid overflow-hidden">
          {/* Background Effects - Now with lazy loading for better performance */}
          <ParticleSystem />
          <MorphingBlob />
          <ParallaxOrbs />
          <MeshGradient />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Personalization Switcher */}
            <div className="mb-8 flex justify-center">
              <PersonalizationSwitcher onChange={setActiveRole} />
            </div>

            {/* Headline - Fixed overlap issue */}
            <div ref={headlineRef} className="relative z-20 mb-16 pb-8 overflow-hidden">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-h1 mb-0 leading-tight">
                  <TypingText
                    text={content.headline}
                    speed={50}
                    className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent inline-block"
                  />
                </h1>
              </div>
            </div>

            {/* Subheadline */}
            <p ref={subheadRef} className="text-h3 text-[var(--role-text-secondary)] mb-12 max-w-3xl mx-auto font-normal">
              {content.subhead}
            </p>

            {/* CTA Button */}
            <div ref={ctaRef}>
              <MagneticButton
                href="/login"
                shimmer={true}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-[var(--elevation-4)] hover:shadow-[var(--elevation-5)] group"
              >
                <Sparkles className="w-5 h-5" />
                {content.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-[var(--motion-micro-duration)]" />
              </MagneticButton>
            </div>

            {/* Trust Strip */}
            <div className="mt-16">
              <TrustStrip isRTL={isRTL} />
            </div>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </section>

        {/* Problem → Solution → Result Section */}
        <ScrollReveal direction="up">
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
                  <TiltCard
                    key={index}
                    className="p-8 rounded-2xl bg-[var(--role-surface)] border border-[var(--role-border)] group"
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
                  </TiltCard>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Bento Grid Features */}
        <BentoGrid isRTL={isRTL} />

        {/* How It Works - Timeline */}
        <ScrollReveal direction="up">
          <section className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <h2 className="text-h2 mb-4">
                {isRTL ? 'كيف يعمل' : 'How It Works'}
              </h2>
              <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
                {isRTL
                  ? 'ثلاث خطوات بسيطة للبدء مع منصتنا'
                  : 'Three simple steps to get started with our platform'
                }
              </p>
            </div>
            <Timeline isRTL={isRTL} />
          </section>
        </ScrollReveal>

        {/* Logo Showcase */}
        <ScrollReveal direction="up">
          <section className="py-24 bg-[var(--role-surface)]">
            <LogoShowcase isRTL={isRTL} />
          </section>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal direction="up">
          <section className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <h2 className="text-h2 mb-4">
                {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
                {isRTL
                  ? 'إج��بات على الأسئلة الأكثر شيوعاً حول منصتنا'
                  : 'Answers to the most common questions about our platform'
                }
              </p>
            </div>
            <FAQAccordion
              items={[
                {
                  question: isRTL ? 'ما هي منصة AI Agent Platform؟' : 'What is AI Agent Platform?',
                  answer: isRTL
                    ? 'منصة شاملة لإنشاء وإدارة روبوتات الدردشة المدعومة بالذكاء الاصطناعي. نوفر لك كل الأدوات اللازمة لبناء وكلاء AI مخصصين يتفاعلون مع عملائك بشكل طبيعي وفعال على مدار الساعة.'
                    : 'A comprehensive platform for creating and managing AI-powered chatbots. We provide all the tools you need to build custom AI agents that interact with your customers naturally and effectively 24/7.',
                },
                {
                  question: isRTL ? 'كم من الوقت يستغرق الإعداد؟' : 'How long does setup take?',
                  answer: isRTL
                    ? 'يمكنك إطلاق أول وكيل AI الخاص بك في أقل من 10 دقائق. فقط قم بالتسجيل، أضف معلومات عملك، وانسخ كود التضمين إلى موقعك. لا حاجة لمهارات برمجية متقدمة.'
                    : 'You can launch your first AI agent in under 10 minutes. Simply sign up, add your business information, and copy the embed code to your website. No advanced coding skills required.',
                },
                {
                  question: isRTL ? 'هل يدعم النظام اللغة العربية؟' : 'Does the system support Arabic?',
                  answer: isRTL
                    ? 'نعم! نحن ندعم أكثر من 12 لغة بما في ذلك العربية والإنجليزية. يمكن لوكيل الـ AI الخاص بك التواصل بلغات متعددة وفهم السياق في كل لغة بشكل صحيح.'
                    : 'Yes! We support over 12 languages including Arabic and English. Your AI agent can communicate in multiple languages and understand context correctly in each language.',
                },
                {
                  question: isRTL ? 'ما هي خطط الأسعار المتاحة؟' : 'What pricing plans are available?',
                  answer: isRTL
                    ? 'نقدم ثلاث خطط: Free (للبدء)، Pro (للشركات النامية)، و Enterprise (للمؤسسات الكبيرة). كل خطة تأتي مع ميزات مختلفة وحدود استخدام. يمكنك البدء مجاناً وترقية خطتك في أي وقت.'
                    : 'We offer three plans: Free (for getting started), Pro (for growing businesses), and Enterprise (for large organizations). Each plan comes with different features and usage limits. You can start for free and upgrade anytime.',
                },
                {
                  question: isRTL ? 'هل يمكنني تخصيص شكل الـ chatbot؟' : 'Can I customize the chatbot appearance?',
                  answer: isRTL
                    ? 'بالتأكيد! يمكنك تخصيص الألوان، الأيقونات، الرسائل الترحيبية، وموضع الظهور. نوفر أيضاً إمكانية رفع شعارك الخاص وتخصيص كامل للواجهة لتتناسب مع هوية علامتك التجارية.'
                    : 'Absolutely! You can customize colors, icons, welcome messages, and display position. We also provide the ability to upload your own logo and fully customize the interface to match your brand identity.',
                },
              ]}
            />
          </section>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal direction="up">
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
              <MagneticButton
                href="/login"
                shimmer={true}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:scale-105 shadow-[var(--elevation-5)]"
              >
                <Sparkles className="w-5 h-5" />
                {isRTL ? 'ابدأ الآن مجاناً' : 'Start Free Now'}
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </div>
          </section>
        </ScrollReveal>

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

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
}
