import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './AdminLayout';

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    // Load users from localStorage
    // In a real app, this would be an API call
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with current user if no users exist
      if (currentUser) {
        const initialUsers = [{
          id: Date.now(),
          email: currentUser.email,
          name: currentUser.name,
          role: 'admin',
          createdAt: currentUser.loginTime || new Date().toISOString(),
        }];
        setUsers(initialUsers);
        localStorage.setItem('users', JSON.stringify(initialUsers));
      }
    }
  }, [currentUser]);

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      const updatedUsers = users.filter(u => u.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map(u =>
      u.id === id ? { ...u, role: newRole } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold dark:text-white mb-2" style={{ color: '#000000' }}>
            Kelola User
          </h2>
          <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
            Total: {users.length} user
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Cari user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              style={{ color: '#000000' }}
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-background-dark/60 rounded-2xl border border-gray-200 dark:border-white/10">
          <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">
            people
          </span>
          <p className="text-lg font-semibold dark:text-gray-300 mb-2" style={{ color: '#000000' }}>
            {searchTerm ? 'User tidak ditemukan' : 'Belum ada user'}
          </p>
          <p className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
            {searchTerm ? 'Coba kata kunci lain' : 'User akan muncul di sini setelah terdaftar'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-background-dark/60 rounded-2xl shadow-md border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ color: '#000000' }}>
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ color: '#000000' }}>
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ color: '#000000' }}>
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ color: '#000000' }}>
                    Bergabung
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider" style={{ color: '#000000' }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary">
                            person
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold dark:text-white" style={{ color: '#000000' }}>
                            {user.name || 'User'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm dark:text-gray-300" style={{ color: '#666666' }}>
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role || 'user'}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        style={{ color: '#000000' }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm dark:text-gray-400" style={{ color: '#666666' }}>
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                          deleteConfirm === user.id
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          {deleteConfirm === user.id ? 'check' : 'delete'}
                        </span>
                        {deleteConfirm === user.id ? 'Konfirmasi' : 'Hapus'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;

