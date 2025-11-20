import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import AdminLayout from './AdminLayout';
import { validateImageFile } from '../utils/imageHandler';
import { uploadImageToCloudinary } from '../utils/cloudinary';

const AddProduct = () => {
  const { addProduct } = useProduct();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    alt: '',
  });

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

    if (!imageFile) {
      alert('Mohon pilih gambar produk');
      setLoading(false);
      return;
    }

    try {
      // Upload image to Cloudinary
      const imageData = await uploadImageToCloudinary(imageFile);
      
      const product = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock) || 0,
        image: imageData.url, // Cloudinary URL
        imagePublicId: imageData.public_id, // Simpan public_id untuk delete nanti
        alt: formData.alt || formData.name,
      };

      await addProduct(product);
      
      // Show success message
      alert('Produk berhasil ditambahkan!');
      
      // Navigate back to admin dashboard
      navigate('/admin');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Terjadi kesalahan saat menambahkan produk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white mb-2" style={{ color: '#000000' }}>
            Tambah Produk Baru
          </h1>
          <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
            Isi form di bawah untuk menambahkan produk baru
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
                placeholder="Masukan nama produk..."
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
                placeholder="Masukan deskripsi produk..."
                required
                disabled={loading}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
                Harga <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                style={{ color: '#000000' }}
                placeholder="Masukan harga produk..."
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
                placeholder="Jumlah stock produk..."
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
                      {imageFile ? imageFile.name : 'Klik untuk memilih gambar'}
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
                          setImagePreview(null);
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
                    Simpan Produk
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

export default AddProduct;

