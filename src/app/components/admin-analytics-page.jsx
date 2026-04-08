import React from 'react';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

export function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/admin/analytics', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <img src={emblemImage} alt="Emblem" className="w-12 h-12" />
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        </div>
        {loading ? (
          <p className="text-gray-700">Loading analytics...</p>
        ) : analytics ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded shadow-sm bg-blue-50">
              <h2 className="font-bold text-lg">Total Users</h2>
              <p className="text-3xl">{analytics.totals?.users || 0}</p>
            </div>
            <div className="p-4 border rounded shadow-sm bg-green-50">
              <h2 className="font-bold text-lg">Content Items</h2>
              <p className="text-3xl">{analytics.totals?.contentItems || 0}</p>
            </div>
            <div className="p-4 border rounded shadow-sm bg-yellow-50">
              <h2 className="font-bold text-lg">Leaders</h2>
              <p className="text-3xl">{analytics.totals?.leaders || 0}</p>
            </div>
            <div className="p-4 border rounded shadow-sm bg-purple-50">
              <h2 className="font-bold text-lg">System Logs</h2>
              <p className="text-3xl">{analytics.totals?.logs || 0}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Failed to load analytics.</p>
        )}
      </div>
    </div>
  );
}
