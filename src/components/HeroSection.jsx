import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-16 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col w-full max-w-7xl">
        <div className="w-full">
          <div 
            className="relative flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-3xl items-start justify-center px-8 py-16 sm:px-12 sm:py-20 overflow-hidden shadow-xl"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(245, 235, 224, 0.92), rgba(214, 202, 221, 0.92)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwm5cWzCFmHFhLuzVd-42Sg1jJxnUs8J0TVzujUVBpSGo7SHoke3UtGLXSZoMhCdkkUFR7YJjwmLVTKuP3SejOYNPQ2mERBObtRGImNZu0V-GEe1kccPjA0Rsc9CexDDx8lFrn5sWH57WPoTf4iYfpKVRE2B5-gE7wIVmIsEql7EeQyNM0FsvEWae2rv2kGIX_vjOZdFVcsaDww3w_aKnY-GmI_AUXHnn5qeGRG3GSXuAJRyeM52MmjhowTOAXcE06o2C3kOtScA')`
            }}
          >
            {/* Dark mode overlay */}
            <div className="absolute inset-0 bg-background-dark/30 dark:bg-background-dark/70 rounded-3xl"></div>
            
            <div className="relative z-10 flex flex-col gap-6 text-left max-w-lg">
              <h1 className="text-gray-900 dark:text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg">
                Discover Your Skincare Essentials
              </h1>
              <p className="text-gray-800 dark:text-gray-100 text-base sm:text-lg font-medium leading-relaxed drop-shadow-md">
                Explore our curated collection of premium skincare products designed for a radiant glow.
              </p>
              <button className="flex min-w-[160px] max-w-[200px] mt-2 cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary hover:bg-primary/85 dark:bg-primary dark:hover:bg-primary/85 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                <span className="truncate">Shop Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
