'use client';

/**
 * Settings Page with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { GlassCard, GradientButton } from '@/components/ui';
import toast from 'react-hot-toast';

// ToggleSwitch component defined OUTSIDE main component
function ToggleSwitch({ enabled, onChange, label, isRTL }) {
    return (
        <div className="flex items-center justify-between py-3">
            <span className="text-[var(--text-primary)]">{label}</span>
            <button
                onClick={() => onChange(!enabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-purple-500' : 'bg-[var(--bg-tertiary)]'}`}
            >
                <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled
                            ? (isRTL ? 'right-7' : 'left-7')
                            : (isRTL ? 'right-1' : 'left-1')
                        }`}
                />
            </button>
        </div>
    );
}

export default function SettingsPage() {
    const { t, isRTL, language, setLanguage } = useLanguage();
    const [activeTab, setActiveTab] = useState('profile');
    const [theme, setTheme] = useState('dark');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [compactView, setCompactView] = useState(false);
    const [apiKeyVisible, setApiKeyVisible] = useState(false);

    const txt = {
        title: language === 'ar' ? 'الإعدادات' : 'Settings',
        subtitle: language === 'ar' ? 'إدارة حسابك وتفضيلاتك' : 'Manage your account and preferences',
        profile: language === 'ar' ? 'الملف الشخصي' : 'Profile',
        security: language === 'ar' ? 'الأمان' : 'Security',
        notifications: language === 'ar' ? 'الإشعارات' : 'Notifications',
        appearance: language === 'ar' ? 'المظهر' : 'Appearance',
        apiKeys: language === 'ar' ? 'مفاتيح API' : 'API Keys',
        profileSettings: language === 'ar' ? 'إعدادات الملف الشخصي' : 'Profile Settings',
        name: language === 'ar' ? 'الاسم' : 'Name',
        email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
        saveChanges: language === 'ar' ? 'حفظ التغييرات' : 'Save Changes',
        changePassword: language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password',
        currentPassword: language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password',
        newPassword: language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password',
        confirmPassword: language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password',
        updatePassword: language === 'ar' ? 'تحديث كلمة المرور' : 'Update Password',
        twoFactor: language === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Authentication',
        twoFactorDesc: language === 'ar' ? 'أضف طبقة أمان إضافية لحسابك' : 'Add an extra layer of security',
        enable2FA: language === 'ar' ? 'تفعيل 2FA' : 'Enable 2FA',
        activeSessions: language === 'ar' ? 'الجلسات النشطة' : 'Active Sessions',
        currentSession: language === 'ar' ? 'الجلسة الحالية' : 'Current session',
        active: language === 'ar' ? 'نشط' : 'Active',
        notificationPrefs: language === 'ar' ? 'تفضيلات الإشعارات' : 'Notification Preferences',
        emailNotifications: language === 'ar' ? 'إشعارات البريد' : 'Email Notifications',
        pushNotifications: language === 'ar' ? 'الإشعارات الفورية' : 'Push Notifications',
        newConvAlerts: language === 'ar' ? 'تنبيهات المحادثات' : 'New Conversation Alerts',
        weeklyReports: language === 'ar' ? 'التقارير الأسبوعية' : 'Weekly Reports',
        themeLabel: language === 'ar' ? 'المظهر' : 'Theme',
        dark: language === 'ar' ? 'داكن' : 'Dark',
        light: language === 'ar' ? 'فاتح' : 'Light',
        compactView: language === 'ar' ? 'العرض المضغوط' : 'Compact View',
        liveApiKey: language === 'ar' ? 'مفتاح API' : 'Live API Key',
        show: language === 'ar' ? 'عرض' : 'Show',
        hide: language === 'ar' ? 'إخفاء' : 'Hide',
        copy: language === 'ar' ? '📋 نسخ' : '📋 Copy',
        regenerate: language === 'ar' ? '🔄 إعادة' : '🔄 Regenerate',
        usage: language === 'ar' ? 'الاستخدام' : 'Usage',
        apiCallsToday: language === 'ar' ? 'استدعاءات اليوم' : 'API Calls Today',
        monthlyLimit: language === 'ar' ? 'الحد الشهري' : 'Monthly Limit',
        settingsSaved: language === 'ar' ? 'تم الحفظ!' : 'Settings saved!',
        themeChanged: language === 'ar' ? 'تم تغيير المظهر' : 'Theme changed',
        copied: language === 'ar' ? 'تم النسخ!' : 'Copied!',
        keyRegenerated: language === 'ar' ? 'تم إعادة الإنشاء!' : 'Key regenerated!',
        languageLabel: language === 'ar' ? 'اللغة' : 'Language',
        arabic: 'العربية',
        english: 'English',
    };

    const tabs = [
        { id: 'profile', icon: '👤', label: txt.profile },
        { id: 'security', icon: '🔒', label: txt.security },
        { id: 'notifications', icon: '🔔', label: txt.notifications },
        { id: 'appearance', icon: '🎨', label: txt.appearance },
        { id: 'api', icon: '🔑', label: txt.apiKeys },
    ];

    const handleSave = () => {
        toast.success(txt.settingsSaved);
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        toast.success(`${txt.themeChanged}: ${newTheme === 'dark' ? txt.dark : txt.light}`);
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    ⚙️ {txt.title}
                </h1>
                <p className="text-[var(--text-secondary)]">{txt.subtitle}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tabs */}
                <div className="lg:w-48 shrink-0">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'bg-purple-500/20 text-purple-400'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span className="text-sm font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                                {txt.profileSettings}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                        {txt.name}
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Admin User"
                                        className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                        {txt.email}
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="admin@example.com"
                                        className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <GradientButton onClick={handleSave}>
                                    {txt.saveChanges}
                                </GradientButton>
                            </div>
                        </GlassCard>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <GlassCard className="p-6">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                                    {txt.changePassword}
                                </h2>
                                <div className="space-y-4">
                                    <input
                                        type="password"
                                        placeholder={txt.currentPassword}
                                        className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                                    />
                                    <input
                                        type="password"
                                        placeholder={txt.newPassword}
                                        className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                                    />
                                    <input
                                        type="password"
                                        placeholder={txt.confirmPassword}
                                        className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                                    />
                                    <GradientButton onClick={handleSave}>
                                        {txt.updatePassword}
                                    </GradientButton>
                                </div>
                            </GlassCard>

                            <GlassCard className="p-6">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                                    {txt.twoFactor}
                                </h2>
                                <p className="text-[var(--text-secondary)] text-sm mb-4">
                                    {txt.twoFactorDesc}
                                </p>
                                <GradientButton variant="secondary">
                                    {txt.enable2FA}
                                </GradientButton>
                            </GlassCard>

                            <GlassCard className="p-6">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                                    {txt.activeSessions}
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span>💻</span>
                                            <div>
                                                <p className="text-sm text-[var(--text-primary)]">
                                                    Windows • Chrome
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)]">
                                                    {txt.currentSession}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-green-400">{txt.active}</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                                {txt.notificationPrefs}
                            </h2>
                            <div className="divide-y divide-[var(--border-primary)]">
                                <ToggleSwitch
                                    label={txt.emailNotifications}
                                    enabled={emailNotifications}
                                    onChange={setEmailNotifications}
                                    isRTL={isRTL}
                                />
                                <ToggleSwitch
                                    label={txt.pushNotifications}
                                    enabled={pushNotifications}
                                    onChange={setPushNotifications}
                                    isRTL={isRTL}
                                />
                                <ToggleSwitch
                                    label={txt.newConvAlerts}
                                    enabled={true}
                                    onChange={() => { }}
                                    isRTL={isRTL}
                                />
                                <ToggleSwitch
                                    label={txt.weeklyReports}
                                    enabled={true}
                                    onChange={() => { }}
                                    isRTL={isRTL}
                                />
                            </div>
                        </GlassCard>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                                {txt.appearance}
                            </h2>
                            <div className="space-y-6">
                                {/* Language */}
                                <div>
                                    <label className="block text-sm text-[var(--text-secondary)] mb-3">
                                        {txt.languageLabel}
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setLanguage('en')}
                                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${language === 'en'
                                                    ? 'border-purple-500'
                                                    : 'border-[var(--border-primary)]'
                                                }`}
                                        >
                                            <span className="text-2xl mb-2 block">🇬🇧</span>
                                            <span className="text-sm text-[var(--text-primary)]">
                                                {txt.english}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => setLanguage('ar')}
                                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${language === 'ar'
                                                    ? 'border-purple-500'
                                                    : 'border-[var(--border-primary)]'
                                                }`}
                                        >
                                            <span className="text-2xl mb-2 block">🇸🇦</span>
                                            <span className="text-sm text-[var(--text-primary)]">
                                                {txt.arabic}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Theme */}
                                <div>
                                    <label className="block text-sm text-[var(--text-secondary)] mb-3">
                                        {txt.themeLabel}
                                    </label>
                                    <div className="flex gap-3">
                                        {['dark', 'light'].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => handleThemeChange(t)}
                                                className={`flex-1 p-4 rounded-xl border-2 transition-all ${theme === t
                                                        ? 'border-purple-500'
                                                        : 'border-[var(--border-primary)]'
                                                    }`}
                                            >
                                                <span className="text-2xl mb-2 block">
                                                    {t === 'dark' ? '🌙' : '☀️'}
                                                </span>
                                                <span className="text-sm text-[var(--text-primary)]">
                                                    {t === 'dark' ? txt.dark : txt.light}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <ToggleSwitch
                                    label={txt.compactView}
                                    enabled={compactView}
                                    onChange={setCompactView}
                                    isRTL={isRTL}
                                />
                            </div>
                        </GlassCard>
                    )}

                    {/* API Keys Tab */}
                    {activeTab === 'api' && (
                        <div className="space-y-6">
                            <GlassCard className="p-6">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                                    {txt.apiKeys}
                                </h2>
                                <div className="p-4 bg-[var(--bg-tertiary)] rounded-xl mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-[var(--text-secondary)]">
                                            {txt.liveApiKey}
                                        </span>
                                        <button
                                            onClick={() => setApiKeyVisible(!apiKeyVisible)}
                                            className="text-purple-400 text-sm"
                                        >
                                            {apiKeyVisible ? txt.hide : txt.show}
                                        </button>
                                    </div>
                                    <code className="text-sm text-[var(--text-primary)] font-mono">
                                        {apiKeyVisible
                                            ? 'sk_live_1234567890abcdef'
                                            : 'sk_live_••••••••••••••••'
                                        }
                                    </code>
                                </div>
                                <div className="flex gap-2">
                                    <GradientButton
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => {
                                            navigator.clipboard.writeText('sk_live_1234567890abcdef');
                                            toast.success(txt.copied);
                                        }}
                                    >
                                        {txt.copy}
                                    </GradientButton>
                                    <GradientButton
                                        variant="danger"
                                        size="sm"
                                        onClick={() => toast.success(txt.keyRegenerated)}
                                    >
                                        {txt.regenerate}
                                    </GradientButton>
                                </div>
                            </GlassCard>

                            <GlassCard className="p-6">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                                    {txt.usage}
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-[var(--bg-tertiary)] rounded-xl text-center">
                                        <div className="text-2xl font-bold text-[var(--text-primary)]">
                                            1,234
                                        </div>
                                        <div className="text-xs text-[var(--text-secondary)]">
                                            {txt.apiCallsToday}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-[var(--bg-tertiary)] rounded-xl text-center">
                                        <div className="text-2xl font-bold text-[var(--text-primary)]">
                                            10,000
                                        </div>
                                        <div className="text-xs text-[var(--text-secondary)]">
                                            {txt.monthlyLimit}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
