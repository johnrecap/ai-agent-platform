'use client';

/**
 * SearchBar Component
 * AI Agent Hosting Platform
 */

import { useState } from 'react';

export default function SearchBar({
    placeholder = 'Search...',
    onSearch,
    debounceMs = 300,
    initialValue = ''
}) {
    const [value, setValue] = useState(initialValue);
    const [timer, setTimer] = useState(null);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);

        // Clear existing timer
        if (timer) clearTimeout(timer);

        // Debounce search
        const newTimer = setTimeout(() => {
            onSearch(newValue);
        }, debounceMs);

        setTimer(newTimer);
    };

    const handleClear = () => {
        setValue('');
        onSearch('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (timer) clearTimeout(timer);
        onSearch(value);
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
                {/* Search icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Input */}
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                />

                {/* Clear button */}
                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
}
