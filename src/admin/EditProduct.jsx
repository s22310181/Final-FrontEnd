import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import AdminLayout from './AdminLayout';
import { handleImageUpload, validateImageFile } from '../utils/imageHandler';

const EditProduct = () => {
  const { id } = useParams();
  const { getProductById, updateProduct } = useProduct();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    alt: '',
  });

  useEffect(() => {
    const productId = parseInt(id);
    const foundProduct = getProductById(productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setFormData({
        name: foundProduct.name || '',
        description: foundProduct.description || '',
        price: foundProduct.price || '',
        stock: foundProduct.stock || foundProduct.reviews || '', // Support old data with reviews
        image: foundProduct.image || '',
        alt: foundProduct.alt || foundProduct.name || '',
      });
      // Set preview dari image yang sudah ada
      if (foundProduct.image) {
        setImagePreview(foundProduct.image);
      }
    } else {
      alert('Produk tidak ditemukan');
      navigate('/admin');
    }
  }, [id, getProductById, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      e.target.value = ''; // Reset input
      return;
    }

    setImageFile(file);

    // Create preview
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error creating preview:', error);
      alert('Gagal membuat preview gambar');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!formData.name || !formData.description || !formData.price) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      setLoading(false);
      return;
    }

    // For edit, image is optional - can keep existing or upload new
    if (!imageFile && !formData.image) {
      alert('Mohon pilih gambar produk atau gunakan gambar yang sudah ada');
      setLoading(false);
      return;
    }

    try {
      let imagePath = formData.image; // Keep existing image path if no new file
      let imageBase64 = formData.image; // Keep existing image (base64 or URL) if no new file

      // Handle image upload if new file is selected
      if (imageFile) {
        const imageData = await handleImageUpload(imageFile, parseInt(id));
        imagePath = imageData.imagePath;
        imageBase64 = imageData.base64; // Simpan base64 untuk display
      }

      const updatedProduct = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock) || 0,
        image: imageBase64 || imagePath, // Gunakan base64 untuk preview, atau path untuk production
        imagePath: imagePath, // Simpan path untuk reference
        alt: formData.alt || formData.name,
      };

      await updateProduct(parseInt(id), updatedProduct);
      
      // Show success message
      alert('Produk berhasil diperbarui!');
      
      // Navigate back to admin dashboard
      navigate('/admin');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Terjadi kesalahan saat memperbarui produk');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4 animate-spin">
              refresh
            </span>
            <p className="text-lg dark:text-gray-300" style={{ color: '#000000' }}>
              Memuat data produk...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white mb-2" style={{ color: '#000000' }}>
            Edit Produk
          </h1>
          <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
            Perbarui informasi produk di bawah
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-background-dark/60 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Contoh: Hydrating Serum"
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                style={{ color: '#000000' }}
                placeholder="Contoh: Hyaluronic Acid + B5"
                required
                disabled={loading}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Harga (Rupiah) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Contoh: 375000"
                min="0"
                required
                disabled={loading}
              />
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Jumlah Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Contoh: 50"
                min="0"
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Gambar Produk <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="image-upload"
                    className="flex-1 flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl cursor-pointer hover:border-primary transition-colors bg-gray-50 dark:bg-white/5"
                  >
                    <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500 mb-2">
                      image
                    </span>
                    <span className="text-sm font-semibold dark:text-gray-300 mb-1" style={{ color: '#000000' }}>
                      {imageFile ? imageFile.name : imagePreview ? 'Ganti gambar' : 'Klik untuk memilih gambar'}
                    </span>
                    <span className="text-xs dark:text-gray-400" style={{ color: '#666666' }}>
                      JPG, PNG, WEBP, atau GIF (Maks. 5MB)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={loading}
                  />
                </div>
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-xs dark:text-gray-400 mb-2" style={{ color: '#666666' }}>Preview:</p>
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl border border-gray-200 dark:border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(formData.image || null);
                          setImageFile(null);
                          const input = document.getElementById('image-upload');
                          if (input) input.value = '';
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alt Text */}
            <div>
              <label htmlFor="alt" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Alt Text (untuk aksesibilitas)
              </label>
              <input
                type="text"
                id="alt"
                name="alt"
                value={formData.alt}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Contoh: A bottle of hydrating serum"
                disabled={loading}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 font-semibold transition-all"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-primary hover:bg-primary/85 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin">refresh</span>
                    Menyimpan...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">save</span>
                    Perbarui Produk
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;

