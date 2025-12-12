'use client';

/**
 * Chatbot Widget Component
 * Loads the chatbot widget script on admin pages
 */

import { useEffect } from 'react';

export default function ChatbotWidget() {
    useEffect(() => {
        // Create script element
        const script = document.createElement('script');
        script.src = 'https://ai-agent-platform-three.vercel.app/widget.js';
        script.setAttribute('data-agent-url', 'https://ai-agent-platform-three.vercel.app/agent/5');
        script.setAttribute('data-style', 'bubble');
        script.setAttribute('data-color', '#8b5cf6');
        script.setAttribute('data-position', 'bottom-right');
        script.async = true;

        // Add to document
        document.body.appendChild(script);

        // Cleanup on unmount
        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return null; // This component doesn't render anything
}
