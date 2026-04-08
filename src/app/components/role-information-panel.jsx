import { useIndiaColors } from '../hooks/use-india-colors';
import { useAuth } from '../contexts/auth-context';
import { useNavigate, Link } from 'react-router';
import { ROLE_PERMISSIONS } from '../utils/role-permissions';
import { Button } from './ui/button';

export function RoleInformationPanel() {
  const colors = useIndiaColors();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigateToDashboard = (role) => {
    const dashboardMap = {
      admin: '/admin/dashboard',
      educator: '/dashboard/educator',
      citizen: '/dashboard/citizen',
      legal_expert: '/dashboard/legal-expert',
    };
    navigate(dashboardMap[role]);
  };

  return (
    <div className="w-full space-y-8 py-8">
      {/* Header with CTA */}
      <div className="space-y-3 bg-gradient-to-r" style={{
        backgroundImage: `linear-gradient(135deg, ${colors.primary}15, ${colors.primary}30)`,
        padding: '2rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        <h1 className="text-3xl font-bold text-gray-900">Platform Roles & Responsibilities</h1>
        <p className="text-gray-600 max-w-2xl">
          Choose a role that matches your interest and expertise. Each role comes with unique capabilities and responsibilities.
        </p>
        {!user ? (
          <div className="flex gap-3 mt-4">
            <Link to="/signup">
              <Button style={{ backgroundColor: colors.primary }}>
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 mt-4">
            <p className="text-sm text-gray-600">
              You are currently logged in as <span className="font-semibold">{user.fullName}</span> ({user.role.replace('_', ' ')})
            </p>
          </div>
        )}
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
          <div
            key={roleKey}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Role Header */}
            <div
              className="p-6 text-white"
              style={{
                backgroundColor: roleData.color,
              }}
            >
              <div className="text-4xl mb-3">{roleData.icon}</div>
              <h2 className="text-2xl font-bold">{roleData.displayName}</h2>
            </div>

            {/* Role Description */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-700">{roleData.description}</p>

              {/* Key Features */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm">Key Capabilities:</h3>
                <ul className="space-y-2">
                  {roleData.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span
                        className="inline-block w-2 h-2 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: roleData.color }}
                      ></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* View More Link */}
              {roleData.features.length > 4 && (
                <button
                  className="text-sm font-medium hover:underline"
                  style={{ color: roleData.color }}
                >
                  View all {roleData.features.length} capabilities →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Role Information */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Detailed Role Information</h2>

        <div className="space-y-6">
          {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
            <div
              key={roleKey}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Role Header */}
              <div
                className="px-6 py-4 flex items-center gap-4 text-white"
                style={{ backgroundColor: roleData.color }}
              >
                <span className="text-3xl">{roleData.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{roleData.displayName}</h3>
                  <p className="text-sm opacity-90">{roleData.description}</p>
                </div>
              </div>

              {/* Permissions */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* All Features */}
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-3">All Capabilities ({roleData.features.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {roleData.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span
                            className="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: roleData.color }}
                          ></span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Permissions Details */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Permissions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(roleData.permissions).map(([resource, permissions]) => (
                      <div key={resource} className="bg-gray-50 p-4 rounded-md">
                        <h5 className="font-medium text-gray-900 capitalize mb-2">{resource}</h5>
                        <ul className="space-y-1">
                          {Object.entries(permissions)
                            .filter(([_, value]) => value === true)
                            .map(([action, _]) => (
                              <li
                                key={action}
                                className="text-sm text-gray-600 flex items-center gap-2"
                              >
                                <span className="text-green-600">✓</span>
                                {action.replace(/_/g, ' ')}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Comparison Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Role Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: colors.primary }}>
                <th className="px-6 py-3 text-left font-semibold text-gray-900">Feature / Capability</th>
                {Object.entries(ROLE_PERMISSIONS).map(([key, data]) => (
                  <th key={key} className="px-6 py-3 text-center font-semibold text-gray-900">
                    <div className="font-bold" style={{ color: data.color }}>
                      {data.displayName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'create_content', label: 'Create Content' },
                { key: 'edit_content', label: 'Edit Content' },
                { key: 'take_quizzes', label: 'Take Quizzes' },
                { key: 'view_analytics', label: 'View Analytics' },
                { key: 'manage_users', label: 'Manage Users' },
                { key: 'moderate_content', label: 'Moderate Content' },
                { key: 'provide_guidance', label: 'Provide Guidance' },
              ].map((feature) => (
                <tr key={feature.key} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{feature.label}</td>
                  {Object.entries(ROLE_PERMISSIONS).map(([roleKey, roleData]) => (
                    <td key={roleKey} className="px-6 py-3 text-center">
                      {roleData.features.some((f) => f.toLowerCase().includes(feature.key.replace(/_/g, ' '))) ? (
                        <span className="text-green-600 font-bold text-lg">✓</span>
                      ) : (
                        <span className="text-gray-300 font-bold text-lg">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
