import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'products',
      label: 'Kelola Produk',
      icon: 'inventory_2',
      path: '/admin',
      submenu: [
        { label: 'Daftar Produk', path: '/admin', icon: 'list' },
        { label: 'Tambah Produk', path: '/admin/products/add', icon: 'add' },
      ]
    },
    {
      id: 'users',
      label: 'Kelola User',
      icon: 'people',
      path: '/admin/users',
    },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname.startsWith('/admin/products');
    }
    return location.pathname.startsWith(path);
  };

  const isSubmenuActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigate = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`w-64 bg-white dark:bg-background-dark/95 border-r border-gray-200 dark:border-white/10 h-screen fixed left-0 top-0 overflow-y-auto z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">
            admin_panel_settings
          </span>
          <div>
            <h2 className="text-xl font-bold dark:text-white" style={{ color: '#000000' }}>
              Admin Panel
            </h2>
            <p className="text-xs dark:text-gray-400" style={{ color: '#666666' }}>
              AuraSkin
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path)
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
              style={!isActive(item.path) ? { color: '#000000' } : {}}
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              <span className="font-semibold text-sm">{item.label}</span>
            </button>

            {/* Submenu */}
            {item.submenu && isActive(item.path) && (
              <div className="mt-2 ml-4 space-y-1 border-l-2 border-primary/20 pl-4">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.path}
                    onClick={() => handleNavigate(subItem.path)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                      isSubmenuActive(subItem.path)
                        ? 'bg-primary/20 text-primary font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                    style={!isSubmenuActive(subItem.path) ? { color: '#666666' } : {}}
                  >
                    <span className="material-symbols-outlined text-base">
                      {subItem.icon}
                    </span>
                    <span>{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-white/10">
        <button
          onClick={() => handleNavigate('/dashboard')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
          style={{ color: '#000000' }}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="font-semibold text-sm">Kembali ke Dashboard</span>
        </button>
      </div>
      </div>
    </>
  );
};

export default AdminSidebar;

