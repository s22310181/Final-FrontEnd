import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1 w-full">
          <HeroSection />
          <CategorySection />
          <ProductGrid />
          <PromoSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
