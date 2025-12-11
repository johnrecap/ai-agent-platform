'use client';

/**
 * Home Page - Premium 2026 Design with i18n
 * AI Agent Hosting Platform
 */

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { isLoggedIn, isAdmin, logout, getUser } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlassCard, GradientButton, Skeleton } from '@/components/ui';

export default function HomePage() {
  const router = useRouter();
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadAgents();
    setLoggedIn(isLoggedIn());
    setUserIsAdmin(isAdmin());
    setUser(getUser());
  }, []);

  const loadAgents = async () => {
    try {
      const response = await api.get('/api/agents/public');
      setAgents(response.data.data || []);
    } catch (error) {
      console.error('Error loading agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUserIsAdmin(false);
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const filteredAgents = agents.filter(agent =>
    agent.agent_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-[var(--text-primary)]">{t('nav.aiAgentPlatform')}</span>
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
                    {t('nav.adminPanel')}
                  </Link>
                )}
                <button onClick={handleLogout} className="px-4 py-2 text-[var(--text-secondary)] hover:text-red-400 transition-colors">
                  {t('common.logout')}
                </button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all">
                {t('common.login')}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {t('home.heroTitle')}
            </span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            {t('home.heroSubtitle')}
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder={t('home.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl text-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)]">{agents.length}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t('home.activeAgents')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)]">24/7</div>
              <div className="text-sm text-[var(--text-secondary)]">{t('home.available')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)]">{t('home.fast')}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t('home.response')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {t('home.availableAgents')}
          </h2>
          <span className="text-sm text-[var(--text-secondary)]">
            {filteredAgents.length} {t('home.agents')}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-primary)]">
                <Skeleton className="w-16 h-16 mb-4" variant="rectangular" />
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
            ))}
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-7xl mb-6 block">🤖</span>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              {searchQuery ? t('home.noAgentsFound') : t('home.noAgentsAvailable')}
            </h3>
            <p className="text-[var(--text-secondary)]">
              {searchQuery ? t('home.tryDifferentSearch') : t('home.checkBackLater')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map(agent => (
              <Link key={agent.id} href={'/agent/' + agent.id}>
                <GlassCard className="p-6 h-full group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🤖
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2 group-hover:text-purple-400 transition-colors">
                    {agent.agent_name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                    {agent.description || agent.page_title || 'AI Agent'}
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-primary)]">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-[var(--text-tertiary)]">{t('common.online')}</span>
                    <span className={`${isRTL ? 'mr-auto' : 'ml-auto'} text-xs text-purple-400 group-hover:translate-x-1 transition-transform`}>
                      {t('home.chatNow')} →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-primary)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-[var(--text-muted)] text-sm">
          <p>{t('nav.aiAgentPlatform')} • Built with Next.js</p>
        </div>
      </footer>

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
