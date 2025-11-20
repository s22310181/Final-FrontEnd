import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../utils/dbHelper.js';
import cloudinary from '../config/cloudinary.js';

/**
 * GET /api/products
 * Get all products
 */
export const getAllProducts = (req, res) => {
  try {
    const products = getProducts();
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

/**
 * GET /api/products/:id
 * Get product by ID
 */
export const getProduct = (req, res) => {
  try {
    const { id } = req.params;
    const product = getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

/**
 * POST /api/products
 * Create new product
 */
export const createProduct = (req, res) => {
  try {
    const { name, description, price, stock, image, alt } = req.body;
    
    // Validation
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and price are required'
      });
    }
    
    const newProduct = addProduct({
      name,
      description,
      price: parseFloat(price),
      stock: stock || 0,
      image: image || '',
      alt: alt || name,
      priceDisplay: `Rp ${parseFloat(price).toLocaleString('id-ID')}`
    });
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

/**
 * PUT /api/products/:id
 * Update product
 */
export const updateProductController = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Check if product exists
    const existingProduct = getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Format price display if price is updated
    if (updateData.price) {
      updateData.price = parseFloat(updateData.price);
      updateData.priceDisplay = `Rp ${updateData.price.toLocaleString('id-ID')}`;
    }
    
    const updatedProduct = updateProduct(id, updateData);
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

/**
 * DELETE /api/products/:id
 * Delete product and its image from Cloudinary
 */
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const existingProduct = getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Delete image from Cloudinary if imagePublicId exists
    if (existingProduct.imagePublicId) {
      try {
        const result = await cloudinary.uploader.destroy(existingProduct.imagePublicId);
        if (result.result !== 'ok') {
          console.warn(`Failed to delete image from Cloudinary: ${existingProduct.imagePublicId}`);
          // Continue with product deletion even if image deletion fails
        }
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
        // Continue with product deletion even if image deletion fails
      }
    }
    
    // Delete product from database
    const deleted = deleteProduct(id);
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete product'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

