(function () {
    // Configuration
    const currentScript = document.currentScript;
    const config = {
        agentUrl: currentScript.getAttribute('data-agent-url'),
        style: currentScript.getAttribute('data-style') || 'bubble', // bubble, sidebar, inline
        color: currentScript.getAttribute('data-color') || '#8b5cf6', // Default purple
        position: currentScript.getAttribute('data-position') || 'bottom-right', // bottom-right, bottom-left
        icon: currentScript.getAttribute('data-icon') || '💬'
    };

    if (!config.agentUrl) {
        console.error('AI Agent: data-agent-url is required');
        return;
    }

    // --- Inline Style ---
    if (config.style === 'inline') {
        const iframe = document.createElement('iframe');
        iframe.src = config.agentUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.minHeight = '500px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '12px';
        iframe.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';

        // Find container to inject into (user should place script inside container or specific div)
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.appendChild(iframe);
        currentScript.parentNode.insertBefore(container, currentScript);
        return;
    }

    // --- Popup / Widget Styles ---
    const container = document.createElement('div');
    container.id = 'ai-agent-widget-' + Math.random().toString(36).substr(2, 9);
    container.style.position = 'fixed';
    container.style.zIndex = '99999';
    container.style.fontFamily = 'system-ui, -apple-system, sans-serif';

    // Position
    if (config.position === 'bottom-right') {
        container.style.bottom = '20px';
        container.style.right = '20px';
    } else if (config.position === 'bottom-left') {
        container.style.bottom = '20px';
        container.style.left = '20px';
    }

    // Create Toggle Button (Bubble)
    const button = document.createElement('button');
    button.innerHTML = config.icon;
    button.style.width = '60px';
    button.style.height = '60px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = config.color;
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.fontSize = '28px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    button.style.transition = 'transform 0.2s';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';

    button.onmouseover = () => button.style.transform = 'scale(1.1)';
    button.onmouseout = () => button.style.transform = 'scale(1)';

    // Create Iframe Container (Hidden by default)
    const iframeContainer = document.createElement('div');
    iframeContainer.style.position = 'absolute';
    iframeContainer.style.bottom = '80px';
    iframeContainer.style.width = '380px';
    iframeContainer.style.height = '600px';
    iframeContainer.style.maxHeight = '80vh';
    iframeContainer.style.maxWidth = '90vw';
    iframeContainer.style.backgroundColor = 'white';
    iframeContainer.style.borderRadius = '16px';
    iframeContainer.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    iframeContainer.style.overflow = 'hidden';
    iframeContainer.style.opacity = '0';
    iframeContainer.style.pointerEvents = 'none';
    iframeContainer.style.transform = 'translateY(20px)';
    iframeContainer.style.transition = 'all 0.3s ease';

    // Sidebar specific adjustments
    if (config.style === 'sidebar') {
        iframeContainer.style.position = 'fixed';
        iframeContainer.style.top = '0';
        iframeContainer.style.bottom = '0';
        iframeContainer.style.height = '100vh';
        iframeContainer.style.maxHeight = '100vh';
        iframeContainer.style.width = '400px';
        iframeContainer.style.borderRadius = '0';
        iframeContainer.style.transform = config.position.includes('right') ? 'translateX(100%)' : 'translateX(-100%)';

        if (config.position === 'bottom-right') {
            iframeContainer.style.right = '0';
            iframeContainer.style.left = 'auto'; // Reset
        } else {
            iframeContainer.style.left = '0';
            iframeContainer.style.right = 'auto'; // Reset
        }
    } else {
        // Standard Bubble Popup alignment
        if (config.position === 'bottom-right') {
            iframeContainer.style.right = '0';
        } else {
            iframeContainer.style.left = '0';
        }
    }

    // Iframe Header (Close Button for Sidebar usually, but good for all)
    const header = document.createElement('div');
    // We can hide this header if the iframe itself has a header, 
    // but for external control let's adding a close button might be safer.
    // For now, simpler is better: rely on the toggle button to close.

    // Iframe
    const iframe = document.createElement('iframe');
    iframe.src = config.agentUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    iframeContainer.appendChild(iframe);
    container.appendChild(iframeContainer);
    container.appendChild(button);
    document.body.appendChild(container);

    // Toggle Logic
    let isOpen = false;

    button.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
            iframeContainer.style.opacity = '1';
            iframeContainer.style.pointerEvents = 'all';
            iframeContainer.style.transform = 'translateY(0) translateX(0)'; // Reset transforms
            button.innerHTML = '✕';
        } else {
            iframeContainer.style.opacity = '0';
            iframeContainer.style.pointerEvents = 'none';
            if (config.style === 'sidebar') {
                iframeContainer.style.transform = config.position.includes('right') ? 'translateX(100%)' : 'translateX(-100%)';
            } else {
                iframeContainer.style.transform = 'translateY(20px)';
            }
            button.innerHTML = config.icon;
        }
    };

})();
