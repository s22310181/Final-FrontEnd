import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // First check if user is authenticated
  if (!isAuthenticated || loading) {
    return <ProtectedRoute>{null}</ProtectedRoute>;
  }

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="bg-white dark:bg-background-dark/60 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 p-8 max-w-md mx-4 text-center">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">
            block
          </span>
          <h2 className="text-2xl font-bold dark:text-white mb-2" style={{ color: '#000000' }}>
            Akses Ditolak
          </h2>
          <p className="text-sm dark:text-gray-400 mb-6" style={{ color: '#666666' }}>
            Hanya admin yang dapat mengakses halaman ini.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;

