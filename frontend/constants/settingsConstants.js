/**
 * Settings Constants
 * Settings categories and options
 */

export const SETTING_CATEGORIES = [
    { value: 'profile', label: 'Profile', icon: '👤' },
    { value: 'security', label: 'Security', icon: '🔒' },
    { value: 'notifications', label: 'Notifications', icon: '🔔' },
    { value: 'theme', label: 'Theme', icon: '🎨' },
    { value: 'general', label: 'General', icon: '⚙️' }
];

export const THEME_OPTIONS = [
    { value: 'light', label: 'Light Mode', icon: '☀️' },
    { value: 'dark', label: 'Dark Mode', icon: '🌙' },
    { value: 'auto', label: 'Auto (System)', icon: '🔄' }
];

export const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ar', label: 'العربية', flag: '🇸🇦' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' }
];

export const NOTIFICATION_TYPES = [
    { key: 'email', label: 'Email Notifications' },
    { key: 'push', label: 'Push Notifications' },
    { key: 'sms', label: 'SMS Notifications' },
    { key: 'slack', label: 'Slack Notifications' }
];

export const SECURITY_OPTIONS = [
    { key: 'two_factor', label: 'Two-Factor Authentication' },
    { key: 'session_timeout', label: 'Auto Logout (minutes)' },
    { key: 'password_expiry', label: 'Password Expiry (days)' }
];
