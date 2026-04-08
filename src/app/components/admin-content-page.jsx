import React, { useEffect, useState } from 'react';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

export function AdminContentPage() {
  const [content, setContent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/content', {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load content');
        }
        setContent(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <img src={emblemImage} alt="Emblem" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">Content Management</h1>
            <p className="text-gray-600">Review constitutional content items and manage published resources.</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {content.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg">
              No content items are available yet.
            </div>
          ) : (
            content.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white rounded border">Category: {item.category}</span>
                  <span className="px-2 py-1 bg-white rounded border">Author: {item.author}</span>
                  <span className="px-2 py-1 bg-white rounded border">Status: {item.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
