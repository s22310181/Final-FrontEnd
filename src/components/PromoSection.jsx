import React from 'react';

const PromoSection = () => {
  const promos = [
    {
      title: 'Buy 1, Get 1 Free',
      description: 'On all our signature cleansers. Limited time only!',
      link: '#',
      linkText: 'Shop Cleansers',
      bgClass: 'bg-accent/20 dark:bg-accent/10'
    },
    {
      title: '20% Off Bundles',
      description: 'Create your perfect routine and save.',
      link: '#',
      linkText: 'Explore Bundles',
      bgClass: 'bg-secondary/40 dark:bg-secondary/10'
    }
  ];

  return (
    <section className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-16 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col w-full max-w-7xl gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {promos.map((promo, index) => (
            <div 
              key={index}
              className={`rounded-3xl p-10 sm:p-12 flex items-center justify-center text-center border border-gray-200/50 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:border-primary/30 dark:hover:border-primary/30 ${promo.bgClass}`}
            >
              <div className="flex flex-col gap-4 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold dark:text-white" style={{ color: '#000000' }}>
                  {promo.title}
                </h3>
                <p className="dark:text-gray-300 text-base font-medium" style={{ color: '#000000' }}>
                  {promo.description}
                </p>
                <a 
                  className="mt-2 inline-flex items-center justify-center rounded-full h-12 px-8 bg-primary hover:bg-primary/85 dark:bg-primary dark:hover:bg-primary/85 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95" 
                  href={promo.link}
                >
                  {promo.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
