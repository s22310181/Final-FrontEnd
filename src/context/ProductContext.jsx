import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from API on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        const productsData = response.data || [];
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await productsAPI.create(product);
      const newProduct = response.data;
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await productsAPI.update(id, updatedProduct);
      const product = response.data;
      if (product) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? product : p))
        );
      }
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  const refreshProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      const productsData = response.data || [];
      setProducts(productsData);
    } catch (error) {
      console.error('Error refreshing products:', error);
    }
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

