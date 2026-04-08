import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAdminAuth } from '../contexts/admin-auth-context';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { BarChart3, Users, FileText, MessageSquare, TrendingUp, Shield, Download, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export function AdminDashboardEnhanced() {
  const { admin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const [leaders, setLeaders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', position: '', term: '', description: '', image: '' });
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const itemsPerPage = 8;
  const fileInputRef = useRef(null);

  const getHeaders = () => {
    const adminToken = admin?.token || (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('currentAdmin') || 'null')?.token);
    return {
      'Content-Type': 'application/json',
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
    };
  };

  useEffect(() => {
    async function loadLeaders() {
      try {
        const response = await fetch('/api/leaders', {
          headers: getHeaders(),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load leaders.');
        }
        setLeaders(data);
      } catch (error) {
        console.error('Failed to load leaders:', error);
      }
    }

    loadLeaders();
  }, [admin]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const resetForm = () => {
    setFormData({ name: '', position: '', term: '', description: '' });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.position) {
      alert('Please fill in Name and Position');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/leaders/${editingId}` : '/api/leaders';
      const response = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save leader entry.');
      }

      if (editingId) {
        setLeaders((prev) => prev.map((leader) => (leader.id === editingId ? data : leader)));
      } else {
        setLeaders((prev) => [...prev, data]);
      }

      resetForm();
      setShowForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (leader) => {
    setFormData(leader);
    setEditingId(leader.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;

    try {
      const response = await fetch(`/api/leaders/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete leader entry.');
      }
      setLeaders((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const filtered = leaders.filter(l => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (l.name || '').toLowerCase().includes(q) ||
      (l.position || '').toLowerCase().includes(q) ||
      (l.description || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  // apply sorting
  const sorted = [...filtered];
  if (sortBy) {
    sorted.sort((a, b) => {
      const va = (a[sortBy] || '').toString().toLowerCase();
      const vb = (b[sortBy] || '').toString().toLowerCase();
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }
  const pageItems = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const exportCSV = () => {
    if (!leaders.length) return;
    const headers = ['Image URL','Name', 'Position', 'Term', 'Description'];
    const rows = leaders.map(l => [l.image || '', l.name, l.position, l.term || '', l.description || '']);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.trim().split(/\r?\n/);
      const [header, ...rows] = lines;
      rows.forEach((row) => {
        const [image, name, position, term, description] = row.split(',').map(c => c.replace(/^\"|\"$/g, ''));
        if (name && position) {
          const entry = { image: image || '', name, position, term: term || '', description: description || '', id: Date.now().toString() + Math.random() };
          setLeaders(prev => {
            const updated = [...prev, entry];
            localStorage.setItem('leaders', JSON.stringify(updated));
            return updated;
          });
        }
      });
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const adminStats = [
    { label: 'Total Users', value: '2,547', icon: Users },
    { label: 'Content Items', value: '1,243', icon: FileText },
    { label: 'Active Discussions', value: '856', icon: MessageSquare },
    { label: 'Platform Health', value: '98.5%', icon: TrendingUp },
  ];

  const adminFeatures = [
    {
      title: 'User Management',
      description: 'Create, delete, update user roles and permissions. Monitor user activity and enforce compliance.',
      features: [
        'View all users and their roles',
        'Assign/change user roles',
        'Suspend or activate accounts',
        'Monitor user activity logs',
        'Reset user passwords',
      ]
    },
    {
      title: 'Content Oversight',
      description: 'Manage all platform content including articles, quizzes, and discussions.',
      features: [
        'Review and approve content',
        'Moderate discussions',
        'Remove inappropriate content',
        'Manage content categories',
        'Archive/restore content',
      ]
    },
    {
      title: 'Analytics & Reporting',
      description: 'Track platform metrics, user engagement, and generate comprehensive reports.',
      features: [
        'User engagement analytics',
        'Content performance metrics',
        'Role-wise user distribution',
        'Generate monthly reports',
        'Export data for analysis',
      ]
    },
    {
      title: 'System Configuration',
      description: 'Configure platform settings, manage roles, and ensure data integrity.',
      features: [
        'Manage platform settings',
        'Configure role permissions',
        'Manage content categories',
        'System maintenance logs',
        'Backup and restore data',
      ]
    },
  ];

  return (
    <div style={{ backgroundColor: colors.background }} className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-8 h-8" style={{ color: colors.primary }} />
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">Platform Oversight & Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{admin?.fullName || 'Administrator'}</p>
                <p className="text-xs text-gray-500">{admin?.email || ''}</p>
              </div>
              <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: colors.primary }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <Icon className="w-10 h-10" style={{ color: colors.primary, opacity: 0.2 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Admin Capabilities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {adminFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="inline-block w-2 h-2 rounded-full mt-1" style={{ backgroundColor: colors.primary }}></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r p-6 rounded-lg shadow-md text-white" style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, #1a5490 100%)` }}>
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => navigate('/admin/users')} className="bg-white text-gray-900 px-4 py-2 rounded">View Users</button>
            <button onClick={() => navigate('/admin/content')} className="bg-white text-gray-900 px-4 py-2 rounded">Manage Content</button>
            <button onClick={() => navigate('/admin/analytics')} className="bg-white text-gray-900 px-4 py-2 rounded">View Analytics</button>
            <button onClick={() => navigate('/admin/logs')} className="bg-white text-gray-900 px-4 py-2 rounded">System Logs</button>
          </div>
        </div>
        {/* Admin Data Management (Leaders) */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Leaders & Officials</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  placeholder="Search by name, position or text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                  className="pl-10 pr-3"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>
              <Button onClick={exportCSV} className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100">
                <Download className="w-4 h-4" /> Export
              </Button>
              <Button onClick={handleImportClick} className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100">
                <Download className="w-4 h-4 rotate-180" /> Import
              </Button>
              <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
              <Button onClick={() => { resetForm(); setShowForm(true); }} style={{ backgroundColor: colors.primary }} className="flex items-center gap-2">
                Add New Entry
              </Button>
            </div>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">{editingId ? 'Edit Entry' : 'Add Entry'}</h4>
                <button onClick={() => { setShowForm(false); resetForm(); }} className="text-gray-500">Close</button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                    <Input name="position" value={formData.position} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                    <Input name="term" value={formData.term} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Input name="description" value={formData.description} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <Input name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="bg-gray-300">Cancel</Button>
                  <Button type="submit" style={{ backgroundColor: colors.primary }}>{editingId ? 'Update' : 'Add'}</Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No results. Try a different search or add new entries.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">Image</th>
                      <th className="px-6 py-3 text-left">Name <button onClick={() => { setSortBy('name'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="ml-1">⇅</button></th>
                      <th className="px-6 py-3 text-left">Position <button onClick={() => { setSortBy('position'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="ml-1">⇅</button></th>
                      <th className="px-6 py-3 text-left">Term <button onClick={() => { setSortBy('term'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="ml-1">⇅</button></th>
                      <th className="px-6 py-3 text-left">Description <button onClick={() => { setSortBy('description'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="ml-1">⇅</button></th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pageItems.map(l => (
                      <tr key={l.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                        {l.image ? (
                          <img src={l.image} alt={l.name} className="w-12 h-12 object-cover rounded" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">{l.name}</td>
                        <td className="px-6 py-4 text-gray-600">{l.position}</td>
                        <td className="px-6 py-4">{l.term || '-'}</td>
                        <td className="px-6 py-4 truncate max-w-xs">{l.description || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => setSelected(l)} title="View" className="p-2 text-gray-700 hover:bg-gray-50 rounded"><Eye className="w-4 h-4"/></button>
                            <button onClick={() => handleEdit(l)} title="Edit" className="p-2 text-blue-600 hover:bg-blue-50 rounded">Edit</button>
                            <button onClick={() => handleDelete(l.id)} title="Delete" className="p-2 text-red-600 hover:bg-red-50 rounded">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-600">Showing {Math.min(filtered.length, (currentPage-1)*itemsPerPage+1)} - {Math.min(filtered.length, currentPage*itemsPerPage)} of {filtered.length}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage===1} className="p-2 rounded bg-white hover:bg-gray-100"><ChevronLeft/></button>
                <div className="text-sm">{currentPage} / {totalPages}</div>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage===totalPages} className="p-2 rounded bg-white hover:bg-gray-100"><ChevronRight/></button>
              </div>
            </div>
          </div>
        </div>
      </main>

          {selected && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
                {selected.image && (
                  <img src={selected.image} alt={selected.name} className="w-full h-48 object-cover rounded mb-4" />
                )}
                <p className="text-sm mb-1"><strong>Position:</strong> {selected.position}</p>
                <p className="text-sm mb-1"><strong>Term:</strong> {selected.term || '-'}</p>
                <p className="text-sm"><strong>Description:</strong> {selected.description || '-'}</p>
              </div>
            </div>
          )}
    </div>
  );
}
