import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAdminAuth } from '../contexts/admin-auth-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIndiaColors } from '../hooks/use-india-colors';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      await loginAdmin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto">
              <img src={emblemImage} alt="State Emblem of India" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-600">Constitution Management System</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {isLoading ? 'Signing in...' : 'Admin Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-xs font-medium text-amber-900 mb-1">Admin Credentials:</p>
            <p className="text-xs text-amber-800">Email: admin@constitution.gov</p>
            <p className="text-xs text-amber-800">Password: admin@123</p>
          </div>

          {/* User Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              User Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
