import { Navigate } from 'react-router';
import { useAuth } from '../contexts/auth-context';

const ROLE_PERMISSIONS = {
  admin: {
    name: 'Admin',
    description: 'Oversee platform content, manage user roles, and ensure accuracy',
    dashboardPath: '/admin/dashboard',
    permissions: [
      'manage_users',
      'manage_content',
      'view_analytics',
      'system_settings',
      'moderate_content',
      'manage_roles',
    ],
  },
  educator: {
    name: 'Educator',
    description: 'Create educational content, conduct sessions, and provide insights',
    dashboardPath: '/dashboard/educator',
    permissions: [
      'create_articles',
      'create_quizzes',
      'host_discussions',
      'view_student_progress',
      'moderate_discussions',
      'create_content',
    ],
  },
  citizen: {
    name: 'Citizen',
    description: 'Explore content, participate in discussions, and engage with resources',
    dashboardPath: '/dashboard/citizen',
    permissions: [
      'read_content',
      'take_quizzes',
      'participate_discussions',
      'track_progress',
      'bookmark_articles',
      'view_certificates',
    ],
  },
  legal_expert: {
    name: 'Legal Expert',
    description: 'Offer legal insights, update content, and provide legal guidance',
    dashboardPath: '/dashboard/legal-expert',
    permissions: [
      'update_content',
      'add_legal_explanations',
      'answer_questions',
      'create_case_studies',
      'validate_content',
      'provide_guidance',
    ],
  },
};

export function RoleBasedRoute({ children, requiredRole }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    const userRoleInfo = ROLE_PERMISSIONS[user.role];
    return <Navigate to={userRoleInfo?.dashboardPath || '/dashboard/citizen'} replace />;
  }

  return children;
}

export { ROLE_PERMISSIONS };
