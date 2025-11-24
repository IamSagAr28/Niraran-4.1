import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import shopifyClient from '../shopify/client';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
  recoverPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('shopifyCustomerAccessToken');
      const expiresAt = localStorage.getItem('shopifyCustomerAccessTokenExpiresAt');

      if (token && expiresAt && new Date(expiresAt) > new Date()) {
        try {
          const customer = await shopifyClient.getCustomer(token);
          if (customer) {
            setUser(customer);
          } else {
            // Token might be invalid
            logout();
          }
        } catch (error) {
          console.error('Failed to fetch customer:', error);
          logout();
        }
      } else {
        // Token expired or missing
        if (token) logout();
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const token = await shopifyClient.login(email, password);
      localStorage.setItem('shopifyCustomerAccessToken', token.accessToken);
      localStorage.setItem('shopifyCustomerAccessTokenExpiresAt', token.expiresAt);
      
      const customer = await shopifyClient.getCustomer(token.accessToken);
      setUser(customer);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setIsLoading(true);
    try {
      await shopifyClient.signup(email, password, firstName, lastName);
      // Note: Shopify doesn't auto-login after signup usually, user needs to login
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('shopifyCustomerAccessToken');
    localStorage.removeItem('shopifyCustomerAccessTokenExpiresAt');
    setUser(null);
  };

  const recoverPassword = async (email: string) => {
    await shopifyClient.recoverPassword(email);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      recoverPassword
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
