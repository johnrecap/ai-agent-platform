'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/language';
import { useMotion } from '@/lib/MotionContext';
import { usePerformance } from '@/lib/PerformanceContext';
import { useHomePageState } from '@/hooks/useHomePageState';
import HomeHeader from '@/components/Home/HomeHeader';
import HeroSection from '@/components/Home/HeroSection';
import ProblemSolutionSection from '@/components/Home/ProblemSolutionSection';
import HowItWorksSection from '@/components/Home/HowItWorksSection';
import FAQSection from '@/components/Home/FAQSection';
import PricingSection from '@/components/Home/PricingSection';
import FinalCTASection from '@/components/Home/FinalCTASection';
import HomeFooter from '@/components/Home/HomeFooter';
import ScrollProgressBar from '@/components/ScrollProgressBar';

// Lazy load heavy components for better performance
const FloatingChatbot = dynamic(() => import('@/components/FloatingChatbot'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const BentoGrid = dynamic(() => import('@/components/BentoGrid'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-3xl" />
});
const LogoShowcase = dynamic(() => import('@/components/LogoShowcase'), { ssr: true });
const CardBeamAnimation = dynamic(() => import('@/components/CardBeamAnimation'), { ssr: false });

/**
 * Homepage - Landing Page
 * Main entry point for the AI Agent Platform
 */
export default function LandingPage() {
  const { isRTL, language, setLanguage } = useLanguage();
  const { reducedMotion } = useMotion();
  const { animationBudget } = usePerformance();
  const {
    loggedIn,
    userIsAdmin,
    activeRole,
    setActiveRole,
    isScrolled,
    getRoleText
  } = useHomePageState();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Get role-specific content
  const content = {
    headline: getRoleText('headline'),
    subhead: getRoleText('subhead'),
    cta: getRoleText('cta')
  };

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

      {/* Header */}
      <HomeHeader
        isScrolled={isScrolled}
        isRTL={isRTL}
        language={language}
        onLanguageToggle={toggleLanguage}
        loggedIn={loggedIn}
        userIsAdmin={userIsAdmin}
      />

      {/* Main Content */}
      <main className="pt-16" id="main-content">
        {/* Hero Section */}
        <HeroSection
          content={content}
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          isRTL={isRTL}
        />

        {/* Problem Solution Section */}
        <ProblemSolutionSection isRTL={isRTL} />

        {/* Bento Grid Features */}
        <BentoGrid isRTL={isRTL} />

        {/* How It Works */}
        <HowItWorksSection isRTL={isRTL} />

        {/* Logo Showcase */}
        <div className="py-24 bg-[var(--role-surface)]">
          <LogoShowcase isRTL={isRTL} />
        </div>

        {/* Pricing Section */}
        <PricingSection isRTL={isRTL} />

        {/* FAQ Section */}
        <FAQSection isRTL={isRTL} />

        {/* Final CTA */}
        <FinalCTASection isRTL={isRTL} />

        {/* Footer */}
        <HomeFooter isRTL={isRTL} />
      </main>

      {/* Floating Chatbot */}
      <FloatingChatbot />

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
}
