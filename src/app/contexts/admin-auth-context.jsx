import { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function parseApiResponse(response) {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return { message: text };
  }
}

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('currentAdmin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseApiResponse(response);
    if (!response.ok) {
      throw new Error(data.message || 'Invalid admin credentials');
    }

    setAdmin(data);
    localStorage.setItem('currentAdmin', JSON.stringify(data));

    return data;
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('currentAdmin');
  };

  return (
    <AdminContext.Provider value={{ admin, isLoading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminProvider');
  }
  return context;
}
