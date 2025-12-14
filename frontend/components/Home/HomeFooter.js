import Link from 'next/link';

/**
 * Homepage Footer Component
 * Simple footer with copyright and developer credit
 */
export default function HomeFooter({ isRTL }) {
    return (
        <footer className="border-t border-[var(--role-border)] bg-[var(--role-surface)] py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-small text-[var(--role-text-secondary)]">
                    © 2025 AI Agent Platform. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
                </p>
                <p className="text-small text-[var(--role-text-tertiary)] mt-2">
                    {isRTL ? 'طُوّر بواسطة' : 'Developed by'}{' '}
                    <Link href="/" className="text-[var(--role-accent)] hover:underline">
                        Muhammad Saeed
                    </Link>
                </p>
            </div>
        </footer>
    );
}
