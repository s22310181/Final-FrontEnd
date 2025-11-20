import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usersAPI } from '../utils/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!formData.name || !formData.email) {
        setMessage({ type: 'error', text: 'Nama dan email tidak boleh kosong' });
        setLoading(false);
        return;
      }

      // Update user via API
      const response = await usersAPI.update(user.id, {
        name: formData.name,
        email: formData.email,
      });

      if (response.success && response.data) {
        const updatedUser = response.data;
        // Update current user in localStorage
        updatedUser.loginTime = user.loginTime;
        localStorage.setItem('aura_skin_current_user', JSON.stringify(updatedUser));
        
        setMessage({ type: 'success', text: 'Profile berhasil diperbarui!' });
        setEditMode(false);
        
        // Reload page to update user context
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Gagal memperbarui profile' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat memperbarui profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        {/* User Info Bar */}
        <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-2 bg-primary/10 dark:bg-primary/20 border-b border-primary/20">
          <div className="layout-content-container flex items-center justify-between w-full max-w-7xl">
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-primary text-base">
                person
              </span>
              <span className="dark:text-gray-300" style={{ color: '#000000' }}>
                Selamat datang, <strong>{user?.name || user?.email}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-background-dark/60 hover:bg-primary hover:text-white dark:hover:bg-primary text-primary dark:text-primary text-sm font-semibold transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base">home</span>
                Dashboard
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-background-dark/60 hover:bg-primary hover:text-white dark:hover:bg-primary text-primary dark:text-primary text-sm font-semibold transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                Admin
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-background-dark/60 hover:bg-primary hover:text-white dark:hover:bg-primary text-primary dark:text-primary text-sm font-semibold transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Logout
              </button>
            </div>
          </div>
        </div>

        <Header />
        <main className="flex-1 w-full pt-20 pb-16">
          <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-8">
            <div className="w-full max-w-4xl">
              {/* Profile Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold dark:text-white mb-2" style={{ color: '#000000' }}>
                  Profile Saya
                </h1>
                <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
                  Kelola informasi akun Anda
                </p>
              </div>

              {/* Message */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-xl ${
                  message.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <p className={`text-sm ${
                    message.type === 'success' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {message.text}
                  </p>
                </div>
              )}

              {/* Profile Card */}
              <div className="bg-white dark:bg-background-dark/60 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 overflow-hidden">
                {/* Profile Header Section */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 px-6 py-8 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-4xl">
                        person
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold dark:text-white mb-1" style={{ color: '#000000' }}>
                        {user?.name || 'User'}
                      </h2>
                      <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
                        {user?.email}
                      </p>
                      {user?.role && (
                        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 dark:bg-primary/30 text-primary">
                          {user.role === 'admin' ? 'Administrator' : 'User'}
                        </span>
                      )}
                    </div>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/85 text-white text-sm font-semibold transition-all"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  {editMode ? (
                    <form onSubmit={handleUpdate} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          style={{ color: '#000000' }}
                          required
                          disabled={loading}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          style={{ color: '#000000' }}
                          required
                          disabled={loading}
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setEditMode(false);
                            setFormData({
                              name: user?.name || '',
                              email: user?.email || '',
                            });
                            setMessage({ type: '', text: '' });
                          }}
                          className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 font-semibold transition-all"
                          disabled={loading}
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 rounded-xl bg-primary hover:bg-primary/85 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="material-symbols-outlined animate-spin">refresh</span>
                              Menyimpan...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <span className="material-symbols-outlined">save</span>
                              Simpan Perubahan
                            </span>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* Account Information */}
                      <div>
                        <h3 className="text-lg font-bold dark:text-white mb-4" style={{ color: '#000000' }}>
                          Informasi Akun
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                                person
                              </span>
                              <span className="text-sm font-medium dark:text-gray-300" style={{ color: '#000000' }}>
                                Nama Lengkap
                              </span>
                            </div>
                            <span className="text-sm dark:text-white" style={{ color: '#666666' }}>
                              {user?.name || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                                email
                              </span>
                              <span className="text-sm font-medium dark:text-gray-300" style={{ color: '#000000' }}>
                                Email
                              </span>
                            </div>
                            <span className="text-sm dark:text-white" style={{ color: '#666666' }}>
                              {user?.email || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                                badge
                              </span>
                              <span className="text-sm font-medium dark:text-gray-300" style={{ color: '#000000' }}>
                                Role
                              </span>
                            </div>
                            <span className="text-sm dark:text-white capitalize" style={{ color: '#666666' }}>
                              {user?.role || 'user'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                                calendar_today
                              </span>
                              <span className="text-sm font-medium dark:text-gray-300" style={{ color: '#000000' }}>
                                Bergabung
                              </span>
                            </div>
                            <span className="text-sm dark:text-white" style={{ color: '#666666' }}>
                              {formatDate(user?.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Account Actions */}
                      <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                        <h3 className="text-lg font-bold dark:text-white mb-4" style={{ color: '#000000' }}>
                          Aksi Akun
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-left"
                          >
                            <span className="material-symbols-outlined text-primary">home</span>
                            <div>
                              <p className="text-sm font-semibold dark:text-white" style={{ color: '#000000' }}>
                                Kembali ke Dashboard
                              </p>
                              <p className="text-xs dark:text-gray-400" style={{ color: '#666666' }}>
                                Lihat produk dan berbelanja
                              </p>
                            </div>
                          </button>
                          <button
                            onClick={() => navigate('/admin')}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-left"
                          >
                            <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                            <div>
                              <p className="text-sm font-semibold dark:text-white" style={{ color: '#000000' }}>
                                Admin Dashboard
                              </p>
                              <p className="text-xs dark:text-gray-400" style={{ color: '#666666' }}>
                                Kelola produk dan user
                              </p>
                            </div>
                          </button>
                        </div>
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-semibold transition-all"
                        >
                          <span className="material-symbols-outlined">logout</span>
                          <span>Logout dari Akun</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;

