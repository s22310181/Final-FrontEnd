import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProductController,
  deleteProductController
} from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', getProduct);

// POST /api/products - Create new product
router.post('/', createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', updateProductController);

// DELETE /api/products/:id - Delete product
router.delete('/:id', deleteProductController);

export default router;

