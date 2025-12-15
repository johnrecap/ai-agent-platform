/**
 * Documentation Locales
 * All text content for Documentation module
 */

export const docsLocales = {
    en: {
        // Page
        pageTitle: 'Documentation',
        pageSubtitle: 'Learn how to use the platform',
        helpCenter: 'Help Center',

        // Categories
        gettingStarted: 'Getting Started',
        features: 'Features',
        apiReference: 'API Reference',
        troubleshooting: 'Troubleshooting',
        faq: 'FAQ',

        // Search
        search: 'Search documentation...',
        searchResults: 'Search Results',
        noResults: 'No documentation found',

        // Actions
        viewDoc: 'View',
        backToList: 'Back to List',

        // Labels
        articles: 'articles',
        lastUpdated: 'Last Updated'
    }
};

export const getDocsText = (key, lang = 'en') => {
    return docsLocales[lang]?.[key] || key;
};
