import React, { useEffect, useState } from 'react';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useAdminAuth } from '../contexts/admin-auth-context';

export function AdminLogsPage() {
  const { admin } = useAdminAuth();
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLogs() {
      try {
        const token = admin?.token;
        const response = await fetch('/api/logs', {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load logs');
        }
        setLogs(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadLogs();
  }, [admin]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <img src={emblemImage} alt="Emblem" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">System Logs</h1>
            <p className="text-gray-600">Review recent platform activity and audit trails.</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {logs.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg">
              No system logs are available.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="font-medium text-gray-700">{log.type.replace('_', ' ')}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-gray-700">{log.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
