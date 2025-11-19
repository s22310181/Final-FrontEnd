import React from 'react';

const CategorySection = () => {
  const categories = [
    {
      icon: 'water_drop',
      title: 'Serums',
      description: 'Targeted treatments'
    },
    {
      icon: 'icecream',
      title: 'Moisturizers',
      description: 'Hydrate & nourish'
    },
    {
      icon: 'sprinkler',
      title: 'Toners',
      description: 'Balance & prep'
    },
    {
      icon: 'wb_sunny',
      title: 'Sunscreens',
      description: 'Protect your skin'
    },
    {
      icon: 'face_retouching_natural',
      title: 'Lip Treatments',
      description: 'Plump & soften'
    },
    {
      icon: 'soap',
      title: 'Face Wash',
      description: 'Cleanse & purify'
    }
  ];

  return (
    <section className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-16 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col w-full max-w-7xl gap-8">
        <div className="px-4">
          <h2 className="dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]" style={{ color: '#1a1a1a' }}>
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 font-normal">
            Browse our collection by product type
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="flex flex-1 gap-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-background-dark/60 p-6 flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-primary dark:text-primary text-4xl">
                  {category.icon}
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <h3 className="text-primary dark:text-primary text-base font-bold leading-tight transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-xs font-normal leading-normal">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
