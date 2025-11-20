// Utility untuk handle image upload dan conversion

/**
 * Convert file ke base64 data URL
 * @param {File} file - File yang akan di-convert
 * @returns {Promise<string>} Base64 data URL
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Validate image file
 * @param {File} file - File yang akan di-validate
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'File tidak ditemukan' };
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF' };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Ukuran file terlalu besar. Maksimal 5MB' };
  }

  return { valid: true, error: null };
};

/**
 * Generate unique filename untuk image
 * @param {string} originalName - Nama file asli
 * @param {number} productId - ID produk (optional)
 * @returns {string} Nama file yang unik
 */
export const generateImageFileName = (originalName, productId = null) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split('.').pop();
  const prefix = productId ? `product-${productId}` : 'product';
  return `${prefix}-${timestamp}-${random}.${extension}`;
};

/**
 * Simpan image path ke database
 * Format: /src/assets/images/filename.jpg
 * @param {string} fileName - Nama file
 * @returns {string} Path relatif ke image
 */
export const getImagePath = (fileName) => {
  return `/src/assets/images/${fileName}`;
};

/**
 * Handle image upload
 * @param {File} file - File yang akan di-upload
 * @param {number} productId - ID produk (optional, untuk edit)
 * @returns {Promise<Object>} { fileName, imagePath, base64 }
 */
export const handleImageUpload = async (file, productId = null) => {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate filename
  const fileName = generateImageFileName(file.name, productId);
  const imagePath = getImagePath(fileName);

  // Convert to base64
  const base64 = await fileToBase64(file);

  return {
    fileName,
    imagePath,
    base64, // Simpan base64 sebagai fallback untuk display
  };
};

