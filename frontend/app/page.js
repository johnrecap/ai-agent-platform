'use client';

/**
 * Ultra-Premium Landing Page
 * AI Agent Platform - Cutting-edge Design
 * 
 * Deployment:
 * - Frontend: Vercel (auto-deploy)
 * - Backend: Railway
 * - Database: NeonDB (PostgreSQL)
 */

import { useEffect, useState, useRef } from 'react';
import { isLoggedIn, isAdmin, logout, getUser } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import LandingFeatureCard from '@/components/LandingFeatureCard';
import PricingCard from '@/components/PricingCard';
import FAQAccordion from '@/components/FAQAccordion';
import FloatingChatbot from '@/components/FloatingChatbot';

export default function LandingPage() {
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [loggedIn] = useState(() => isLoggedIn());
  const [userIsAdmin] = useState(() => isAdmin());
  const [user] = useState(() => getUser());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Generate particles once using lazy initializer (React-recommended pattern)
  const [heroParticles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }))
  );

  const [ctaParticles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  );

  useEffect(() => {
    // Mouse tracking for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh to update auth state
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Features data with premium icons
  const features = [
    {
      icon: '🚀',
      title: isRTL ? 'تكامل سهل' : 'Easy Integration',
      description: isRTL
        ? 'دمج الذكاء الاصطناعي في موقعك خلال دقائق بكود بسيط'
        : 'Integrate AI into your website within minutes with simple code'
    },
    {
      icon: '🎨',
      title: isRTL ? 'ودجت قابلة للتخصيص' : 'Customizable Widgets',
      description: isRTL
        ? 'خصص الألوان والأيقونة والأسلوب ليتناسب مع علامتك التجارية'
        : 'Customize colors, icons, and style to match your brand'
    },
    {
      icon: '📊',
      title: isRTL ? 'لوحة تحكم تحليلية' : 'Analytics Dashboard',
      description: isRTL
        ? 'تتبع المحادثات والإحصائيات في الوقت الفعلي'
        : 'Track conversations and statistics in real-time'
    },
    {
      icon: '🔒',
      title: isRTL ? 'آمن وخاص' : 'Secure & Private',
      description: isRTL
        ? 'بياناتك محمية بأحدث معايير الأمان'
        : 'Your data is protected with the latest security standards'
    },
    {
      icon: '💬',
      title: isRTL ? 'دعم متعدد اللغات' : 'Multi-language Support',
      description: isRTL
        ? 'تواصل مع عملائك بالعربية والإنجليزية وأكثر'
        : 'Communicate with your customers in Arabic, English, and more'
    },
    {
      icon: '⚡',
      title: isRTL ? 'أداء سريع' : 'Fast Performance',
      description: isRTL
        ? 'استجابة فورية مع البنية التحتية المحسّنة'
        : 'Instant response with optimized infrastructure'
    }
  ];

  // How it works steps
  const steps = [
    {
      number: '01',
      icon: '✨',
      title: isRTL ? 'أنشئ الـ Agent' : 'Create Your Agent',
      description: isRTL
        ? 'سجّل حساب وأنشئ الـ AI agent الخاص بك في دقائق'
        : 'Sign up and create your AI agent in minutes'
    },
    {
      number: '02',
      icon: '🎯',
      title: isRTL ? 'خصّص ودرّب' : 'Customize & Train',
      description: isRTL
        ? 'خصّص الإعدادات ودرّب الـ agent على بياناتك'
        : 'Customize settings and train the agent on your data'
    },
    {
      number: '03',
      icon: '🚀',
      title: isRTL ? 'انشر في أي مكان' : 'Deploy Anywhere',
      description: isRTL
        ? 'احصل على كود التضمين وانشره على موقعك فوراً'
        : 'Get the embed code and deploy it on your site instantly'
    }
  ];

  // Pricing tiers
  const pricingTiers = [
    {
      tier: isRTL ? 'مجاني' : 'Free',
      price: isRTL ? 'مجاناً' : 'Free',
      description: isRTL ? 'للبدء والتجربة' : 'Perfect for getting started',
      features: [
        isRTL ? 'وكيل واحد' : '1 Agent',
        isRTL ? '100 محادثة/شهر' : '100 conversations/month',
        isRTL ? 'دعم أساسي' : 'Basic support',
        isRTL ? 'تحليلات أساسية' : 'Basic analytics'
      ],
      cta: isRTL ? 'ابدأ مجاناً' : 'Get Started Free',
      ctaLink: '/login'
    },
    {
      tier: isRTL ? 'احترافي' : 'Pro',
      price: '$29',
      period: isRTL ? 'شهر' : 'month',
      description: isRTL ? 'للأعمال المتنامية' : 'For growing businesses',
      features: [
        isRTL ? '5 وكلاء' : '5 Agents',
        isRTL ? '1,000 محادثة/شهر' : '1,000 conversations/month',
        isRTL ? 'دعم ذو أولوية' : 'Priority support',
        isRTL ? 'تحليلات متقدمة' : 'Advanced analytics',
        isRTL ? 'تخصيص كامل' : 'Full customization',
        isRTL ? 'إزالة العلامة التجارية' : 'Remove branding'
      ],
      cta: isRTL ? 'اشترك الآن' : 'Subscribe Now',
      ctaLink: '/login',
      popular: true
    },
    {
      tier: isRTL ? 'مؤسسات' : 'Enterprise',
      price: isRTL ? 'مخصص' : 'Custom',
      description: isRTL ? 'للشركات الكبيرة' : 'For large organizations',
      features: [
        isRTL ? 'وكلاء غير محدودة' : 'Unlimited agents',
        isRTL ? 'محادثات غير محدودة' : 'Unlimited conversations',
        isRTL ? 'دعم مخصص' : 'Dedicated support',
        isRTL ? 'تكامل متقدم' : 'Advanced integrations',
        isRTL ? 'SLA مضمون' : 'Guaranteed SLA',
        isRTL ? 'حلول White-label' : 'White-label solutions'
      ],
      cta: isRTL ? 'تواصل معنا' : 'Contact Us',
      ctaLink: '/login'
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: isRTL ? 'ما هي منصة AI Agent؟' : 'What is AI Agent Platform?',
      answer: isRTL
        ? 'منصة AI Agent هي نظام متكامل لاستضافة وإدارة chatbots مدعومة بالذكاء الاصطناعي. تسمح للشركات بإنشاء وإدارة agents متعددة، تتبع المحادثات، والتكامل مع أنظمة AI متقدمة.'
        : 'AI Agent Platform is a comprehensive system for hosting and managing AI-powered chatbots. It allows businesses to create and manage multiple agents, track conversations, and integrate with advanced AI systems.'
    },
    {
      question: isRTL ? 'كيف يمكنني البدء؟' : 'How do I get started?',
      answer: isRTL
        ? 'ببساطة، سجل حساب مجاني، أنشئ الـ agent الخاص بك، خصصه حسب احتياجاتك، واحصل على كود التضمين لإضافته إلى موقعك. العملية تستغرق أقل من 10 دقائق!'
        : 'Simply sign up for a free account, create your agent, customize it to your needs, and get the embed code to add to your website. The process takes less than 10 minutes!'
    },
    {
      question: isRTL ? 'هل يمكنني تخصيص الـ Agent؟' : 'Can I customize the Agent?',
      answer: isRTL
        ? 'نعم! يمكنك تخصيص الألوان، الأيقونة، رسائل الترحيب، وسلوك الـ agent بالكامل. في الباقة الاحترافية، يمكنك أيضاً إزالة علامتنا التجارية.'
        : 'Yes! You can customize colors, icons, welcome messages, and agent behavior completely. On the Pro plan, you can also remove our branding.'
    },
    {
      question: isRTL ? 'ما هي اللغات المدعومة؟' : 'What languages are supported?',
      answer: isRTL
        ? 'نحن ندعم حالياً العربية والإنجليزية مع دعم ثنائي الاتجاه (BiDi) كامل. المزيد من اللغات قادمة قريباً!'
        : 'We currently support Arabic and English with full bidirectional (BiDi) support. More languages coming soon!'
    },
    {
      question: isRTL ? 'هل بياناتي آمنة؟' : 'Is my data secure?',
      answer: isRTL
        ? 'الأمان هو أولويتنا. نحن نستخدم HTTPS في كل مكان، تشفير البيانات، والامتثال لمعايير GDPR. بياناتك محمية بأحدث معايير الأمان.'
        : 'Security is our priority. We use HTTPS everywhere, data encryption, and GDPR compliance. Your data is protected with the latest security standards.'
    },
    {
      question: isRTL ? 'هل يمكنني الترقية أو الإلغاء؟' : 'Can I upgrade or cancel?',
      answer: isRTL
        ? 'بالتأكيد! يمكنك الترقية أو الإلغاء في أي وقت من لوحة التحكم. لا توجد التزامات طويلة الأجل.'
        : 'Absolutely! You can upgrade or cancel at any time from your dashboard. No long-term commitments.'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation Header with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-primary)]/50 bg-[var(--bg-secondary)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              🤖
            </div>
            <span className="font-bold text-[var(--text-primary)] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI Agent Platform
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-105 transition-all duration-300"
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </button>

            {loggedIn ? (
              <>
                <Link href="/profile" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || '?'}
                  </span>
                  <span className="hidden sm:inline">{user?.name || 'Profile'}</span>
                </Link>
                {userIsAdmin && (
                  <Link href="/admin" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                    {isRTL ? 'لوحة الأدمن' : 'Admin Panel'}
                  </Link>
                )}
                <button onClick={handleLogout} className="px-4 py-2 text-[var(--text-secondary)] hover:text-red-400 transition-colors">
                  {isRTL ? 'خروج' : 'Logout'}
                </button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                {isRTL ? 'دخول' : 'Login'}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Advanced Animations */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20" />

        {/* Floating Orbs with Parallax */}
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />

        {/* Particles */}
        <div className="absolute inset-0">
          {heroParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
          {/* Main Heading with Reveal Animation */}
          <div className="overflow-hidden mb-6">
            <h1 className="text-6xl md:text-8xl font-extrabold animate-reveal">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x">
                {isRTL ? 'منصة الذكاء الاصطناعي' : 'AI-Powered Platform'}
              </span>
            </h1>
          </div>

          <div className="overflow-hidden mb-6">
            <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] animate-reveal" style={{ animationDelay: '0.2s' }}>
              {isRTL ? 'للأعمال الذكية' : 'for Smart Business'}
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 animate-reveal" style={{ animationDelay: '0.4s' }}>
            {isRTL
              ? 'أنشئ وأدر chatbots ذكية مدعومة بالذكاء الاصطناعي. دمج سهل، تخصيص كامل، نتائج فورية.'
              : 'Create and manage smart AI-powered chatbots. Easy integration, full customization, instant results.'
            }
          </p>

          {/* CTA Buttons with Advanced Hover Effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-reveal" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/login"
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="relative flex items-center gap-2">
                🚀 {isRTL ? 'ابدأ مجاناً' : 'Get Started Free'}
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>

            <Link
              href="#pricing"
              className="group px-10 py-5 bg-[var(--bg-card)]/50 backdrop-blur-sm border-2 border-purple-500/50 text-[var(--text-primary)] rounded-2xl font-bold text-lg hover:border-purple-500 hover:bg-[var(--bg-card)] hover:scale-105 transition-all duration-300"
            >
              💰 {isRTL ? 'عرض الأسعار' : 'View Pricing'}
            </Link>
          </div>

          {/* 3D Stats Cards */}
          <div className="flex justify-center gap-8 flex-wrap animate-reveal" style={{ animationDelay: '0.8s' }}>
            {[
              { icon: '⚡', label: isRTL ? 'استجابة فورية' : 'Instant Response' },
              { icon: '🔒', label: isRTL ? 'آمن 100%' : '100% Secure' },
              { icon: '🌍', label: isRTL ? 'متعدد اللغات' : 'Multi-Language' },
            ].map((stat, i) => (
              <div
                key={i}
                className="group px-8 py-4 bg-[var(--bg-card)]/30 backdrop-blur-md border border-[var(--border-primary)]/50 rounded-2xl hover:bg-[var(--bg-card)]/50 hover:border-purple-500/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                style={{ animationDelay: `${0.8 + i * 0.1}s` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-purple-400 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-purple-500 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Features Section with Tilt Effect */}
      <section className="relative max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {isRTL ? 'لماذا تختار منصتنا؟' : 'Why Choose Our Platform?'}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {isRTL
              ? 'نوفر لك كل ما تحتاجه لإنشاء وإدارة chatbots احترافية'
              : 'We provide everything you need to create and manage professional chatbots'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <LandingFeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works - Animated Timeline */}
      <section className="relative bg-[var(--bg-secondary)] py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-6">
              {isRTL ? 'كيف يعمل؟' : 'How It Works'}
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isRTL
                ? 'ثلاث خطوات بسيطة للبدء مع منصتنا'
                : 'Three simple steps to get started with our platform'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-20" style={{ width: '66%', left: '17%' }} />

            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="relative bg-[var(--bg-card)]/50 backdrop-blur-sm rounded-3xl p-8 border border-[var(--border-primary)] hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Step Number with Glow */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center group-hover:text-purple-400 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Shimmer Effect */}
      <section id="pricing" className="relative max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-6">
            {isRTL ? 'اختر الباقة المناسبة' : 'Choose Your Plan'}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {isRTL
              ? 'باقات مرنة تناسب جميع الأعمال - من الشركات الناشئة إلى المؤسسات الكبيرة'
              : 'Flexible plans for all businesses - from startups to enterprises'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="transform hover:scale-105 transition-transform duration-300">
              <PricingCard
                tier={tier.tier}
                price={tier.price}
                period={tier.period}
                description={tier.description}
                features={tier.features}
                cta={tier.cta}
                ctaLink={tier.ctaLink}
                popular={tier.popular}
                delay={index * 100}
              />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-[var(--bg-secondary)] py-32">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-6">
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              {isRTL
                ? 'إجابات على الأسئلة الأكثر شيوعاً'
                : 'Answers to the most common questions'
              }
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA Section with Particles */}
      <section className="relative max-w-7xl mx-auto px-4 py-32">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 p-16 md:p-24 text-center shadow-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {ctaParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float-random"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isRTL ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-white/90 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
              {isRTL
                ? 'انضم إلى آلاف الشركات التي تستخدم منصتنا لتحسين خدمة العملاء'
                : 'Join thousands of businesses using our platform to improve customer service'
              }
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-12 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              🚀 {isRTL ? 'ابدأ مجاناً الآن' : 'Start Free Now'}
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🤖</span>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  AI Agent Platform
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                {isRTL
                  ? 'منصة احترافية لاستضافة وإدارة الذكاء الاصطناعي'
                  : 'Professional platform for AI hosting and management'
                }
              </p>
              <div className="flex gap-4">
                <div className="text-lg text-[var(--text-secondary)] hover:text-purple-400 transition-colors">✨</div>
                <div className="text-lg text-[var(--text-secondary)] hover:text-purple-400 transition-colors">🚀</div>
                <div className="text-lg text-[var(--text-secondary)] hover:text-purple-400 transition-colors">💡</div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-6 text-lg">{isRTL ? 'المنتج' : 'Product'}</h3>
              <ul className="space-y-3">
                <li><Link href="/login" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'المميزات' : 'Features'}</Link></li>
                <li><Link href="#pricing" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'الأسعار' : 'Pricing'}</Link></li>
                <li><Link href="/login" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'لوحة التحكم' : 'Dashboard'}</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-6 text-lg">{isRTL ? 'الشركة' : 'Company'}</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'عن المنصة' : 'About'}</Link></li>
                <li><Link href="/login" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'تواصل معنا' : 'Contact'}</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-6 text-lg">{isRTL ? 'قانوني' : 'Legal'}</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
                <li><Link href="/" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'شروط الاستخدام' : 'Terms of Service'}</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[var(--border-primary)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © 2025 AI Agent Platform. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
            <Link
              href="/"
              className="text-sm text-[var(--text-secondary)] hover:text-purple-400 transition-colors flex items-center gap-2 group"
            >
              <span className="group-hover:scale-110 transition-transform">❤️</span>
              {isRTL ? 'صُنع بواسطة محمد سعيد' : 'Developed by Muhammad Saeed'}
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Widget */}
      <FloatingChatbot agentId="1" />

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.05); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(30px, 10px) scale(1.02); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-30px, 20px) scale(1.05); }
          50% { transform: translate(20px, -20px) scale(0.95); }
          75% { transform: translate(-20px, -10px) scale(1.02); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, 15px) rotate(180deg); }
        }
        @keyframes particle {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        @keyframes float-random {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-10px, 10px); }
          75% { transform: translate(10px, 5px); }
        }
        @keyframes reveal {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }
        
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 12s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-particle { animation: particle linear infinite; }
        .animate-float-random { animation: float-random 3s ease-in-out infinite; }
        .animate-reveal { animation: reveal 0.8s ease-out forwards; opacity: 0; }
        .animate-gradient-x { 
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite; 
        }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
