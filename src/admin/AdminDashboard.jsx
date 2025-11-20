import React from 'react';
import AdminLayout from './AdminLayout';
import ProductList from './ProductList';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProductList />
    </AdminLayout>
  );
};

export default AdminDashboard;

