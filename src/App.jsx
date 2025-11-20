import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';
import Notification from './components/Notification';
import CartPopup from './components/CartPopup';
import './App.css';

const AppContent = () => {
  const { showNotification, setShowNotification, notificationMessage } = useCart();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
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

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
