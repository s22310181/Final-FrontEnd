// API utility untuk komunikasi dengan server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Generic fetch function dengan error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Users API
export const usersAPI = {
  // Get all users
  getAll: async () => {
    return await fetchAPI('/users');
  },

  // Get user by ID
  getById: async (id) => {
    return await fetchAPI(`/users/${id}`);
  },

  // Get user by email
  getByEmail: async (email) => {
    const response = await fetchAPI('/users');
    const user = response.data?.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    return user || null;
  },

  // Create user
  create: async (userData) => {
    return await fetchAPI('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Update user
  update: async (id, userData) => {
    return await fetchAPI(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  delete: async (id) => {
    return await fetchAPI(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Products API
export const productsAPI = {
  // Get all products
  getAll: async () => {
    return await fetchAPI('/products');
  },

  // Get product by ID
  getById: async (id) => {
    return await fetchAPI(`/products/${id}`);
  },

  // Create product
  create: async (productData) => {
    return await fetchAPI('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product
  update: async (id, productData) => {
    return await fetchAPI(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product
  delete: async (id) => {
    return await fetchAPI(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

