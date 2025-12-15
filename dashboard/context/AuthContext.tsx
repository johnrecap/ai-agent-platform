import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { parseJwt } from '../lib/utils';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  handleGoogleLogin: (credentialResponse: any) => void;
  loginAsDemoUser: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for active session on load
    const initializeAuth = async () => {
        // 1. Check Local Mock Storage first (for demo purposes)
        const storedUser = localStorage.getItem('nexus_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoading(false);
            return;
        }

        // 2. Check Supabase Session
        if (isSupabaseConfigured()) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                // Map Supabase user to App User
                const appUser: User = {
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.user_metadata.full_name || 'User',
                    avatar: session.user.user_metadata.avatar_url,
                    role: (session.user.user_metadata.role as UserRole) || 'user'
                };
                setUser(appUser);
            }
        }
        setIsLoading(false);
    };

    initializeAuth();

    // Listen for auth changes if using Supabase
    if (isSupabaseConfigured()) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.user_metadata.full_name || 'User',
                    avatar: session.user.user_metadata.avatar_url,
                    role: (session.user.user_metadata.role as UserRole) || 'user'
                });
            } else {
                // Only clear if we aren't using the demo user
                if (!localStorage.getItem('nexus_user')) {
                    setUser(null);
                }
            }
        });
        return () => subscription.unsubscribe();
    }
  }, []);

  const handleGoogleLogin = async (credentialResponse: any) => {
    setIsLoading(true);
    
    // Legacy Mock Google Login (Client Side Only)
    if (!isSupabaseConfigured()) {
        const decoded = parseJwt(credentialResponse.credential);
        if (decoded) {
            const role: UserRole = decoded.email.includes('admin') ? 'admin' : 'user';
            const newUser: User = {
                id: decoded.sub,
                name: decoded.name,
                email: decoded.email,
                role: role,
                avatar: decoded.picture
            };
            setUser(newUser);
            localStorage.setItem('nexus_user', JSON.stringify(newUser));
        }
        setIsLoading(false);
        return;
    }

    // Real Supabase Google Login
    const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credentialResponse.credential,
    });

    if (error) {
        console.error("Supabase Login Error:", error);
        alert("Authentication failed");
    }
    setIsLoading(false);
  };

  const loginAsDemoUser = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
        const demoUser: User = {
            id: 'demo-user-' + Math.random().toString(36).substr(2, 9),
            name: role === 'admin' ? 'Demo Admin' : 'Demo User',
            email: role === 'admin' ? 'admin@demo.com' : 'user@demo.com',
            role: role,
            avatar: `https://picsum.photos/seed/${role}/200`
        };
        setUser(demoUser);
        localStorage.setItem('nexus_user', JSON.stringify(demoUser));
        setIsLoading(false);
    }, 800);
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('nexus_user');
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, handleGoogleLogin, loginAsDemoUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};