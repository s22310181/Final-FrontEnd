import React, { createContext, useContext, useState, useEffect } from 'react';
import { usersAPI } from '../utils/api';

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

  // Check if user is logged in on mount (from localStorage)
  useEffect(() => {
    const loadCurrentUser = () => {
      try {
        const storedUser = localStorage.getItem('aura_skin_current_user');
        if (storedUser) {
          const currentUser = JSON.parse(storedUser);
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
    // Validate input
    if (!email || !password) {
      return { success: false, message: 'Email dan password tidak boleh kosong' };
    }

    try {
      // Check if user exists via API
      const userData = await usersAPI.getByEmail(email);
      
      if (!userData) {
        // User tidak ditemukan di database
        return { success: false, message: 'Email tidak terdaftar. Silakan daftar terlebih dahulu.' };
      }

      // Validate password
      if (userData.password !== password) {
        return { success: false, message: 'Password salah. Silakan coba lagi.' };
      }

      // Update login time and save to localStorage
      userData.loginTime = new Date().toISOString();
      localStorage.setItem('aura_skin_current_user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, message: 'Login berhasil' };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Terjadi kesalahan saat login. Pastikan server berjalan.' };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('aura_skin_current_user');
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

