import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Button } from './ui/button';
import { Scale, FileText, AlertCircle, Users, LogOut } from 'lucide-react';

export function LegalExpertDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const expertStats = [
    { label: 'Legal Opinions', value: '87', icon: FileText },
    { label: 'Questions Answered', value: '234', icon: Users },
    { label: 'Content Updates', value: '45', icon: AlertCircle },
    { label: 'Expertise Rating', value: '4.9★', icon: Scale },
  ];

  const expertFeatures = [
    {
      title: 'Constitutional Content Management',
      description: 'Update and enhance constitutional content with legal expertise and historical context.',
      features: [
        'Update article content',
        'Add legal interpretations',
        'Provide historical context',
        'Add case law references',
        'Update judgments and rulings',
      ]
    },
    {
      title: 'Legal Guidance',
      description: 'Provide expert legal insights and answer constitutional questions.',
      features: [
        'Answer user questions',
        'Provide legal opinions',
        'Explain court judgments',
        'Offer guidance on rights',
        'Clarify legal procedures',
      ]
    },
    {
      title: 'Expert Resources',
      description: 'Create and manage comprehensive legal resources and reference materials.',
      features: [
        'Create case studies',
        'Add landmark judgments',
        'Compile legal precedents',
        'Create research papers',
        'Manage legal databases',
      ]
    },
    {
      title: 'Community Support',
      description: 'Engage with users and provide expert-level constitutional guidance.',
      features: [
        'Moderate legal discussions',
        'Answer complex questions',
        'Validate user submissions',
        'Provide expert reviews',
        'Guide legal learning',
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
                <Scale className="w-8 h-8" style={{ color: colors.primary }} />
                Legal Expert Panel
              </h1>
              <p className="text-sm text-gray-600 mt-1">Constitutional Legal Expertise & Guidance</p>
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
        {/* Expert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {expertStats.map((stat, index) => {
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

        {/* Expert Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Legal Expert Capabilities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {expertFeatures.map((feature, index) => (
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

        {/* Legal Tools */}
        <div className="mt-8 bg-gradient-to-r p-6 rounded-lg shadow-md text-white" style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, #1a5490 100%)` }}>
          <h3 className="text-xl font-bold mb-4">Legal Tools & Resources</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-100">Pending Questions</Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">Update Content</Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">Legal Database</Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">My Contributions</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
