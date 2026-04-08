import { Link } from 'react-router';
import { Button } from './ui/button';
import { useIndiaColors } from '../hooks/use-india-colors';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

export function RoleSelector() {
  const colors = useIndiaColors();

  const roles = [
    {
      id: 'citizen',
      name: 'Citizen',
      icon: '👥',
      description: 'Explore constitution, take quizzes, and engage with the community',
      color: '#059669',
      path: '/login/citizen',
    },
    {
      id: 'educator',
      name: 'Educator',
      icon: '📚',
      description: 'Create content, design quizzes, and mentor learners',
      color: '#2563EB',
      path: '/login/educator',
    },
    {
      id: 'legal_expert',
      name: 'Legal Expert',
      icon: '⚖️',
      description: 'Provide legal insights and update constitutional content',
      color: '#7C3AED',
      path: '/login/legal-expert',
    },
    {
      id: 'admin',
      name: 'Administrator',
      icon: '🛡️',
      description: 'Manage platform, users, and oversee all content',
      color: '#DC2626',
      path: '/login/admin',
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-4">
            <img src={emblemImage} alt="State Emblem of India" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Constitution of India</h1>
          <p className="text-gray-600 text-lg">Select your role to continue</p>
          <p className="text-gray-500 text-sm mt-2">Choose the role that best describes your purpose</p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => (
            <Link key={role.id} to={role.path} className="group">
              <div
                className="h-full p-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer hover:shadow-lg bg-white"
              >
                {/* Role Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="text-4xl p-3 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${role.color}20` }}
                  >
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{role.name}</h3>
                    <div
                      className="inline-block px-2 py-1 rounded text-xs font-semibold text-white mt-1"
                      style={{ backgroundColor: role.color }}
                    >
                      {role.id.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{role.description}</p>

                {/* Action Button */}
                <div
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                  style={{ color: role.color }}
                >
                  Continue as {role.name}
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>New to our platform? <Link to="/signup" className="font-semibold hover:underline" style={{ color: colors.primary }}>Create an account</Link></p>
          <p className="mt-2">Already have an account? Select your role above to login</p>
        </div>
      </div>
    </div>
  );
}
