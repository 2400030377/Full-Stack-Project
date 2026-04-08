import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/auth-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIndiaColors } from '../hooks/use-india-colors';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
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

      const loggedInUser = await login(email, password);
      const userRole = loggedInUser?.role || 'citizen';
      
      // Redirect to appropriate dashboard based on role
      const dashboardMap = {
        admin: '/dashboard/admin',
        educator: '/dashboard/educator',
        citizen: '/dashboard/citizen',
        legal_expert: '/dashboard/legal-expert',
      };
      
      const redirectPath = dashboardMap[userRole] || '/';
      navigate(redirectPath);
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
            <h1 className="text-2xl font-bold text-gray-900">Constitution of India</h1>
            <p className="text-gray-600">Sign in to your account</p>
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
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
              {isLoading ? 'Signing in...' : 'Sign In'}
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

          {/* Sign Up Link */}
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium hover:underline"
                style={{ color: colors.primary }}
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs font-medium text-blue-900 mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-800">Email: demo@example.com</p>
            <p className="text-xs text-blue-800">Password: password123</p>
          </div>

          {/* Continue as Guest */}
          <div className="text-center">
            <Link
              to="/signup"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Create a new account
            </Link>
          </div>

          {/* Admin Link */}
          <div className="text-center pt-2 border-t border-gray-300">
            <Link
              to="/admin/login"
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
