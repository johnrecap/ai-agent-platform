import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import api from '../lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsDemoUser: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session on load
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('nexus_user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        try {
          // Verify token is still valid
          const response = await api.getCurrentUser();
          const userData = response.user || JSON.parse(storedUser);
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role === 'admin' ? 'admin' : 'user',
            avatar: userData.avatar
          });
        } catch (error) {
          // Token invalid, clear storage
          api.logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await api.login(email, password);
      const userData = data.user;

      const appUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role === 'admin' ? 'admin' : 'user',
        avatar: userData.avatar
      };

      setUser(appUser);
    } finally {
      setIsLoading(false);
    }
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

  const logout = () => {
    api.logout();
    setUser(null);
    window.location.href = '#/login';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginAsDemoUser, logout }}>
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