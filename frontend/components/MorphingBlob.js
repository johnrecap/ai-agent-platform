'use client';

/**
 * MorphingBlob Component
 * Animated SVG blob that morphs between shapes
 * Features:
 * - Gradient fill with theme colors
 * - 8-second morph cycle
 * - Infinite loop
 * - Positioned in hero background
 */

export default function MorphingBlob() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <svg
                className="absolute"
                style={{
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '800px',
                    height: '800px',
                    opacity: 0.3
                }}
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>

                <path
                    fill="url(#blobGradient)"
                    filter="blur(40px)"
                >
                    <animate
                        attributeName="d"
                        dur="8s"
                        repeatCount="indefinite"
                        values="
              M47.1,-57.4C59.9,-49.1,68.4,-33.3,71.8,-16.2C75.2,0.9,73.5,19.3,65.3,34.1C57.1,48.9,42.4,60.1,26.3,65.1C10.2,70.1,-7.3,68.9,-23.8,63.4C-40.3,57.9,-55.8,48.1,-64.5,34.2C-73.2,20.3,-75.1,2.3,-71.8,-14.5C-68.5,-31.3,-60,-46.9,-47.6,-55.4C-35.2,-63.9,-17.6,-65.3,0.3,-65.7C18.2,-66.1,36.3,-65.6,47.1,-57.4Z;
              
              M41.9,-53.3C52.4,-43.1,57.6,-28.2,60.3,-12.5C63,3.2,63.2,19.7,56.8,33.1C50.4,46.5,37.4,56.8,22.7,62.3C8,67.8,-8.4,68.5,-23.5,64C-38.6,59.5,-52.4,49.8,-60.5,36.2C-68.6,22.6,-71,5.1,-67.7,-10.9C-64.4,-26.9,-55.4,-41.4,-43.3,-51.2C-31.2,-61,-15.6,-66.1,0.4,-66.6C16.4,-67.1,32.8,-63,41.9,-53.3Z;
              
              M36.4,-47.1C46.7,-38.3,54.3,-26.2,58.4,-12.5C62.5,1.2,63.1,16.5,57.3,29.7C51.5,42.9,39.3,54,25.5,60.5C11.7,67,-3.7,68.9,-18.3,65.3C-32.9,61.7,-46.7,52.6,-55.8,40C-64.9,27.4,-69.3,11.3,-67.8,-4.2C-66.3,-19.7,-59,-34.6,-48.3,-43.2C-37.6,-51.8,-23.5,-54.1,-10.3,-56.8C2.9,-59.5,12.1,-62.6,36.4,-47.1Z;
              
              M47.1,-57.4C59.9,-49.1,68.4,-33.3,71.8,-16.2C75.2,0.9,73.5,19.3,65.3,34.1C57.1,48.9,42.4,60.1,26.3,65.1C10.2,70.1,-7.3,68.9,-23.8,63.4C-40.3,57.9,-55.8,48.1,-64.5,34.2C-73.2,20.3,-75.1,2.3,-71.8,-14.5C-68.5,-31.3,-60,-46.9,-47.6,-55.4C-35.2,-63.9,-17.6,-65.3,0.3,-65.7C18.2,-66.1,36.3,-65.6,47.1,-57.4Z
            "
                    />
                </path>
            </svg>
        </div>
    );
}
