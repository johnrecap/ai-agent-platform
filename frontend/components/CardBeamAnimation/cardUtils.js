/**
 * Card Utilities
 * Helper functions for card beam animation
 */

/**
 * Generate random ASCII code for card overlay
 */
export const generateCode = (width, height) => {
    const codeChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"\'`~?';

    const library = [
        '// compiled preview',
        'const SCAN_WIDTH = 8;',
        'const TRANSITION = 0.05;',
        'function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }',
        'const scanner = { x: window.innerWidth / 2, width: 8 };'
    ];

    let flow = library.join(' ').replace(/\s+/g, ' ').trim();
    const totalChars = width * height;

    while (flow.length < totalChars + width) {
        flow += ' ' + library[Math.floor(Math.random() * library.length)];
    }

    let output = '';
    let offset = 0;
    for (let row = 0; row < height; row++) {
        let line = flow.slice(offset, offset + width);
        if (line.length < width) {
            line = line + ' '.repeat(width - line.length);
        }
        output += line + (row < height - 1 ? '\n' : '');
        offset += width;
    }

    return output;
};

/**
 * Calculate code dimensions based on card size
 */
export const calculateCodeDimensions = (cardWidth, cardHeight) => {
    const fontSize = 11;
    const lineHeight = 13;
    const charWidth = 6;
    const width = Math.floor(cardWidth / charWidth);
    const height = Math.floor(cardHeight / lineHeight);
    return { width, height, fontSize, lineHeight };
};

/**
 * Create fallback gradient image
 */
export const createFallbackImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 400, 250);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 250);

    return canvas.toDataURL();
};
