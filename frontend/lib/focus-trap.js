/**
 * Focus Trap Utility
 * Traps keyboard focus within a container
 * For modals, dialogs, and other overlays
 */

export function createFocusTrap(element) {
    if (!element) return null;

    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    };

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            element.dispatchEvent(new CustomEvent('closeFocusTrap'));
        }
    };

    element.addEventListener('keydown', handleTabKey);
    element.addEventListener('keydown', handleEscape);

    // Focus first element
    if (firstFocusable) {
        firstFocusable.focus();
    }

    // Return cleanup function
    return () => {
        element.removeEventListener('keydown', handleTabKey);
        element.removeEventListener('keydown', handleEscape);
    };
}
