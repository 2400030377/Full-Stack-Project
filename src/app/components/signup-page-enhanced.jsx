import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/auth-context';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIndiaColors } from '../hooks/use-india-colors';
import { ChevronRight } from 'lucide-react';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

export function SignupPageEnhanced() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const roles = [
    {
      id: 'citizen',
      name: 'Citizen',
      description: 'Learn about Indian Constitution, take quizzes, and participate in discussions.',
      icon: '👥',
    },
    {
      id: 'educator',
      name: 'Educator',
      description: 'Create educational content, conduct sessions, and guide learners.',
      icon: '📚',
    },
    {
      id: 'legal_expert',
      name: 'Legal Expert',
      description: 'Provide legal insights, update content, and offer expert guidance.',
      icon: '⚖️',
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Manage platform, oversee content, and ensure system integrity.',
      icon: '🛡️',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!fullName.trim()) {
        throw new Error('Full name is required');
      }
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      if (!password) {
        throw new Error('Password is required');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      await signup(email, password, fullName, selectedRole);
      
      // Redirect to appropriate dashboard based on selected role
      const dashboardMap = {
        admin: '/admin/dashboard',
        educator: '/dashboard/educator',
        citizen: '/dashboard/citizen',
        legal_expert: '/dashboard/legal-expert',
      };
      
      const redirectPath = dashboardMap[selectedRole] || '/';
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
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto">
              <img src={emblemImage} alt="State Emblem of India" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Join Constitution Awareness Platform</h1>
            <p className="text-gray-600">Create your account and choose your learning path</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Select Your Role</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{role.icon}</div>
                  <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
              />
            </div>

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
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isLoading}
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && <ChevronRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium hover:underline"
                style={{ color: colors.primary }}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
