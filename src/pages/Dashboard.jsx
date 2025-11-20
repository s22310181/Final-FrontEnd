import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';
import PromoSection from '../components/PromoSection';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import CartPopup from '../components/CartPopup';
import { useCart } from '../context/CartContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { showNotification, setShowNotification, notificationMessage } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-background-dark/60 hover:bg-primary hover:text-white dark:hover:bg-primary text-primary dark:text-primary text-sm font-semibold transition-all duration-300"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Logout
            </button>
          </div>
        </div>

        <Header />
        <main className="flex-1 w-full pt-20">
          <HeroSection />
          <CategorySection />
          <ProductGrid />
          <PromoSection />
        </main>
        <Footer />
        <Notification
          message={notificationMessage}
          show={showNotification}
          onClose={() => setShowNotification(false)}
        />
        <CartPopup />
      </div>
    </div>
  );
};

export default Dashboard;

