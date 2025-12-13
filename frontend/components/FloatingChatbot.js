'use client';

/**
 * FloatingChatbot - Widget Script Integration
 * Loads the external chatbot widget
 */

import { useEffect } from 'react';

export default function FloatingChatbot({
    agentId = '4',
    agentUrl = 'https://ai-agent-platform-three.vercel.app/agent/4',
    style = 'bubble',
    color = '#8b5cf6',
    position = 'bottom-right'
}) {
    useEffect(() => {
        // Check if script already loaded
        if (document.getElementById('ai-agent-widget-script')) {
            return;
        }

        // Create and load widget script
        const script = document.createElement('script');
        script.id = 'ai-agent-widget-script';
        script.src = 'https://ai-agent-platform-three.vercel.app/widget.js';
        script.setAttribute('data-agent-url', agentUrl);
        script.setAttribute('data-style', style);
        script.setAttribute('data-color', color);
        script.setAttribute('data-position', position);
        script.async = true;

        document.body.appendChild(script);

        // Cleanup on unmount
        return () => {
            const existingScript = document.getElementById('ai-agent-widget-script');
            if (existingScript) {
                existingScript.remove();
            }
            // Remove widget container if it exists
            const widgetContainer = document.getElementById('ai-agent-widget-container');
            if (widgetContainer) {
                widgetContainer.remove();
            }
        };
    }, [agentUrl, style, color, position]);

    return null; // Widget is injected by script
}
