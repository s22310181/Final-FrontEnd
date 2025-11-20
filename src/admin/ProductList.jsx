import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';

const ProductList = () => {
  const { products, deleteProduct } = useProduct();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = async (id) => {
    if (deleteConfirm === id) {
      try {
        await deleteProduct(id);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Gagal menghapus produk');
      }
    } else {
      setDeleteConfirm(id);
      // Auto cancel confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const formatRupiah = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold dark:text-white mb-2" style={{ color: '#000000' }}>
            Daftar Produk
          </h2>
          <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
            Total: {products.length} produk
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/products/add')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/85 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <span className="material-symbols-outlined">add</span>
          Tambah Produk Baru
        </button>
      </div>

      {/* Products Table/Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-background-dark/60 rounded-2xl border border-gray-200 dark:border-white/10">
          <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">
            inventory_2
          </span>
          <p className="text-lg font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
            Belum ada produk
          </p>
          <p className="text-sm dark:text-gray-400 mb-6" style={{ color: '#666666' }}>
            Tambahkan produk pertama Anda
          </p>
          <button
            onClick={() => navigate('/admin/products/add')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/85 text-white font-semibold transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Tambah Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-background-dark/60 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-white/10 overflow-hidden"
            >
              {/* Product Image */}
              <div className="h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={product.image}
                  alt={product.alt || product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary dark:text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-sm dark:text-gray-400 mb-3" style={{ color: '#666666' }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-semibold dark:text-white" style={{ color: '#000000' }}>
                    {product.priceDisplay || formatRupiah(product.price)}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-500 text-sm">
                      star
                    </span>
                    <span className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-white/10">
                  <button
                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      deleteConfirm === product.id
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {deleteConfirm === product.id ? 'check' : 'delete'}
                    </span>
                    {deleteConfirm === product.id ? 'Konfirmasi' : 'Hapus'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

