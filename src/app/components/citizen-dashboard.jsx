import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Button } from './ui/button';
import { Users, BookMarked, MessageCircle, TrendingUp, LogOut } from 'lucide-react';

export function CitizenDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const citizenStats = [
    { label: 'Articles Read', value: '45', icon: BookMarked },
    { label: 'Quizzes Completed', value: '12', icon: TrendingUp },
    { label: 'Learning Points', value: '2,340', icon: TrendingUp },
    { label: 'Current Level', value: 'Intermediate', icon: Users },
  ];

  const citizenFeatures = [
    {
      title: 'Explore Constitution',
      description: 'Access comprehensive content about the Indian Constitution and legislative framework.',
      features: [
        'Read constitutional text',
        'Browse articles by topic',
        'Search content',
        'View amendments',
        'Read expert explanations',
      ]
    },
    {
      title: 'Interactive Learning',
      description: 'Test your knowledge with engaging quizzes and earn certificates.',
      features: [
        'Take topic-based quizzes',
        'Track quiz scores',
        'Earn badges and certificates',
        'Compare with leaderboard',
        'Review quiz answers',
      ]
    },
    {
      title: 'Community Engagement',
      description: 'Participate in discussions and learn from fellow citizens and experts.',
      features: [
        'Join discussion forums',
        'Ask questions',
        'Share insights',
        'Follow experts',
        'Build community connections',
      ]
    },
    {
      title: 'Learning Progress',
      description: 'Track your constitutional awareness journey with personalized insights.',
      features: [
        'View learning dashboard',
        'Track progress metrics',
        'Get learning recommendations',
        'Bookmark articles',
        'View learning statistics',
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
                <Users className="w-8 h-8" style={{ color: colors.primary }} />
                Citizen Portal
              </h1>
              <p className="text-sm text-gray-600 mt-1">Learn About Indian Constitution</p>
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
        {/* Citizen Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {citizenStats.map((stat, index) => {
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

        {/* Citizen Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Citizen Features</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {citizenFeatures.map((feature, index) => (
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

        {/* Learning Resources */}
        <div className="mt-8 bg-gradient-to-r p-6 rounded-lg shadow-md text-white" style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, #1a5490 100%)` }}>
          <h3 className="text-xl font-bold mb-4">Start Your Learning Journey</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-100">Browse Articles</Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">Take Quiz</Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">Join Discussion</Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">My Progress</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
