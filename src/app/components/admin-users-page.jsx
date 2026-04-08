import React, { useEffect, useState } from 'react';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useAdminAuth } from '../contexts/admin-auth-context';

export function AdminUsersPage() {
  const { admin } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const token = admin?.token;
        const response = await fetch('/api/admin/users', {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load users');
        }
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadUsers();
  }, [admin]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <img src={emblemImage} alt="Emblem" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-gray-600">View and manage registered platform users.</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Role</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-900">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-sm text-gray-500">
                    No registered users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{user.fullName}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{user.email}</td>
                    <td className="px-4 py-4 text-sm text-gray-700 capitalize">{user.role.replace('_', ' ')}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
