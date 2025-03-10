'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, userApi } from '@/lib/api-service';
import websocketService from '@/lib/websocket-service';

interface User {
  id: string | number;
  username: string;
  name: string;
  email: string;
  preferredLanguage: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    name: string;
    email: string;
    password: string;
    preferredLanguage: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          // Fetch current user data
          const userData = await userApi.getCurrentUser();
          setUser(userData as User);
          
          // Connect to WebSocket
          try {
            await websocketService.connect();
          } catch (wsError) {
            console.warn('WebSocket connection failed:', wsError);
            // Continue even if WebSocket fails - chat will work with polling
          }
        } catch (error) {
          console.error('Authentication error:', error);
          // Clear invalid tokens
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Cleanup WebSocket connection on unmount
    return () => {
      websocketService.disconnect();
    };
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Call login API
      const authResponse = await authApi.login({ username, password });
      
      // Store tokens
      localStorage.setItem('authToken', authResponse.token);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      
      try {
        // Fetch user data
        const userData = await userApi.getCurrentUser();
        setUser(userData as User);
        
        // Connect to WebSocket
        try {
          await websocketService.connect();
        } catch (wsError) {
          console.warn('WebSocket connection failed:', wsError);
          // Continue even if WebSocket fails
        }
      } catch (userError) {
        console.warn('Could not fetch user data, but login was successful:', userError);
        
        // Create a basic user object from the username
        setUser({
          id: username, // Use username as ID as fallback
          username: username,
          name: username, // Use username as name as fallback
          email: '',
          preferredLanguage: 'English',
        });
      }
      
      return; // Login successful
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: {
    username: string;
    name: string;
    email: string;
    password: string;
    preferredLanguage: string;
  }) => {
    setIsLoading(true);
    
    try {
      // Call register API
      const authResponse = await authApi.register(userData);
      
      // Store tokens
      localStorage.setItem('authToken', authResponse.token);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      
      // Set user data directly from registration data
      setUser({
        id: userData.username, // Use username as ID temporarily
        username: userData.username,
        name: userData.name,
        email: userData.email,
        preferredLanguage: userData.preferredLanguage,
      });
      
      try {
        // Try to fetch complete user data
        const completeUserData = await userApi.getCurrentUser();
        setUser(completeUserData as User);
      } catch (userError) {
        console.warn('Could not fetch complete user data after registration:', userError);
        // Continue with the basic user data we already set
      }
      
      // Connect to WebSocket
      try {
        await websocketService.connect();
      } catch (wsError) {
        console.warn('WebSocket connection failed:', wsError);
        // Continue even if WebSocket fails
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Disconnect WebSocket
    websocketService.disconnect();
    
    // Clear user data and tokens
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 