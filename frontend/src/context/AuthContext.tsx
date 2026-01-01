import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, type AuthUser } from '../data/authService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isOwner: (id: string) => boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on mount
    const activeUser = getCurrentUser();
    setUser(activeUser);
    setLoading(false);
  }, []);

  const isOwner = (profileId: string) => {
    return user?.id === profileId;
  };

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('umu_user'); // Or however you handle persistence
  };

  if (loading) return null; // Prevents flickering during auth check

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isOwner, login, logout }}>
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