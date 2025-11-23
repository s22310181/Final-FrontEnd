import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import AdminLayout from './AdminLayout';

const EditProduct = () => {
  const { id } = useParams();
  const { getProductById, updateProduct } = useProduct();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

    // Update preview when image URL changes
    if (name === 'image') {
      if (value && isValidUrl(value)) {
        setImagePreview(value);
      } else {
        setImagePreview(null);
      }
    }
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
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

    if (!formData.image || !isValidUrl(formData.image)) {
      alert('Mohon masukkan URL gambar yang valid');
      setLoading(false);
      return;
    }

    try {
      const updatedProduct = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock) || 0,
        image: formData.image, // URL dari input
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

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Gambar Produk (URL) <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Masukkan URL gambar dari Google atau sumber lainnya..."
                required
                disabled={loading}
              />
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-xs dark:text-gray-400 mb-2" style={{ color: '#666666' }}>Preview:</p>
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl border border-gray-200 dark:border-white/10"
                      onError={() => {
                        setImagePreview(null);
                        alert('Gagal memuat gambar. Pastikan URL gambar valid.');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              )}
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

