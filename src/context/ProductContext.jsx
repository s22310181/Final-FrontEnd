import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

// Initial products data
const initialProducts = [
  {
    id: 1,
    name: 'Hydrating Serum',
    description: 'Hyaluronic Acid + B5',
    price: 375000,
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
    price: 630000,
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
    price: 277500,
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
    price: 450000,
    priceDisplay: 'Rp 450.000',
    rating: 4.5,
    reviews: 155,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXG-unEA-pT1Zeh60_Umedih64p11YBa6eE7TfzlYZXiL_jT5eAezDv9B7oOSAzPRpvWxeugSpk3jDIUBRlNLdhVN4r3KbRsEnYBJUNzi5TQ8Rdntrk_Gb0XklKliiF0GyCGb-G34ksm1Fn14FgMnOzpOdtSrIMTwy0krpWFLn7FBbELscbmgnbEmzGI9ht0doQW5JBWKC9TRYs1gAbRwi5rPxGtL_-cxXtGhhBPK2Tkt6oqr5cQZiuWYGAeR8Xc8pgIVbudQHhA',
    alt: 'A tube of SPF 50 sunscreen'
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Simple ID generation
      priceDisplay: `Rp ${product.price.toLocaleString('id-ID')}`,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    const product = {
      ...updatedProduct,
      id,
      priceDisplay: `Rp ${updatedProduct.price.toLocaleString('id-ID')}`,
    };
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? product : p))
    );
    return product;
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

