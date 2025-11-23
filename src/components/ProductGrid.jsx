import React from 'react';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';

const ProductGrid = () => {
  const { addToCart } = useCart();
  const { products } = useProduct();
  const formatRupiah = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <section id="products" className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-16 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col w-full max-w-7xl gap-8">
        <div className="px-4">
          <h2 className="dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]" style={{ color: '#000000' }}>
            Our Featured Products
          </h2>
          <p className="dark:text-gray-400 text-sm mt-2 font-normal" style={{ color: '#000000' }}>
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
                <p className="text-sm dark:text-gray-400 font-normal" style={{ color: '#000000' }}>
                  {product.description}
                </p>
                <p className="text-lg font-normal dark:text-white" style={{ color: '#000000' }}>
                  {product.priceDisplay || formatRupiah(product.price)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-gray-500 dark:text-gray-400">
                    inventory_2
                  </span>
                  <span className="text-sm dark:text-gray-400 font-medium" style={{ color: '#666666' }}>
                    Stock: {product.stock !== undefined ? product.stock : product.reviews || 0}
                  </span>
                </div>
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
