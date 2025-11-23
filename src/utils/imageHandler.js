// Utility untuk validasi file gambar

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
