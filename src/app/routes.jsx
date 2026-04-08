import { createBrowserRouter } from 'react-router';
import { MainLayout } from './components/main-layout';
import { HomePage } from './components/home-page';
import { ReadPage } from './components/read-page';
import { ExplorePage } from './components/explore-page';
import { HistoryPage } from './components/history-page';
import { PreamblePage } from './components/preamble-page';
import { NotFoundPage } from './components/not-found-page';
import { LoginPage } from './components/login-page';
import { SignupPageEnhanced } from './components/signup-page-enhanced';
import { AdminLoginPage } from './components/admin-login-page';
import { AdminDashboard } from './components/admin-dashboard';
import { ProtectedRoute } from './components/protected-route';
import { RoleBasedRoute } from './components/role-based-route';
import { Navigate } from 'react-router';
import { useAdminAuth } from './contexts/admin-auth-context';
import { RoleInformationPanel } from './components/role-information-panel';
import { RoleSelector } from './components/role-selector';
import { RoleLoginPage } from './components/role-login-page';
import { AdminDashboardEnhanced } from './components/admin-dashboard-enhanced';
import { EducatorDashboardNew } from './components/educator-dashboard-new';
import { CitizenDashboardNew } from './components/citizen-dashboard-new';
import { LegalExpertDashboardNew } from './components/legal-expert-dashboard-new';
import { AdminUsersPage } from './components/admin-users-page';
import { AdminContentPage } from './components/admin-content-page';
import { AdminAnalyticsPage } from './components/admin-analytics-page';
import { AdminLogsPage } from './components/admin-logs-page';

const ProtectedMainLayout = () => (
  <ProtectedRoute>
    <MainLayout />
  </ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: RoleSelector,
  },
  {
    path: '/login/citizen',
    Component: () => <RoleLoginPage role="citizen" />,
  },
  {
    path: '/login/educator',
    Component: () => <RoleLoginPage role="educator" />,
  },
  {
    path: '/login/legal-expert',
    Component: () => <RoleLoginPage role="legal_expert" />,
  },
  {
    path: '/signup',
    Component: SignupPageEnhanced,
  },
  {
    path: '/roles',
    Component: RoleInformationPanel,
  },
  {
    path: '/admin/login',
    Component: AdminLoginPage,
  },
  {
    path: '/admin/users',
    Component: () => {
      const { admin } = useAdminAuth();
      if (!admin) return <Navigate to="/admin/login" replace />;
      return <AdminUsersPage />;
    },
  },
  {
    path: '/admin/content',
    Component: () => {
      const { admin } = useAdminAuth();
      if (!admin) return <Navigate to="/admin/login" replace />;
      return <AdminContentPage />;
    },
  },
  {
    path: '/admin/analytics',
    Component: () => {
      const { admin } = useAdminAuth();
      if (!admin) return <Navigate to="/admin/login" replace />;
      return <AdminAnalyticsPage />;
    },
  },
  {
    path: '/admin/logs',
    Component: () => {
      const { admin } = useAdminAuth();
      if (!admin) return <Navigate to="/admin/login" replace />;
      return <AdminLogsPage />;
    },
  },
  {
    path: '/admin',
    Component: () => {
      const { admin } = useAdminAuth();
      if (!admin) return <Navigate to="/admin/login" replace />;
      return <Navigate to="/admin/dashboard" replace />;
    },
  },
  {
    path: '/admin/dashboard',
    Component: () => {
      const { admin } = useAdminAuth();
      if (!admin) return <Navigate to="/admin/login" replace />;
      return <AdminDashboardEnhanced />;
    },
  },

  {
    path: '/dashboard/educator',
    Component: () => (
      <RoleBasedRoute requiredRole="educator">
        <EducatorDashboardNew />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/dashboard/citizen',
    Component: () => (
      <RoleBasedRoute requiredRole="citizen">
        <CitizenDashboardNew />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/dashboard/legal-expert',
    Component: () => (
      <RoleBasedRoute requiredRole="legal_expert">
        <LegalExpertDashboardNew />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/',
    Component: ProtectedMainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'read', Component: ReadPage },
      { path: 'explore', Component: ExplorePage },
      { path: 'history', Component: HistoryPage },
      { path: 'preamble', Component: PreamblePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
