import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAdminAuth } from '../contexts/admin-auth-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Trash2, Plus, Edit2, X } from 'lucide-react';

export function AdminDashboard() {
  const { admin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const [leaders, setLeaders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    term: '',
    description: '',
  });

  // Load leaders data from localStorage on mount
  useEffect(() => {
    const storedLeaders = localStorage.getItem('leaders');
    if (storedLeaders) {
      setLeaders(JSON.parse(storedLeaders));
    }
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
    }
  }, [admin, navigate]);

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      term: '',
      description: '',
    });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.position) {
      alert('Please fill in Name and Position');
      return;
    }

    let updatedLeaders;

    if (editingId) {
      // Update existing leader
      updatedLeaders = leaders.map(leader =>
        leader.id === editingId ? { ...formData, id: editingId } : leader
      );
    } else {
      // Add new leader
      updatedLeaders = [
        ...leaders,
        {
          ...formData,
          id: Date.now().toString()
        }
      ];
    }

    setLeaders(updatedLeaders);
    localStorage.setItem('leaders', JSON.stringify(updatedLeaders));
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (leader) => {
    setFormData(leader);
    setEditingId(leader.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedLeaders = leaders.filter(leader => leader.id !== id);
      setLeaders(updatedLeaders);
      localStorage.setItem('leaders', JSON.stringify(updatedLeaders));
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  if (!admin) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage Constitution Data</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{admin.fullName}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Leaders & Officials</h2>
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              style={{ backgroundColor: colors.primary }}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Entry
            </Button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingId ? 'Edit Entry' : 'Add New Entry'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <Input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g., President, Chief Justice"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Term Period
                    </label>
                    <Input
                      type="text"
                      name="term"
                      value={formData.term}
                      onChange={handleInputChange}
                      placeholder="e.g., 2022-2027"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {editingId ? 'Update Entry' : 'Add Entry'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {leaders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No entries found. Click "Add New Entry" to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Term
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaders.map((leader) => (
                      <tr key={leader.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {leader.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {leader.position}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {leader.term || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                          {leader.description || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(leader)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(leader.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Total Entries:</span> {leaders.length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
