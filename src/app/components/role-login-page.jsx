import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/auth-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

const roleConfig = {
  citizen: {
    name: 'Citizen',
    icon: '👥',
    color: '#059669',
    description: 'Login to explore constitution, take quizzes, and engage with community',
    backgroundColor: '#F0F8EF',
    bgColor: '#059669',
  },
  educator: {
    name: 'Educator',
    icon: '📚',
    color: '#2563EB',
    description: 'Login to create content, design quizzes, and mentor learners',
    backgroundColor: '#F0F4FF',
    bgColor: '#2563EB',
  },
  legal_expert: {
    name: 'Legal Expert',
    icon: '⚖️',
    color: '#7C3AED',
    description: 'Login to provide legal insights and update content',
    backgroundColor: '#F5F3FF',
    bgColor: '#7C3AED',
  },
};

export function RoleLoginPage({ role = 'citizen' }) {
  const config = roleConfig[role] || roleConfig.citizen;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const loggedInUser = await login(email, password);
      
      // Verify role matches exactly
      if (loggedInUser?.role !== role) {
        throw new Error(`This account is not registered as a ${config.name}`);
      }

      const dashboardMap = {
        citizen: '/dashboard/citizen',
        educator: '/dashboard/educator',
        legal_expert: '/dashboard/legal-expert',
      };
      
      navigate(dashboardMap[loggedInUser?.role] || '/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: config.backgroundColor }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Role Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div
                className="text-5xl p-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${config.color}20` }}
              >
                {config.icon}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{config.name} Login</h1>
            <p className="text-gray-600 text-sm">{config.description}</p>
            <div className="flex justify-center">
              <img src={emblemImage} alt="India Emblem" className="w-12 h-12" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

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

            <Button
              type="submit"
              className="w-full text-white"
              disabled={isLoading}
              style={{ backgroundColor: config.color }}
            >
              {isLoading ? 'Signing in...' : `Login as ${config.name}`}
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

          {/* Sign Up & Links */}
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium hover:underline"
                style={{ color: config.color }}
              >
                Create one now
              </Link>
            </p>
            <p className="text-gray-600 text-sm">
              Wrong role?{' '}
              <Link
                to="/login"
                className="font-medium hover:underline"
                style={{ color: config.color }}
              >
                Select different role
              </Link>
            </p>
          </div>

          {/* Demo Info */}
          <div className="p-3 rounded-md" style={{ backgroundColor: `${config.color}10`, borderLeft: `4px solid ${config.color}` }}>
            <p className="text-xs font-medium mb-1" style={{ color: config.color }}>Demo Account:</p>
            <p className="text-xs text-gray-700">Email: demo@example.com</p>
            <p className="text-xs text-gray-700">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
