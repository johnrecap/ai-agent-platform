/**
 * Settings Locales
 * All text content for Settings module
 */

export const settingsLocales = {
    en: {
        // Page
        pageTitle: 'Settings',
        pageSubtitle: 'Manage your account preferences',

        // Categories
        profile: 'Profile',
        security: 'Security',
        notifications: 'Notifications',
        theme: 'Theme',
        general: 'General',

        // Profile
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        bio: 'Bio',
        avatar: 'Avatar',

        // Security
        twoFactor: 'Two-Factor Authentication',
        sessionTimeout: 'Session Timeout (minutes)',
        passwordExpiry: 'Password Expiry (days)',
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',

        // Notifications
        emailNotifications: 'Email Notifications',
        pushNotifications: 'Push Notifications',
        smsNotifications: 'SMS Notifications',
        slackNotifications: 'Slack Notifications',

        // Theme
        themeMode: 'Theme Mode',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        autoMode: 'Auto (System)',
        language: 'Language',

        // Actions
        save: 'Save Changes',
        cancel: 'Cancel',
        reset: 'Reset to Default',
        saving: 'Saving...',

        // Messages
        settingsSaved: 'Settings saved successfully',
        settingsFailed: 'Failed to save settings',

        // Labels
        enabled: 'Enabled',
        disabled: 'Disabled'
    }
};

export const getSettingsText = (key, lang = 'en') => {
    return settingsLocales[lang]?.[key] || key;
};
