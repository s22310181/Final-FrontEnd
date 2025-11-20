import React from 'react';
import { useCart } from '../context/CartContext';

const ProductGrid = () => {
  const { addToCart } = useCart();
  const formatRupiah = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const products = [
    {
      id: 1,
      name: 'Hydrating Serum',
      description: 'Hyaluronic Acid + B5',
      priceDisplay: 'Rp 375.000',
      rating: 4,
      reviews: 124,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMg37gHa2iFo4A1OllUSGTslc24cB8yYiT7-yTYHrByaztAODXHZObyOwvQH6k8o_l_yvZyW-jxsK93Cd1eyTN7-Bg82J1zIGK65vgOLs_Px6tTjrNsTfSsE6ohoE9gfe1sAnaEOgTBIey6zZi64A7htlIj_9FI5iMbyeGRKtWTWAvWZP5QNKcsKWEGKryRdFH_CaZsYLGrAHoW18cOjOO1PtuJQzTZl-8ZFnQzazcZ-IPabPRXwpJS-lTaSGtQkr593uG2xjF_g',
      alt: 'A bottle of hydrating serum'
    },
    {
      id: 2,
      name: 'Nourish Cream',
      description: 'Peptides & Ceramides',
      priceDisplay: 'Rp 630.000',
      rating: 4.5,
      reviews: 98,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLQP_dVGnhd-XRUVt87jSQIv79OpynFMV9HhwWs_9wLt276T8J7K66I24Kz9laIf7DUuEDBgU5rIMoSiVk5W7I8F11XGXB7tYi3zxACuY9av7QE6KzNEjik5WA0PisG780FxZW6txN-iIo7e36gsbaUDkDqzumO4StipPnrWg4JggM6AHulU7r552sZS4G_jwFUyE_TH2BXCY6G836_t-5QrqvPwQ-DFVx_X3QH9GSCRlTHKZ-Skh28YhScl9-vNCibn5-D7FDBQ',
      alt: 'A jar of nourishing moisturizer cream'
    },
    {
      id: 3,
      name: 'Gentle Cleanser',
      description: 'Green Tea Extract',
      priceDisplay: 'Rp 277.500',
      rating: 5,
      reviews: 210,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsNvQgtfr2ATDSViEqm9mYYwTuFz1UybxFoWE0U2khi03eh9pynotjwxvYeqAGtZXZDz-Y5mlYaQNSXotWKi6eVkIdK5KpYBFN9CzBMmB6tNrm-YkDnsEBG1PTcLlRCQ_bADYF3KNLwA_M2jB7VZHwYY_9VAaYvMeCKbOOCxsueNY6YsNRsc8PbYGftsR87XgMgnGa53vx-VyFBRCXswSdEhoZEqXR3OIo0Xve56A0QuSyx3sIko45ZE96SfiF4fc8lYsO3ZiWhw',
      alt: 'A bottle of gentle cleansing foam'
    },
    {
      id: 4,
      name: 'Daily Sunscreen',
      description: 'SPF 50+ Broad Spectrum',
      priceDisplay: 'Rp 450.000',
      rating: 4.5,
      reviews: 155,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXG-unEA-pT1Zeh60_Umedih64p11YBa6eE7TfzlYZXiL_jT5eAezDv9B7oOSAzPRpvWxeugSpk3jDIUBRlNLdhVN4r3KbRsEnYBJUNzi5TQ8Rdntrk_Gb0XklKliiF0GyCGb-G34ksm1Fn14FgMnOzpOdtSrIMTwy0krpWFLn7FBbELscbmgnbEmzGI9ht0doQW5JBWKC9TRYs1gAbRwi5rPxGtL_-cxXtGhhBPK2Tkt6oqr5cQZiuWYGAeR8Xc8pgIVbudQHhA',
      alt: 'A tube of SPF 50 sunscreen'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="material-symbols-outlined !text-base text-amber-500 dark:text-amber-400">
          star
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-symbols-outlined !text-base text-amber-500 dark:text-amber-400">
          star_half
        </span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-symbols-outlined !text-base text-gray-300 dark:text-gray-600">
          star
        </span>
      );
    }

    return stars;
  };

  return (
    <section id="products" className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-16 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col w-full max-w-7xl gap-8">
        <div className="px-4">
          <h2 className="dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]" style={{ color: '#1a1a1a' }}>
            Our Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 font-normal">
            Handpicked favorites from our collection
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <div 
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-background-dark/60 p-6 shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-white/10"
            >
              <div className="overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <img 
                  className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={product.alt}
                  src={product.image}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-bold text-primary dark:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                  {product.description}
                </p>
                <p className="text-lg font-normal dark:text-white" style={{ color: '#000000' }}>
                  {product.priceDisplay}
                </p>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 font-medium">
                    ({product.reviews})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end mt-auto pt-3 border-t border-gray-100 dark:border-white/10">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary hover:bg-primary/85 dark:bg-primary dark:hover:bg-primary/85 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
