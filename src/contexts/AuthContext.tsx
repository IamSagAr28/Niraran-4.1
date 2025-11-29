import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkSession, loginUser, signupUser, logoutUser, updateProfile as updateProfileApi, googleLoginUrl } from '../utils/authApi';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  shopifyCustomerId?: string;
}

interface Subscription {
  status: string;
  current_period_end: string;
}

interface AuthContextType {
  user: User | null;
  subscription: Subscription | null;
  isAuthenticated: boolean;
  isMember: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  googleLoginUrl: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await checkSession();
        if (session.authenticated && session.user) {
          setUser(session.user);
          setSubscription(session.subscription || null);
        } else {
          setUser(null);
          setSubscription(null);
        }
      } catch (error) {
        console.error('Failed to check session:', error);
        setUser(null);
        setSubscription(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      setSubscription(data.subscription || null);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setIsLoading(true);
    try {
      const data = await signupUser(email, password, firstName, lastName);
      setUser(data.user);
      setSubscription(null); // New users don't have subs
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setSubscription(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const data = await updateProfileApi(profileData);
      setUser(data.user);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      subscription,
      isAuthenticated: !!user,
      isMember: !!subscription && ['active', 'trialing'].includes(subscription.status),
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
      googleLoginUrl
    }}>
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
