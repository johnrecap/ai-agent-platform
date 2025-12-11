'use client';

/**
 * Real-Time WebSocket Manager
 * AI Agent Platform - Premium 2026 Design
 * 
 * Manages WebSocket connections with auto-reconnect,
 * connection status, and event handling
 */

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

// Connection States
const ConnectionState = {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    RECONNECTING: 'reconnecting',
};

// WebSocket Context
const WebSocketContext = createContext(null);

export function WebSocketProvider({ children, url }) {
    const [connectionState, setConnectionState] = useState(ConnectionState.DISCONNECTED);
    const [lastMessage, setLastMessage] = useState(null);
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const reconnectAttemptsRef = useRef(0);
    const listenersRef = useRef(new Map());

    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_DELAY = 3000;

    const connect = useCallback(() => {
        if (!url) return;

        setConnectionState(ConnectionState.CONNECTING);

        try {
            const ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onopen = () => {
                setConnectionState(ConnectionState.CONNECTED);
                reconnectAttemptsRef.current = 0;
                console.log('[WS] Connected');
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setLastMessage(data);

                    // Notify listeners
                    if (data.type && listenersRef.current.has(data.type)) {
                        listenersRef.current.get(data.type).forEach(cb => cb(data));
                    }
                } catch (e) {
                    console.error('[WS] Parse error:', e);
                }
            };

            ws.onclose = () => {
                setConnectionState(ConnectionState.DISCONNECTED);
                console.log('[WS] Disconnected');
                attemptReconnect();
            };

            ws.onerror = (error) => {
                console.error('[WS] Error:', error);
            };
        } catch (error) {
            console.error('[WS] Connection failed:', error);
            attemptReconnect();
        }
    }, [url]);

    const attemptReconnect = useCallback(() => {
        if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
            console.log('[WS] Max reconnect attempts reached');
            return;
        }

        setConnectionState(ConnectionState.RECONNECTING);
        reconnectAttemptsRef.current++;

        reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`[WS] Reconnecting... (${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`);
            connect();
        }, RECONNECT_DELAY);
    }, [connect]);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setConnectionState(ConnectionState.DISCONNECTED);
    }, []);

    const send = useCallback((data) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(data));
            return true;
        }
        return false;
    }, []);

    const subscribe = useCallback((eventType, callback) => {
        if (!listenersRef.current.has(eventType)) {
            listenersRef.current.set(eventType, new Set());
        }
        listenersRef.current.get(eventType).add(callback);

        // Return unsubscribe function
        return () => {
            listenersRef.current.get(eventType)?.delete(callback);
        };
    }, []);

    useEffect(() => {
        if (url) connect();
        return () => disconnect();
    }, [url, connect, disconnect]);

    const value = {
        connectionState,
        isConnected: connectionState === ConnectionState.CONNECTED,
        lastMessage,
        send,
        subscribe,
        reconnect: connect,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}

// Hook to use WebSocket
export function useWebSocket() {
    const context = useContext(WebSocketContext);
    if (!context) {
        // Return mock if not in provider
        return {
            connectionState: ConnectionState.DISCONNECTED,
            isConnected: false,
            lastMessage: null,
            send: () => false,
            subscribe: () => () => { },
            reconnect: () => { },
        };
    }
    return context;
}

// Connection Status Indicator Component
export function ConnectionStatus({ className = '' }) {
    const { connectionState, isConnected, reconnect } = useWebSocket();

    const statusConfig = {
        [ConnectionState.CONNECTED]: { color: 'bg-green-500', text: 'Connected', pulse: true },
        [ConnectionState.CONNECTING]: { color: 'bg-yellow-500', text: 'Connecting...', pulse: true },
        [ConnectionState.RECONNECTING]: { color: 'bg-yellow-500', text: 'Reconnecting...', pulse: true },
        [ConnectionState.DISCONNECTED]: { color: 'bg-red-500', text: 'Offline', pulse: false },
    };

    const config = statusConfig[connectionState] || statusConfig[ConnectionState.DISCONNECTED];

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className={`w-2 h-2 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''}`} />
            <span className="text-xs text-[var(--text-secondary)]">{config.text}</span>
            {connectionState === ConnectionState.DISCONNECTED && (
                <button
                    onClick={reconnect}
                    className="text-xs text-purple-400 hover:text-purple-300 ml-2"
                >
                    Retry
                </button>
            )}
        </div>
    );
}

// Typing Indicator Component
export function TypingIndicator({ isTyping, name }) {
    if (!isTyping) return null;

    return (
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            {name && <span>{name} is typing...</span>}
        </div>
    );
}

export { ConnectionState };
