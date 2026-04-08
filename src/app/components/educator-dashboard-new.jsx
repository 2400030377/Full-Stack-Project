import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Button } from './ui/button';
import { BookOpen, Users, BarChart3, PlusCircle, LogOut, FileText, Trophy, MessageSquare, Clock } from 'lucide-react';

export function EducatorDashboardNew() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Content Created', value: '18', icon: FileText, color: '#2563EB' },
    { label: 'Students Taught', value: '156', icon: Users, color: '#2563EB' },
    { label: 'Quizzes Designed', value: '12', icon: Trophy, color: '#2563EB' },
    { label: 'Avg Rating', value: '4.8★', icon: BarChart3, color: '#2563EB' },
  ];

  const educationalContent = [
    {
      title: 'Create Educational Articles',
      description: 'Develop comprehensive articles on constitutional topics to educate citizens',
      features: ['Article Editor', 'Rich Text Format', 'Citation Management', 'Expert Review'],
      status: 'Active',
    },
    {
      title: 'Design Interactive Quizzes',
      description: 'Create assessments to evaluate student understanding of constitutional concepts',
      features: ['Quiz Builder', 'Multiple Question Types', 'Score Analytics', 'Certificate Generation'],
      status: 'Active',
    },
    {
      title: 'Facilitate Discussions',
      description: 'Moderate and lead educational discussions on constitutional topics',
      features: ['Discussion Forums', 'Question Moderation', 'Student Engagement', 'Expert Guidance'],
      status: 'Active',
    },
    {
      title: 'Track Student Progress',
      description: 'Monitor student learning outcomes and provide personalized feedback',
      features: ['Progress Dashboard', 'Performance Analytics', 'Individual Feedback', 'Class Reports'],
      status: 'Active',
    },
  ];

  const teachingMaterials = [
    {
      topic: 'Fundamental Rights',
      articles: 5,
      quizzes: 2,
      students: 89,
      rating: '4.9⭐',
    },
    {
      topic: 'Indian Judiciary System',
      articles: 3,
      quizzes: 1,
      students: 64,
      rating: '4.7⭐',
    },
    {
      topic: 'Constitutional Amendments',
      articles: 7,
      quizzes: 3,
      students: 112,
      rating: '4.8⭐',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F4FF' }}>
      {/* Header */}
      <header className="bg-white border-b-4 border-blue-600 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-4xl">📚</span>
              Educator Portal
            </h1>
            <p className="text-sm text-gray-600 mt-1">Create & Share Constitutional Knowledge</p>
          </div>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Role Description */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">🎯 Your Role as an Educator</h2>
          <p className="text-gray-800 leading-relaxed">
            As an educator, you play a crucial role in making constitutional knowledge accessible and engaging. You create educational content, design assessments, facilitate discussions, and guide students through their learning journey. Your expertise transforms complex constitutional concepts into clear, understandable lessons that empower citizens.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-t-4 hover:shadow-lg transition-shadow" style={{ borderColor: stat.color }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-600 text-sm font-semibold">{stat.label}</h3>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Teaching Materials */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            Your Teaching Materials
          </h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full">
              <thead className="bg-blue-50 border-b-2 border-blue-600">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Topic</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Articles</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Quizzes</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Students</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-900">Rating</th>
                </tr>
              </thead>
              <tbody>
                {teachingMaterials.map((material, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{material.topic}</td>
                    <td className="px-6 py-4 text-gray-700">{material.articles}</td>
                    <td className="px-6 py-4 text-gray-700">{material.quizzes}</td>
                    <td className="px-6 py-4 text-gray-700">{material.students}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{material.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Educational Features */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Educator Tools & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationalContent.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-600">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{feature.description}</p>
                <div className="space-y-2 mb-4">
                  {feature.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      {f}
                    </div>
                  ))}
                </div>
                <Button className="text-sm w-full" style={{ backgroundColor: '#2563EB', color: 'white' }}>
                  Access Tool →
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Professional Responsibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl">📖</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Quality Content Creation</h3>
                <p className="text-sm text-gray-600">Develop accurate, well-researched, and engaging educational materials</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl">👥</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Student Mentorship</h3>
                <p className="text-sm text-gray-600">Guide and support students through their constitutional learning journey</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl">⚖️</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Accurate Teaching</h3>
                <p className="text-sm text-gray-600">Ensure constitutional provisions are taught correctly and up-to-date</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl">💬</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Community Building</h3>
                <p className="text-sm text-gray-600">Foster inclusive discussions and support collaborative learning</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#2563EB', color: 'white' }}>
              <PlusCircle className="w-6 h-6" />
              Create Article
            </Button>
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#2563EB', color: 'white' }}>
              <Trophy className="w-6 h-6" />
              Design Quiz
            </Button>
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#2563EB', color: 'white' }}>
              <Users className="w-6 h-6" />
              Manage Students
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}