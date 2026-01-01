import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, type User } from '../data/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  // This helper enforces your specific rule globally
  isOwner: (id: string) => boolean; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);
  }, []);

  const isOwner = (profileId: string) => {
    // Rule implementation: User can only edit if their ID matches the target profile ID
    return user?.id === profileId;
  };

  const logout = () => {
    // Clear session and state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isOwner, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};