/**
 * Documentation Utilities
 * Helper functions for documentation
 */

/**
 * Get category icon
 * @param {string} category - Category name
 * @returns {string} Icon emoji  
 */
export const getCategoryIcon = (category) => {
    const icons = {
        'getting-started': '🚀',
        'features': '✨',
        'api': '🔌',
        'troubleshooting': '🔧',
        'faq': '❓'
    };
    return icons[category] || '📄';
};

/**
 * Search docs
 * @param {array} docs - Documentation array
 * @param {string} query - Search query
 * @returns {array} Filtered docs
 */
export const searchDocs = (docs, query) => {
    if (!query) return docs;

    const lowerQuery = query.toLowerCase();
    return docs.filter(doc =>
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.content.toLowerCase().includes(lowerQuery)
    );
};
