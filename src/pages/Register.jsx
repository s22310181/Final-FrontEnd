import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usersAPI } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Mohon lengkapi semua field');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists via API
      const existingUser = await usersAPI.getByEmail(formData.email);
      
      if (existingUser) {
        setError('Email sudah terdaftar. Silakan gunakan email lain atau login.');
        setLoading(false);
        return;
      }

      // Check if this is the first user (will be admin)
      const allUsersResponse = await usersAPI.getAll();
      const isFirstUser = allUsersResponse.data?.length === 0;

      // Create new user via API
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password, // In production, this should be hashed
        role: isFirstUser ? 'admin' : 'user', // First user becomes admin
      };

      // Send to server API
      const response = await usersAPI.create(userData);
      
      if (response.success && response.data) {
        const newUser = response.data;

        // Save to localStorage for current session
        localStorage.setItem('aura_skin_current_user', JSON.stringify(newUser));
        
        // Show success message
        alert('Registrasi berhasil! Selamat datang di AuraSkin.');
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Gagal membuat akun. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle specific API errors
      if (error.message.includes('Email already registered')) {
        setError('Email sudah terdaftar. Silakan gunakan email lain atau login.');
      } else if (error.message.includes('required')) {
        setError('Mohon lengkapi semua field dengan benar.');
      } else {
        setError(error.message || 'Terjadi kesalahan saat mendaftar. Pastikan server berjalan.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-background-dark/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 p-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-4xl dark:text-primary">
                spa
              </span>
              <h1 className="dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]" style={{ color: '#000000' }}>
                AuraSkin
              </h1>
            </div>
            <h2 className="dark:text-white text-2xl font-bold" style={{ color: '#000000' }}>
              Daftar Akun
            </h2>
            <p className="dark:text-gray-400 text-sm mt-2" style={{ color: '#000000' }}>
              Buat akun baru untuk mulai berbelanja
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Masukkan nama lengkap"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="nama@email.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Ulangi password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center rounded-xl h-12 bg-primary hover:bg-primary/85 dark:bg-primary dark:hover:bg-primary/85 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Mendaftar...
                </span>
              ) : (
                'Daftar'
              )}
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm dark:text-gray-400" style={{ color: '#000000' }}>
              Sudah punya akun?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

