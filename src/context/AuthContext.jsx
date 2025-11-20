import React, { createContext, useContext, useState, useEffect } from 'react';
import * as db from '../database/database';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const currentUser = await db.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error loading current user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  const login = async (email, password) => {
    // Simple login validation (in real app, this would be an API call)
    // For demo purposes, accept any email/password
    if (email && password) {
      try {
        // Check if user exists in database
        let userData = await db.getUserByEmail(email);
        
        if (!userData) {
          // Create new user if doesn't exist
          userData = {
            email: email,
            name: email.split('@')[0], // Extract name from email
            role: 'user',
            createdAt: new Date().toISOString(),
          };
          await db.addUser(userData);
        }

        // Update login time
        userData.loginTime = new Date().toISOString();
        await db.setCurrentUser(userData);
        setUser(userData);
        
        return true;
      } catch (error) {
        console.error('Error during login:', error);
        return false;
      }
    }
    return false;
  };

  const logout = async () => {
    try {
      await db.clearCurrentUser();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

