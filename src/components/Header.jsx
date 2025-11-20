import React from 'react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getCartCount, setShowCartPopup } = useCart();
  const cartCount = getCartCount();
  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-4 bg-white dark:bg-background-dark/95 backdrop-blur-md fixed top-0 left-0 right-0 w-full z-50 border-b border-gray-100 dark:border-white/10 shadow-sm">
      <div className="layout-content-container flex flex-col w-full max-w-7xl">
        <header className="flex items-center justify-between whitespace-nowrap">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="material-symbols-outlined text-primary text-3xl dark:text-primary transition-transform duration-300 group-hover:scale-110">
                spa
              </span>
              <h2 className="dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] transition-colors duration-200 group-hover:text-primary dark:group-hover:text-primary" style={{ color: '#000000' }}>
                AuraSkin
              </h2>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center gap-8">
            <nav className="flex items-center gap-9">
              <a 
                className="dark:text-gray-200 text-sm font-medium leading-normal transition-all duration-300 hover:text-primary dark:hover:text-primary hover:font-semibold relative group" 
                href="#home"
                style={{ color: '#1a1a1a' }}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                className="dark:text-gray-200 text-sm font-medium leading-normal transition-all duration-300 hover:text-primary dark:hover:text-primary hover:font-semibold relative group" 
                href="#products"
                style={{ color: '#1a1a1a' }}
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                className="dark:text-gray-200 text-sm font-medium leading-normal transition-all duration-300 hover:text-primary dark:hover:text-primary hover:font-semibold relative group" 
                href="#categories"
                style={{ color: '#1a1a1a' }}
              >
                Categories
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                className="dark:text-gray-200 text-sm font-medium leading-normal transition-all duration-300 hover:text-primary dark:hover:text-primary hover:font-semibold relative group" 
                href="#products"
                style={{ color: '#1a1a1a' }}
              >
                Best Seller
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <label className="flex flex-col min-w-40 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-full h-10 border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 focus-within:border-primary dark:focus-within:border-primary focus-within:shadow-md">
                <div className="text-gray-500 dark:text-gray-400 flex border-none items-center justify-center pl-4 rounded-l-full">
                  <span className="material-symbols-outlined text-base">search</span>
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-gray-900 dark:text-white bg-transparent focus:outline-0 border-none h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 rounded-l-none text-sm font-normal leading-normal" 
                  placeholder="Search" 
                  defaultValue=""
                />
              </div>
            </label>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => setShowCartPopup(true)}
              className="flex relative cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-primary hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-gray-900 text-black dark:text-white text-xs font-bold shadow-md border-2 border-white dark:border-gray-900">
                  {cartCount}
                </div>
              )}
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
