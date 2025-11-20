import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Configure multer for memory storage (temporary storage before upload to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

/**
 * POST /api/upload
 * Upload image to Cloudinary
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    // Convert buffer to base64
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'auraskin/products', // Folder di Cloudinary
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' }, // Resize jika terlalu besar
        { quality: 'auto' }, // Optimize quality
      ],
    });

    // Return Cloudinary URL
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url, // HTTPS URL
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message,
    });
  }
});

/**
 * DELETE /api/upload/:public_id
 * Delete image from Cloudinary
 */
router.delete('/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params;
    
    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);
    
    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'Image deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message,
    });
  }
});

export default router;

