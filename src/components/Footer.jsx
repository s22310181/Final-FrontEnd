import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 dark:bg-background-dark/90 border-t border-gray-200/50 dark:border-white/10 mt-20">
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-14">
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-primary text-2xl">
                spa
              </span>
              <h3 className="text-xl font-bold dark:text-white" style={{ color: '#374151' }}>
                AuraSkin
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Premium skincare for a radiant, healthy glow. Cruelty-free and consciously formulated.
            </p>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold dark:text-white text-base" style={{ color: '#374151' }}>
              Shop
            </h4>
            <nav className="flex flex-col gap-3">
              <a 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium" 
                href="#"
              >
                Products
              </a>
              <a 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium" 
                href="#"
              >
                Best Sellers
              </a>
              <a 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium" 
                href="#"
              >
                New Arrivals
              </a>
            </nav>
          </div>

          {/* About Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold dark:text-white text-base" style={{ color: '#374151' }}>
              About
            </h4>
            <nav className="flex flex-col gap-3">
              <a 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium" 
                href="#"
              >
                Our Story
              </a>
              <a 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium" 
                href="#"
              >
                Contact Us
              </a>
              <a 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 font-medium" 
                href="#"
              >
                FAQs
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold dark:text-white text-base" style={{ color: '#374151' }}>
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:scale-110" 
                href="#"
                aria-label="Facebook"
              >
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                </svg>
              </a>
              <a 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:scale-110" 
                href="#"
                aria-label="Twitter"
              >
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:scale-110" 
                href="#"
                aria-label="Instagram"
              >
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 6.363a4.731 4.731 0 100 9.462 4.731 4.731 0 000-9.462zm-5.877 1.002a1.14 1.14 0 100 2.28 1.14 1.14 0 000-2.28z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200/50 dark:border-white/10">
        <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-6">
          <div className="w-full max-w-7xl flex justify-center">
            <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
              © 2024 AuraSkin. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
