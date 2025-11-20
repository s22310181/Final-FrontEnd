// Utility untuk upload gambar ke Cloudinary via API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Upload image to Cloudinary via backend API
 * @param {File} file - File gambar yang akan di-upload
 * @returns {Promise<Object>} { url, public_id, width, height, format }
 */
export const uploadImageToCloudinary = async (file) => {
  try {
    // Validate file
    if (!file) {
      throw new Error('File tidak ditemukan');
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF');
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('Ukuran file terlalu besar. Maksimal 5MB');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('image', file);

    // Upload to backend API
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengupload gambar');
    }

    if (!data.success) {
      throw new Error(data.message || 'Gagal mengupload gambar');
    }

    return data.data; // { url, public_id, width, height, format }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary via backend API
 * @param {string} publicId - Public ID dari gambar di Cloudinary
 * @returns {Promise<boolean>}
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload/${publicId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal menghapus gambar');
    }

    return data.success;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

