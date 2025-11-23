import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-16 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col w-full max-w-7xl">
        <div className="w-full">
          <div 
            className="relative flex min-h-[600px] sm:min-h-[650px] md:min-h-[700px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-3xl items-start justify-center px-8 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 overflow-hidden shadow-2xl group"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwm5cWzCFmHFhLuzVd-42Sg1jJxnUs8J0TVzujUVBpSGo7SHoke3UtGLXSZoMhCdkkUFR7YJjwmLVTKuP3SejOYNPQ2mERBObtRGImNZu0V-GEe1kccPjA0Rsc9CexDDx8lFrn5sWH57WPoTf4iYfpKVRE2B5-gE7wIVmIsEql7EeQyNM0FsvEWae2rv2kGIX_vjOZdFVcsaDww3w_aKnY-GmI_AUXHnn5qeGRG3GSXuAJRyeM52MmjhowTOAXcE06o2C3kOtScA')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            {/* Gradient overlay - lebih transparan agar background terlihat */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10 dark:from-black/60 dark:via-black/40 dark:to-black/20 rounded-3xl transition-opacity duration-500 group-hover:opacity-80"></div>
            
            {/* Additional subtle overlay untuk depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-3xl"></div>
            
            {/* Animated background pattern overlay */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float-1"></div>
              <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-float-2"></div>
              <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-float-3"></div>
              <div className="absolute bottom-20 right-1/3 w-2.5 h-2.5 bg-white/20 rounded-full animate-float-4"></div>
            </div>
            
            {/* Content with animations */}
            <div className={`relative z-10 flex flex-col gap-6 sm:gap-8 text-left max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Animated heading with multiple effects */}
              <h1 
                className="dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.02em] drop-shadow-2xl"
                style={{ 
                  color: '#FFFFFF',
                  textShadow: '2px 2px 12px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.2)'
                }}
              >
                {/* Discover - dengan typewriter dan glow effect */}
                <span 
                  className="inline-block opacity-0 animate-text-reveal" 
                  style={{ 
                    animationDelay: '0.3s',
                    animationFillMode: 'forwards'
                  }}
                >
                  <span className="inline-block animate-glow-pulse" style={{ animationDelay: '1.5s' }}>
                    Discover
                  </span>
                </span>
                <br />
                
                {/* Your Skincare - dengan wave animation */}
                <span 
                  className="inline-block opacity-0 animate-text-reveal" 
                  style={{ 
                    animationDelay: '0.6s',
                    animationFillMode: 'forwards'
                  }}
                >
                  <span className="inline-block animate-wave-text">
                    Your Skincare
                  </span>
                </span>
                <br />
                
                {/* Essentials - dengan gradient dan shimmer effect */}
                <span 
                  className="inline-block bg-gradient-to-r from-white via-primary/40 to-white bg-clip-text text-transparent opacity-0 animate-gradient-shimmer" 
                  style={{ 
                    animationDelay: '0.9s',
                    animationFillMode: 'forwards',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  <span className="relative inline-block">
                    <span className="animate-shimmer">Essentials</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-slide"></span>
                  </span>
                </span>
              </h1>

              {/* Animated description */}
              <p 
                className="text-white/95 dark:text-gray-100 text-base sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-lg max-w-xl opacity-0 animate-fade-in-up"
                style={{ 
                  animationDelay: '0.9s',
                  animationFillMode: 'forwards',
                  textShadow: '1px 1px 6px rgba(0,0,0,0.6), 0 0 15px rgba(0,0,0,0.3)'
                }}
              >
                Explore our curated collection of premium skincare products designed for a radiant, healthy glow.
              </p>

              {/* Animated CTA button */}
              <div 
                className="mt-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
              >
                <button 
                  className="group/btn relative flex min-w-[180px] max-w-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-2xl hover:shadow-primary/50 transition-all duration-500 transform hover:scale-110 active:scale-95"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {/* Button glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-full"></span>
                  
                  {/* Button text with animation */}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="truncate">Shop Now</span>
                    <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover/btn:translate-x-1">
                      arrow_forward
                    </span>
                  </span>

                  {/* Ripple effect */}
                  <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/btn:scale-100 opacity-0 group-hover/btn:opacity-100 transition-all duration-500"></span>
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
