/**
 * Role-Based Access Control (RBAC) System
 * Defines permissions and capabilities for each user role
 */

export const ROLE_HIERARCHY = {
  admin: 1,
  legal_expert: 2,
  educator: 3,
  citizen: 4,
};

export const ROLE_PERMISSIONS = {
  admin: {
    displayName: 'Administrator',
    description: 'Oversee platform content, manage user roles, and ensure accuracy of information.',
    icon: '🛡️',
    color: '#DC2626', // red-600
    permissions: {
      users: {
        view_all: true,
        create: true,
        edit: true,
        delete: true,
        change_role: true,
        suspend: true,
      },
      content: {
        create: true,
        edit_all: true,
        delete: true,
        approve: true,
        moderate: true,
        publish: true,
      },
      analytics: {
        view_all: true,
        export: true,
        generate_reports: true,
      },
      system: {
        manage_settings: true,
        manage_roles: true,
        view_logs: true,
        backup: true,
      },
    },
    features: [
      'Manage all users and roles',
      'Approve/reject content',
      'Moderate discussions',
      'View platform analytics',
      'Access system settings',
      'Generate reports',
      'Manage platform categories',
      'View activity logs',
    ],
  },

  educator: {
    displayName: 'Educator',
    description: 'Create educational content, conduct interactive sessions, and provide insights.',
    icon: '📚',
    color: '#2563EB', // blue-600
    permissions: {
      content: {
        create: true,
        edit_own: true,
        delete_own: true,
        view_all: true,
      },
      quizzes: {
        create: true,
        edit_own: true,
        delete_own: true,
        view_results: true,
      },
      discussions: {
        create: true,
        moderate_own: true,
        answer: true,
      },
      students: {
        view_progress: true,
        provide_feedback: true,
      },
    },
    features: [
      'Create and publish articles',
      'Design interactive quizzes',
      'Host discussion forums',
      'Track student progress',
      'Provide feedback',
      'Create learning materials',
      'View engagement metrics',
      'Generate certificates',
    ],
  },

  legal_expert: {
    displayName: 'Legal Expert',
    description: 'Offer legal insights, update constitutional content, and provide guidance.',
    icon: '⚖️',
    color: '#7C3AED', // purple-600
    permissions: {
      content: {
        create: true,
        edit_all: true,
        view_all: true,
        add_legal_notes: true,
      },
      legal: {
        provide_opinions: true,
        answer_questions: true,
        validate_content: true,
        add_case_references: true,
      },
      discussions: {
        answer: true,
        moderate_legal: true,
      },
    },
    features: [
      'Update constitutional content',
      'Add legal explanations',
      'Answer user questions',
      'Create case studies',
      'Add landmark judgments',
      'Provide legal guidance',
      'Validate content accuracy',
      'Compile legal references',
    ],
  },

  citizen: {
    displayName: 'Citizen',
    description: 'Explore content, participate in discussions, and engage with educational resources.',
    icon: '👥',
    color: '#059669', // green-600
    permissions: {
      content: {
        view_all: true,
        bookmark: true,
      },
      quizzes: {
        take: true,
        view_results: true,
      },
      discussions: {
        create: true,
        answer: true,
        view_all: true,
      },
      profile: {
        edit_own: true,
        view_progress: true,
      },
    },
    features: [
      'Read constitutional content',
      'Browse articles by topic',
      'Take interactive quizzes',
      'Track learning progress',
      'Participate in discussions',
      'Earn badges and certificates',
      'Bookmark articles',
      'View leaderboards',
    ],
  },
};

/**
 * Check if a user has specific permission
 */
export function hasPermission(userRole, resource, action) {
  const rolePerms = ROLE_PERMISSIONS[userRole];
  if (!rolePerms) return false;

  const resourcePerms = rolePerms.permissions[resource];
  if (!resourcePerms) return false;

  return resourcePerms[action] === true;
}

/**
 * Check if user can access a feature
 */
export function canAccessFeature(userRole, featureKey) {
  const rolePerms = ROLE_PERMISSIONS[userRole];
  if (!rolePerms) return false;

  return rolePerms.features.includes(featureKey);
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(userRole) {
  return ROLE_PERMISSIONS[userRole] || null;
}

/**
 * Get display name for a role
 */
export function getRoleDisplayName(userRole) {
  const role = ROLE_PERMISSIONS[userRole];
  return role?.displayName || userRole;
}

/**
 * Check if one role is higher in hierarchy than another
 */
export function isHigherRole(role1, role2) {
  return (ROLE_HIERARCHY[role1] || 0) < (ROLE_HIERARCHY[role2] || 0);
}

/**
 * Get all available roles
 */
export function getAllRoles() {
  return Object.entries(ROLE_PERMISSIONS).map(([key, value]) => ({
    id: key,
    ...value,
  }));
}
