'use client';

/**
 * Landing Page - Professional 2025 Design
 * AI Agent Hosting Platform
 */

import { useEffect, useState } from 'react';
import { isLoggedIn, isAdmin, logout, getUser } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LandingFeatureCard from '@/components/LandingFeatureCard';
import PricingCard from '@/components/PricingCard';
import FAQAccordion from '@/components/FAQAccordion';

export default function LandingPage() {
  const router = useRouter();
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUserIsAdmin(isAdmin());
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUserIsAdmin(false);
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Features data
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
      title: isRTL ? 'أنشئ الـ Agent' : 'Create Your Agent',
      description: isRTL
        ? 'سجّل حساب وأنشئ الـ AI agent الخاص بك في دقائق'
        : 'Sign up and create your AI agent in minutes'
    },
    {
      number: '02',
      title: isRTL ? 'خصّص ودرّب' : 'Customize & Train',
      description: isRTL
        ? 'خصّص الإعدادات ودرّب الـ agent على بياناتك'
        : 'Customize settings and train the agent on your data'
    },
    {
      number: '03',
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
    <div className="min-h-screen bg-[var(--bg-primary)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-[var(--text-primary)]">AI Agent Platform</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {language === 'ar' ? 'EN' : 'ع'}
            </button>

            {loggedIn ? (
              <>
                <Link href="/profile" className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || '?'}
                  </span>
                  <span className="hidden sm:inline">{user?.name || t('common.profile')}</span>
                </Link>
                {userIsAdmin && (
                  <Link href="/admin" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all">
                    {isRTL ? 'لوحة الأدمن' : 'Admin Panel'}
                  </Link>
                )}
                <button onClick={handleLogout} className="px-4 py-2 text-[var(--text-secondary)] hover:text-red-400 transition-colors">
                  {isRTL ? 'تسجيل خروج' : 'Logout'}
                </button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all">
                {isRTL ? 'دخول' : 'Login'}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {isRTL ? 'منصة الذكاء الاصطناعي' : 'AI-Powered Platform'}
            </span>
            <br />
            <span className="text-[var(--text-primary)]">
              {isRTL ? 'للأعمال الذكية' : 'for Smart Business'}
            </span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            {isRTL
              ? 'أنشئ وأدر chatbots ذكية مدعومة بالذكاء الاصطناعي. دمج سهل، تخصيص كامل، نتائج فورية.'
              : 'Create and manage smart AI-powered chatbots. Easy integration, full customization, instant results.'
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-purple-500/30"
            >
              {isRTL ? '🚀 ابدأ مجاناً' : '🚀 Get Started Free'}
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-4 bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl font-semibold hover:border-purple-500 transition-all"
            >
              {isRTL ? '💰 عرض الأسعار' : '💰 View Pricing'}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)]">24/7</div>
              <div className="text-sm text-[var(--text-secondary)]">{isRTL ? 'متاح دائماً' : 'Available'}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)]">⚡</div>
              <div className="text-sm text-[var(--text-secondary)]">{isRTL ? 'استجابة سريعة' : 'Fast Response'}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)]">🔒</div>
              <div className="text-sm text-[var(--text-secondary)]">{isRTL ? 'آمن ومحمي' : 'Secure'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {isRTL ? 'لماذا تختار منصتنا؟' : 'Why Choose Our Platform?'}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {isRTL
              ? 'نوفر لك كل ما تحتاجه لإنشاء وإدارة chatbots احترافية'
              : 'We provide everything you need to create and manage professional chatbots'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <LandingFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isRTL ? 'كيف يعمل؟' : 'How It Works'}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isRTL
                ? 'ثلاث خطوات بسيطة للبدء مع منصتنا'
                : 'Three simple steps to get started with our platform'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />
                )}

                <div className="relative bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-primary)] hover:border-purple-500/50 transition-all group hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 text-center">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {isRTL ? 'اختر الباقة المناسبة' : 'Choose Your Plan'}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {isRTL
              ? 'باقات مرنة تناسب جميع الأعمال - من الشركات الناشئة إلى المؤسسات الكبيرة'
              : 'Flexible plans for all businesses - from startups to enterprises'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={index}
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
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[var(--bg-secondary)] py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-[var(--text-secondary)]">
              {isRTL
                ? 'إجابات على الأسئلة الأكثر شيوعاً'
                : 'Answers to the most common questions'
              }
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 p-12 md:p-16 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isRTL ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              {isRTL
                ? 'انضم إلى آلاف الشركات التي تستخدم منصتنا لتحسين خدمة العملاء'
                : 'Join thousands of businesses using our platform to improve customer service'
              }
            </p>
            <Link
              href="/login"
              className="inline-block px-10 py-4 bg-white text-purple-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
            >
              {isRTL ? '🚀 ابدأ مجاناً الآن' : '🚀 Start Free Now'}
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <span className="font-bold text-[var(--text-primary)]">AI Agent Platform</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {isRTL
                  ? 'منصة احترافية لاستضافة وإدارة الذكاء الاصطناعي'
                  : 'Professional platform for AI hosting and management'
                }
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                {isRTL ? 'المنتج' : 'Product'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'المميزات' : 'Features'}</Link></li>
                <li><Link href="#pricing" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'الأسعار' : 'Pricing'}</Link></li>
                <li><Link href="/login" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'لوحة التحكم' : 'Dashboard'}</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                {isRTL ? 'الشركة' : 'Company'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'عن المنصة' : 'About'}</Link></li>
                <li><Link href="/login" className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors">{isRTL ? 'تواصل معنا' : 'Contact'}</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                {isRTL ? 'قانوني' : 'Legal'}
              </h3>
              <ul className="space-y-2 text-sm">
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
              className="text-sm text-[var(--text-secondary)] hover:text-purple-400 transition-colors"
            >
              {isRTL ? '❤️ صُنع بواسطة محمد سعيد' : '❤️ Developed by Muhammad Saeed'}
            </Link>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 10px) scale(1.05); }
        }
        .animate-blob { animation: blob 10s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
