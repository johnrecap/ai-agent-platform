'use client';

import { useState } from 'react';
import { Search, Book } from 'lucide-react';
import DocCard from './DocCard';
import { useDocs } from '@/hooks/useDocs';
import { getDocsText } from '@/locales/docsLocales';
import { DOC_CATEGORIES } from '@/constants/docsConstants';

/**
 * Documentation Page Container
 */
const DocsPageContainer = () => {
    const t = (key) => getDocsText(key);
    const { docs, loading } = useDocs();
    const [filterCategory, setFilterCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    if (loading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    const filteredDocs = docs.filter(doc => {
        if (filterCategory && doc.category !== filterCategory) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return doc.title.toLowerCase().includes(query) ||
                doc.content.toLowerCase().includes(query);
        }
        return true;
    });

    const handleDocClick = (doc) => {
        alert(`Viewing: ${doc.title}\n\n${doc.content.substring(0, 200)}...`);
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Book size={32} className="text-blue-600" />
                    {t('pageTitle')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{t('pageSubtitle')}</p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('search')}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                    />
                </div>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                >
                    <option value="">All Categories</option>
                    {DOC_CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {DOC_CATEGORIES.map(cat => {
                    const count = docs.filter(d => d.category === cat.value).length;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => setFilterCategory(cat.value === filterCategory ? '' : cat.value)}
                            className={`p-4 rounded-xl border-2 transition-all ${filterCategory === cat.value
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <div className="text-2xl mb-1">{cat.icon}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{cat.label}</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{count}</div>
                        </button>
                    );
                })}
            </div>

            {/* Documentation List */}
            <div className="space-y-4">
                {filteredDocs.length > 0 ? (
                    filteredDocs.map(doc => (
                        <DocCard key={doc.id} doc={doc} onClick={handleDocClick} />
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        {t('noResults')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocsPageContainer;
