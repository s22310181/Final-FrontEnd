// Database service untuk mengelola data dari db.json
// Menggunakan localStorage sebagai cache dan sinkronisasi dengan db.json

import initialData from './db.json';

const DB_KEY = 'aura_skin_db';

// Load data dari db.json (saat pertama kali)
export const loadFromDB = async () => {
  try {
    // Coba load dari localStorage dulu (cache)
    const cachedData = localStorage.getItem(DB_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      // Merge dengan initial data untuk memastikan struktur lengkap
      return {
        products: parsed.products || initialData.products || [],
        users: parsed.users || initialData.users || [],
        currentUser: parsed.currentUser || initialData.currentUser || null,
      };
    }

    // Jika tidak ada cache, gunakan initial data dari db.json
    const data = {
      products: initialData.products || [],
      users: initialData.users || [],
      currentUser: initialData.currentUser || null,
    };
    
    // Simpan ke localStorage sebagai cache
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error loading from db.json:', error);
    // Fallback: return default structure
    return getDefaultData();
  }
};

// Get default data structure
const getDefaultData = () => {
  return {
    products: [],
    users: [],
    currentUser: null
  };
};

// Save data ke localStorage (dan bisa di-extend untuk sync ke backend)
export const saveToDB = (data) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to database:', error);
    return false;
  }
};

// Get all products
export const getProducts = async () => {
  const db = await loadFromDB();
  return db.products || [];
};

// Get product by ID
export const getProductById = async (id) => {
  const products = await getProducts();
  return products.find(p => p.id === id);
};

// Add product
export const addProduct = async (product) => {
  const db = await loadFromDB();
  const newProduct = {
    ...product,
    id: product.id || Date.now(),
    priceDisplay: product.priceDisplay || `Rp ${product.price.toLocaleString('id-ID')}`,
    rating: product.rating || 0,
    reviews: product.reviews || 0,
  };
  
  db.products.push(newProduct);
  saveToDB(db);
  return newProduct;
};

// Update product
export const updateProduct = async (id, updatedProduct) => {
  const db = await loadFromDB();
  const productIndex = db.products.findIndex(p => p.id === id);
  
  if (productIndex !== -1) {
    const product = {
      ...updatedProduct,
      id,
      priceDisplay: updatedProduct.priceDisplay || `Rp ${updatedProduct.price.toLocaleString('id-ID')}`,
    };
    db.products[productIndex] = product;
    saveToDB(db);
    return product;
  }
  
  return null;
};

// Delete product
export const deleteProduct = async (id) => {
  const db = await loadFromDB();
  db.products = db.products.filter(p => p.id !== id);
  saveToDB(db);
  return true;
};

// Get all users
export const getUsers = async () => {
  const db = await loadFromDB();
  return db.users || [];
};

// Get user by ID
export const getUserById = async (id) => {
  const users = await getUsers();
  return users.find(u => u.id === id);
};

// Get user by email
export const getUserByEmail = async (email) => {
  const users = await getUsers();
  return users.find(u => u.email === email);
};

// Add user
export const addUser = async (user) => {
  const db = await loadFromDB();
  const newUser = {
    ...user,
    id: user.id || Date.now(),
    createdAt: user.createdAt || new Date().toISOString(),
    role: user.role || 'user',
  };
  
  db.users.push(newUser);
  saveToDB(db);
  return newUser;
};

// Update user
export const updateUser = async (id, updatedUser) => {
  const db = await loadFromDB();
  const userIndex = db.users.findIndex(u => u.id === id);
  
  if (userIndex !== -1) {
    db.users[userIndex] = { ...db.users[userIndex], ...updatedUser };
    saveToDB(db);
    return db.users[userIndex];
  }
  
  return null;
};

// Delete user
export const deleteUser = async (id) => {
  const db = await loadFromDB();
  db.users = db.users.filter(u => u.id !== id);
  saveToDB(db);
  return true;
};

// Get current user
export const getCurrentUser = async () => {
  const db = await loadFromDB();
  return db.currentUser;
};

// Set current user
export const setCurrentUser = async (user) => {
  const db = await loadFromDB();
  db.currentUser = user;
  saveToDB(db);
  return user;
};

// Clear current user (logout)
export const clearCurrentUser = async () => {
  const db = await loadFromDB();
  db.currentUser = null;
  saveToDB(db);
  return true;
};

// Sync data (untuk sinkronisasi dengan backend jika diperlukan)
export const syncData = async () => {
  // Ini bisa di-extend untuk sync dengan backend API
  const db = await loadFromDB();
  // Simpan kembali untuk trigger sync
  saveToDB(db);
  return db;
};

