(function () {
    // Configuration
    const currentScript = document.currentScript;
    const config = {
        agentUrl: currentScript.getAttribute('data-agent-url'),
        style: currentScript.getAttribute('data-style') || 'bubble', // bubble, sidebar, inline
        color: currentScript.getAttribute('data-color') || '#8b5cf6', // Primary color
        position: currentScript.getAttribute('data-position') || 'bottom-right', // bottom-right, bottom-left
        icon: currentScript.getAttribute('data-icon')
    };

    if (!config.agentUrl) {
        console.error('AI Agent: data-agent-url is required');
        return;
    }

    // Append mode=widget to the URL to tell the page to hide headers/footers
    const widgetUrl = new URL(config.agentUrl);
    widgetUrl.searchParams.set('mode', 'widget');

    // Create a unique ID for this widget instance
    const widgetId = 'ai-agent-widget-' + Math.random().toString(36).substr(2, 9);

    // Inject CSS styles for animations and premium look
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ai-agent-fade-in-up {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ai-agent-pop-in {
            0% { transform: scale(0); }
            80% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        @keyframes ai-agent-pulse {
            0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }
        #${widgetId}-container {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            z-index: 2147483647; /* Max z-index */
        }
        #${widgetId}-iframe-container {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            background: rgba(15, 15, 26, 0.95); /* Dark premium background */
        }
    `;
    document.head.appendChild(style);

    // --- Inline Style ---
    if (config.style === 'inline') {
        const iframe = document.createElement('iframe');
        iframe.src = widgetUrl.toString();
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.minHeight = '600px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '16px';
        iframe.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)';

        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.appendChild(iframe);
        currentScript.parentNode.insertBefore(container, currentScript);
        return;
    }

    // --- Popup / Widget Styles ---
    const container = document.createElement('div');
    container.id = `${widgetId}-container`;
    container.style.position = 'fixed';

    // Position
    const offset = '24px';
    if (config.position === 'bottom-right') {
        container.style.bottom = offset;
        container.style.right = offset;
    } else if (config.position === 'bottom-left') {
        container.style.bottom = offset;
        container.style.left = offset;
    }

    // Create Toggle Button (Bubble)
    const button = document.createElement('button');
    // Default Icon (Chat Bubble)
    const chatIconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;
    // Close Icon (X)
    const closeIconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    `;

    button.innerHTML = config.icon || chatIconSvg;
    button.style.width = '64px';
    button.style.height = '64px';
    button.style.borderRadius = '50%';
    button.style.background = `linear-gradient(135deg, ${config.color}, #ec4899)`; // Purple to Pink gradient
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 10px 25px -5px rgba(139, 92, 246, 0.4), 0 8px 10px -6px rgba(139, 92, 246, 0.1)';
    button.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Bouncy transition
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.animation = 'ai-agent-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

    // Add pulse effect implicitly via animation defined in style tag if needed, 
    // but for now let's just keep the pop-in.

    button.onmouseover = () => {
        button.style.transform = 'scale(1.1) rotate(-5deg)';
        button.style.boxShadow = '0 20px 35px -5px rgba(139, 92, 246, 0.5)';
    };
    button.onmouseout = () => {
        button.style.transform = 'scale(1) rotate(0)';
        button.style.boxShadow = '0 10px 25px -5px rgba(139, 92, 246, 0.4)';
    };

    // Create Iframe Container
    const iframeContainer = document.createElement('div');
    iframeContainer.id = `${widgetId}-iframe-container`;
    iframeContainer.style.position = 'absolute';
    iframeContainer.style.bottom = '80px';
    iframeContainer.style.width = '400px';
    iframeContainer.style.height = '700px';
    iframeContainer.style.maxHeight = 'min(calc(100vh - 120px), 700px)';
    iframeContainer.style.maxWidth = 'calc(100vw - 48px)';

    // Premium Styles
    iframeContainer.style.borderRadius = '24px';
    iframeContainer.style.overflow = 'hidden';
    iframeContainer.style.opacity = '0';
    iframeContainer.style.visibility = 'hidden'; // Better than pointer-events for screen readers
    iframeContainer.style.transform = 'translateY(20px) scale(0.95)';
    iframeContainer.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    iframeContainer.style.transformOrigin = 'bottom right';

    if (config.position === 'bottom-left') {
        iframeContainer.style.transformOrigin = 'bottom left';
    }

    // Sidebar overrides
    if (config.style === 'sidebar') {
        iframeContainer.style.position = 'fixed';
        iframeContainer.style.top = '0';
        iframeContainer.style.bottom = '0';
        iframeContainer.style.height = '100vh';
        iframeContainer.style.maxHeight = '100vh';
        iframeContainer.style.width = '450px';
        iframeContainer.style.borderRadius = '0';
        iframeContainer.style.bottom = 'auto'; // clear bottom

        if (config.position.includes('right')) {
            iframeContainer.style.right = '0';
            iframeContainer.style.left = 'auto';
            iframeContainer.style.transform = 'translateX(100%)';
        } else {
            iframeContainer.style.left = '0';
            iframeContainer.style.right = 'auto';
            iframeContainer.style.transform = 'translateX(-100%)';
        }
    } else {
        // Standard Bubble alignment
        if (config.position === 'bottom-right') {
            iframeContainer.style.right = '0';
        } else {
            iframeContainer.style.left = '0';
        }
    }

    // Iframe
    const iframe = document.createElement('iframe');
    iframe.src = widgetUrl.toString();
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.opacity = '0'; // Fade in iframe content slightly later
    iframe.style.transition = 'opacity 0.3s ease 0.1s';

    // Allow transparency for rounded corners
    iframe.setAttribute('allowtransparency', 'true');

    iframeContainer.appendChild(iframe);
    container.appendChild(iframeContainer);
    container.appendChild(button);
    document.body.appendChild(container);

    // Toggle Logic
    let isOpen = false;

    button.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
            // Open
            iframeContainer.style.visibility = 'visible';
            iframeContainer.style.opacity = '1';

            if (config.style === 'sidebar') {
                iframeContainer.style.transform = 'translateX(0)';
            } else {
                iframeContainer.style.transform = 'translateY(0) scale(1)';
            }

            button.innerHTML = closeIconSvg;
            iframe.style.opacity = '1';

        } else {
            // Close
            iframeContainer.style.opacity = '0';

            if (config.style === 'sidebar') {
                if (config.position.includes('right')) {
                    iframeContainer.style.transform = 'translateX(100%)';
                } else {
                    iframeContainer.style.transform = 'translateX(-100%)';
                }
            } else {
                iframeContainer.style.transform = 'translateY(20px) scale(0.95)';
            }

            // Delay visibility hidden to allow transition to finish
            setTimeout(() => {
                if (!isOpen) iframeContainer.style.visibility = 'hidden';
            }, 400);

            button.innerHTML = config.icon || chatIconSvg;
        }
    };

})();
