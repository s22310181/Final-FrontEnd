import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductList from './ProductList';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="bg-white dark:bg-background-dark/95 border-b border-gray-200 dark:border-white/10 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">
                admin_panel_settings
              </span>
              <div>
                <h1 className="text-2xl font-bold dark:text-white" style={{ color: '#000000' }}>
                  Admin Dashboard
                </h1>
                <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
                  Kelola produk AuraSkin
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-primary text-base">
                  person
                </span>
                <span className="dark:text-gray-300" style={{ color: '#000000' }}>
                  {user?.name || user?.email}
                </span>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-all"
              >
                <span className="material-symbols-outlined text-base">home</span>
                Kembali ke Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <ProductList />
      </div>
    </div>
  );
};

export default AdminDashboard;

