'use client';

import React from 'react';
import { getCategoryIcon } from '@/lib/docsUtils';
import { getDocsText } from '@/locales/docsLocales';
import { FileText } from 'lucide-react';

/**
 * Doc Card Component
 */
const DocCard = ({ doc, onClick }) => {
    const t = (key) => getDocsText(key);

    return (
        <div
            onClick={() => onClick(doc)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-all"
        >
            <div className="flex items-start gap-4">
                <span className="text-3xl">{getCategoryIcon(doc.category)}</span>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{doc.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {doc.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <FileText size={14} />
                        <span>{t('lastUpdated')}: {new Date(doc.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocCard;
