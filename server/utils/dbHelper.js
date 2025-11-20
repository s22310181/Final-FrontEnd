import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ke db.json (di dalam server folder)
const DB_PATH = path.join(__dirname, '../data/db.json');

/**
 * Read data from db.json
 */
export const readDB = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      // Jika file tidak ada, buat struktur default
      const defaultData = {
        products: [],
        users: [],
        currentUser: null
      };
      writeDB(defaultData);
      return defaultData;
    }
    
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return {
      products: [],
      users: [],
      currentUser: null
    };
  }
};

/**
 * Write data to db.json
 */
export const writeDB = (data) => {
  try {
    // Pastikan directory exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing db.json:', error);
    return false;
  }
};

/**
 * Get all users
 */
export const getUsers = () => {
  const db = readDB();
  return db.users || [];
};

/**
 * Get user by ID
 */
export const getUserById = (id) => {
  const users = getUsers();
  return users.find(u => u.id === parseInt(id));
};

/**
 * Get user by email
 */
export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

/**
 * Add user
 */
export const addUser = (userData) => {
  const db = readDB();
  const newUser = {
    ...userData,
    id: userData.id || Date.now(),
    createdAt: userData.createdAt || new Date().toISOString(),
    role: userData.role || 'user',
  };
  
  db.users.push(newUser);
  writeDB(db);
  return newUser;
};

/**
 * Update user
 */
export const updateUser = (id, userData) => {
  const db = readDB();
  const userIndex = db.users.findIndex(u => u.id === parseInt(id));
  
  if (userIndex === -1) {
    return null;
  }
  
  db.users[userIndex] = {
    ...db.users[userIndex],
    ...userData,
    id: parseInt(id), // Pastikan ID tidak berubah
  };
  
  writeDB(db);
  return db.users[userIndex];
};

/**
 * Delete user
 */
export const deleteUser = (id) => {
  const db = readDB();
  const initialLength = db.users.length;
  db.users = db.users.filter(u => u.id !== parseInt(id));
  writeDB(db);
  return db.users.length < initialLength;
};

/**
 * Get all products
 */
export const getProducts = () => {
  const db = readDB();
  return db.products || [];
};

/**
 * Get product by ID
 */
export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === parseInt(id));
};

/**
 * Add product
 */
export const addProduct = (productData) => {
  const db = readDB();
  const newProduct = {
    ...productData,
    id: productData.id || Date.now(),
    priceDisplay: productData.priceDisplay || `Rp ${productData.price.toLocaleString('id-ID')}`,
    stock: productData.stock || 0,
  };
  
  db.products.push(newProduct);
  writeDB(db);
  return newProduct;
};

/**
 * Update product
 */
export const updateProduct = (id, productData) => {
  const db = readDB();
  const productIndex = db.products.findIndex(p => p.id === parseInt(id));
  
  if (productIndex === -1) {
    return null;
  }
  
  db.products[productIndex] = {
    ...db.products[productIndex],
    ...productData,
    id: parseInt(id), // Pastikan ID tidak berubah
    priceDisplay: productData.priceDisplay || `Rp ${productData.price.toLocaleString('id-ID')}`,
  };
  
  writeDB(db);
  return db.products[productIndex];
};

/**
 * Delete product
 */
export const deleteProduct = (id) => {
  const db = readDB();
  const initialLength = db.products.length;
  db.products = db.products.filter(p => p.id !== parseInt(id));
  writeDB(db);
  return db.products.length < initialLength;
};

