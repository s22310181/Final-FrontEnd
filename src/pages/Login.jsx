import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email dan password tidak boleh kosong');
      }
    }, 500);
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
              Login
            </h2>
            <p className="dark:text-gray-400 text-sm mt-2" style={{ color: '#000000' }}>
              Masuk ke akun Anda
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Masukkan password"
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
                  Memproses...
                </span>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs dark:text-blue-400 text-center" style={{ color: '#000000' }}>
              <strong>Demo:</strong> Masukkan email dan password apa saja untuk login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

