import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Button } from './ui/button';
import { BookOpen, Users, BarChart3, PlusCircle, LogOut } from 'lucide-react';

export function EducatorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const educatorStats = [
    { label: 'Articles Created', value: '24', icon: BookOpen },
    { label: 'Quizzes Published', value: '12', icon: BarChart3 },
    { label: 'Students Engaged', value: '1,230', icon: Users },
    { label: 'Avg. Rating', value: '4.8★', icon: BookOpen },
  ];

  const educatorFeatures = [
    {
      title: 'Content Creation',
      description: 'Create comprehensive educational articles and learning materials.',
      features: [
        'Write rich-text articles',
        'Add images and multimedia',
        'Create article series',
        'Schedule publication',
        'View content analytics',
      ]
    },
    {
      title: 'Interactive Quizzes',
      description: 'Design engaging quizzes to test student understanding.',
      features: [
        'Create multiple choice quizzes',
        'Set difficulty levels',
        'Track student performance',
        'Auto-generate certificates',
        'View quiz analytics',
      ]
    },
    {
      title: 'Discussion Facilitation',
      description: 'Host and moderate interactive learning discussions.',
      features: [
        'Create discussion forums',
        'Moderate discussions',
        'Pin important answers',
        'Provide expert guidance',
        'Track engagement metrics',
      ]
    },
    {
      title: 'Student Management',
      description: 'Monitor and support student progress and learning.',
      features: [
        'View student progress',
        'Provide personalized feedback',
        'Send learning notifications',
        'Create student groups',
        'Generate progress reports',
      ]
    },
  ];

  return (
    <div style={{ backgroundColor: colors.background }} className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-8 h-8" style={{ color: colors.primary }} />
                Educator Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">Create & Share Educational Content</p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Educator Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {educatorStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: colors.primary }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <Icon className="w-10 h-10" style={{ color: colors.primary, opacity: 0.2 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Educator Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Educator Capabilities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {educatorFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="inline-block w-2 h-2 rounded-full mt-1" style={{ backgroundColor: colors.primary }}></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Create New Content */}
        <div className="mt-8 bg-gradient-to-r p-6 rounded-lg shadow-md text-white" style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, #1a5490 100%)` }}>
          <h3 className="text-xl font-bold mb-4">Create New Content</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Write Article
            </Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Quiz
            </Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Start Discussion
            </Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              My Analytics
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
