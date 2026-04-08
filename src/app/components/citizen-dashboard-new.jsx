import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Button } from './ui/button';
import { BookOpen, Award, Users, TrendingUp, Download, Share2, LogOut, MessageSquare, Clock, Target, CheckCircle, Landmark, Calendar, Scale } from 'lucide-react';
import { useState } from 'react';
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";

export function CitizenDashboardNew() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Articles Read', value: '24', icon: BookOpen, color: '#059669' },
    { label: 'Quizzes Completed', value: '8', icon: Award, color: '#059669' },
    { label: 'Learning Points', value: '1,250', icon: TrendingUp, color: '#059669' },
    { label: 'Current Level', value: 'Intermediate', icon: Target, color: '#059669' },
  ];

  const constitutionTopics = [
    {
      title: 'Fundamental Rights (Articles 12-35)',
      section: 'Part III',
      description: 'Core rights guaranteed to all citizens including freedom of speech, equality before law, right to education, and right to life with dignity',
      subTopics: ['Freedom of Speech', 'Right to Equality', 'Right to Education', 'Constitutional Remedies'],
      status: 'In Progress',
    },
    {
      title: 'Directive Principles of State Policy',
      section: 'Part IV, Articles 36-51',
      description: 'Non-enforceable guidelines for state policy aimed at establishing social and economic justice and welfare',
      subTopics: ['Social Security', 'Environmental Protection', 'Labor Rights', 'Healthcare'],
      status: 'Not Started',
    },
    {
      title: 'Constitutional Structure & Government',
      section: 'Part V-VII',
      description: 'Understanding the three pillars: Parliament (Legislature), Executive under President/PM, and Independent Judiciary',
      subTopics: ['Lok Sabha', 'Rajya Sabha', 'Cabinet System', 'Supreme Court'],
      status: 'Completed',
    },
    {
      title: 'Constitutional Amendments',
      section: 'Article 368',
      description: 'How the Constitution can be amended, the amendment procedure, and major amendments affecting citizens rights',
      subTopics: ['Amendment Process', '42nd Amendment', '44th Amendment', 'Right to Privacy'],
      status: 'In Progress',
    },
  ];

  const learningPaths = [
    {
      title: 'Constitution Basics',
      progress: 65,
      lessons: '12/18',
      icon: '📖',
      description: 'Preamble, Fundamental Rights, Duties, Structure'
    },
    {
      title: 'Your Rights & Duties',
      progress: 80,
      lessons: '16/20',
      icon: '⚖️',
      description: 'Fundamental Rights, Legal Remedies, Citizenship'
    },
    {
      title: 'Government Structure',
      progress: 45,
      lessons: '9/20',
      icon: '🏛️',
      description: 'Parliament, Executive, Judiciary, Federal System'
    },
    {
      title: 'Amendments & Updates',
      progress: 30,
      lessons: '6/20',
      icon: '📝',
      description: 'Constitutional Amendments, Important Cases'
    },
  ];

  const responsibilities = [
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Stay informed about constitutional provisions, your rights, and civic duties through ongoing education',
    },
    {
      icon: '⚖️',
      title: 'Know Your Rights',
      description: 'Understand fundamental rights, legal remedies available through courts, and how to protect your rights',
    },
    {
      icon: '👥',
      title: 'Community Engagement',
      description: 'Participate in discussions, help others understand constitution, and build informed community',
    },
    {
      icon: '✊',
      title: 'Informed Participation',
      description: 'Exercise voting rights, participate in democratic processes, and hold government accountable',
    },
    {
      icon: '🤝',
      title: 'Social Responsibility',
      description: 'Uphold constitutional values, respect fundamental rights of others, and contribute to nation building',
    },
    {
      icon: '⚡',
      title: 'Civic Awareness',
      description: 'Spread constitutional awareness, combat misinformation, and promote constitutional values in society',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F8EF' }}>
      {/* Header */}
      <header className="bg-white border-b-4 border-green-600 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-4xl">👥</span>
              Citizen Portal
            </h1>
            <p className="text-sm text-gray-600 mt-1">Master the Constitution of India for Informed Citizenship</p>
          </div>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white border-t border-gray-200 px-6">
          <div className="max-w-7xl mx-auto flex gap-1 flex-wrap">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('preamble')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'preamble'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚖️ Preamble
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'explore'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Landmark className="w-4 h-4 inline mr-1" />
              Explore
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              History
            </button>
            <button
              onClick={() => setActiveTab('read')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'read'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-1" />
              Read
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <>
        {/* Role Description */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-600 p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">🎯 Your Role as a Citizen</h2>
          <p className="text-gray-800 leading-relaxed">
            As a citizen, your role is to develop comprehensive understanding of the Constitution of India. You can access detailed educational content about constitutional provisions, fundamental rights, government structure, and amendments. Through assessments and community participation, you'll become an informed citizen capable of exercising rights responsibly and contributing to strengthening democratic values.
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

        {/* Learning Paths */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            Your Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-3 text-center">{path.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-center">{path.title}</h3>
                <p className="text-xs text-gray-600 text-center mb-3">{path.description}</p>
                <p className="text-sm text-gray-700 font-semibold mb-3 text-center">{path.lessons} lessons</p>
                <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 text-center font-semibold">{path.progress}% complete</p>
              </div>
            ))}
          </div>
        </section>

        {/* Constitution Topics */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-green-600" />
            Key Constitutional Topics
          </h2>
          <div className="space-y-4">
            {constitutionTopics.map((topic, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-600">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{topic.title}</h3>
                    <p className="text-xs text-green-600 font-semibold mb-2">{topic.section}</p>
                    <p className="text-gray-700 text-sm mb-4">{topic.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.subTopics.map((subTopic, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          {subTopic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap ml-4"
                    style={{
                      backgroundColor:
                        topic.status === 'Completed'
                          ? '#059669'
                          : topic.status === 'In Progress'
                          ? '#2563EB'
                          : '#9CA3AF',
                    }}
                  >
                    {topic.status}
                  </span>
                </div>
                <Button className="text-sm" style={{ backgroundColor: '#059669', color: 'white' }}>
                  Continue Learning →
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border-t-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            Your Responsibilities as a Citizen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((resp, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{resp.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{resp.title}</h3>
                <p className="text-sm text-gray-600">{resp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#059669', color: 'white' }}>
              <BookOpen className="w-6 h-6" />
              Explore Articles
            </Button>
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#059669', color: 'white' }}>
              <Award className="w-6 h-6" />
              Take Quiz
            </Button>
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#059669', color: 'white' }}>
              <MessageSquare className="w-6 h-6" />
              Join Discussion
            </Button>
          </div>
        </section>
          </>
        )}

        {/* Preamble Tab */}
        {activeTab === 'preamble' && (
          <div className="space-y-8">
            {/* Emblem */}
            <div className="flex justify-center">
              <img src={emblemImage} alt="Government of India Emblem" className="w-32 h-32 object-contain" />
            </div>

            {/* Values Section */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Constitutional Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-3">⚖️</div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Justice</h3>
                  <p className="text-gray-700 text-sm">Social, economic, and political justice in a democratic society</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-3">🕊️</div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Liberty</h3>
                  <p className="text-gray-700 text-sm">Freedom of thought, expression, belief, faith and worship</p>
                </div>
                <div className="bg-orange-50 border-2 border-orange-600 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-3">🤝</div>
                  <h3 className="text-xl font-bold text-orange-800 mb-2">Equality</h3>
                  <p className="text-gray-700 text-sm">Equal status and opportunities for all citizens</p>
                </div>
                <div className="bg-purple-50 border-2 border-purple-600 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-3">👥</div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">Fraternity</h3>
                  <p className="text-gray-700 text-sm">Assuring dignity of individual and unity of nation</p>
                </div>
              </div>
            </section>

            {/* Preamble Text */}
            <section className="bg-white border-2 border-green-600 rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Preamble</h2>
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded text-center text-lg italic text-gray-800 mb-6 font-medium">
                <p className="mb-4">
                  WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN DEMOCRATIC REPUBLIC and to secure to all its citizens:
                </p>
                <p className="mb-4">
                  JUSTICE, social, economic and political;
                </p>
                <p className="mb-4">
                  LIBERTY of thought, expression, belief, faith and worship;
                </p>
                <p className="mb-4">
                  EQUALITY of status and of opportunity;
                </p>
                <p className="mb-6">
                  and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;
                </p>
                <p>
                  IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Adopted:</strong> 26th November 1949
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Came into force:</strong> 26th January 1950
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Total Members of Constituent Assembly:</strong> 389
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Explore Tab */}
        {activeTab === 'explore' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🏛️ Explore the Constitution</h2>
            
            {/* Committees */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Constitutional Committees</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-l-4 border-green-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Drafting Committee</h4>
                  <p className="text-gray-600 text-sm mb-3">Chaired by Dr. B. R. Ambedkar, responsible for drafting the Constitution</p>
                  <p className="text-xs text-gray-500">Members: 7 | Duration: 1947-1949</p>
                </div>
                <div className="bg-white border-l-4 border-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Union Constitution Committee</h4>
                  <p className="text-gray-600 text-sm mb-3">Chaired by Pandit Jawaharlal Nehru, dealt with powers and structure</p>
                  <p className="text-xs text-gray-500">Members: Primary | Duration: 1947-1949</p>
                </div>
                <div className="bg-white border-l-4 border-orange-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Provincial Constitution Committee</h4>
                  <p className="text-gray-600 text-sm mb-3">Chaired by Sardar Vallabhbhai Patel, dealt with provincial powers</p>
                  <p className="text-xs text-gray-500">Members: Primary | Duration: 1947-1949</p>
                </div>
                <div className="bg-white border-l-4 border-purple-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Fundamental Rights Committee</h4>
                  <p className="text-gray-600 text-sm mb-3">Chaired by Dr. B. R. Ambedkar, addressed fundamental rights</p>
                  <p className="text-xs text-gray-500">Members: 8 | Duration: 1947-1948</p>
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Constitutional Journey</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    <p className="text-sm text-green-600 font-semibold">9 December 1946</p>
                    <h4 className="text-lg font-bold text-gray-900">Constituent Assembly Convened</h4>
                    <p className="text-gray-600 text-sm">First meeting of the Constituent Assembly of India</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    <p className="text-sm text-blue-600 font-semibold">15 August 1947</p>
                    <h4 className="text-lg font-bold text-gray-900">Independence Day</h4>
                    <p className="text-gray-600 text-sm">India declared as a sovereign nation</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    <p className="text-sm text-orange-600 font-semibold">26 November 1949</p>
                    <h4 className="text-lg font-bold text-gray-900">Constitution Adopted</h4>
                    <p className="text-gray-600 text-sm">Constitution of India formally adopted by Constituent Assembly</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    <p className="text-sm text-purple-600 font-semibold">26 January 1950</p>
                    <h4 className="text-lg font-bold text-gray-900">Republic Day</h4>
                    <p className="text-gray-600 text-sm">Constitution came into force, India becomes a Republic</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📜 Constitutional History</h2>
            
            {/* Milestones */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Major Milestones</h3>
              <div className="space-y-4">
                <div className="bg-white border-l-4 border-green-600 p-6 rounded-lg shadow-md">
                  <p className="text-sm text-green-600 font-semibold">1947</p>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Independence & Constituent Assembly Formation</h4>
                  <p className="text-gray-600">India gained independence on August 15, 1947, and the Constituent Assembly was tasked with drafting the Constitution</p>
                </div>
                <div className="bg-white border-l-4 border-blue-600 p-6 rounded-lg shadow-md">
                  <p className="text-sm text-blue-600 font-semibold">1948-1949</p>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Constitution Drafting Phase</h4>
                  <p className="text-gray-600">The Constituent Assembly debated and drafted the Constitution through various committees and discussions</p>
                </div>
                <div className="bg-white border-l-4 border-orange-600 p-6 rounded-lg shadow-md">
                  <p className="text-sm text-orange-600 font-semibold">26 November 1949</p>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Constitution Adoption</h4>
                  <p className="text-gray-600">The Constitution of India was formally adopted by the Constituent Assembly</p>
                </div>
                <div className="bg-white border-l-4 border-purple-600 p-6 rounded-lg shadow-md">
                  <p className="text-sm text-purple-600 font-semibold">26 January 1950</p>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Constitution Implementation</h4>
                  <p className="text-gray-600">The Constitution came into effect, making India a Sovereign Democratic Republic</p>
                </div>
              </div>
            </section>

            {/* Presidents of India */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Presidents of India</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-green-600">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">🙋</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900">Dr. Rajendra Prasad</h4>
                    <p className="text-sm text-gray-600 mb-2">1st President</p>
                    <p className="text-xs text-gray-500">1950-1962 (12 years)</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-blue-600">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">🙋</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900">Dr. Sarvepalli Radhakrishnan</h4>
                    <p className="text-sm text-gray-600 mb-2">2nd President</p>
                    <p className="text-xs text-gray-500">1962-1967 (5 years)</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-orange-600">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">🙋</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900">Dr. Zakir Husain</h4>
                    <p className="text-sm text-gray-600 mb-2">3rd President</p>
                    <p className="text-xs text-gray-500">1967-1969 (2 years)</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Read Tab */}
        {activeTab === 'read' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📖 Read the Constitution</h2>
            
            {/* Parts Section */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Constitutional Parts</h3>
              <div className="space-y-3">
                <div className="bg-white border-l-4 border-green-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part I: The Union and its Territory</h4>
                  <p className="text-sm text-gray-600">Articles 1-4: Defines India as a Democratic Republic and its territory</p>
                </div>
                <div className="bg-white border-l-4 border-blue-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part II: Citizenship</h4>
                  <p className="text-sm text-gray-600">Articles 5-11: Defines citizenship of India and related provisions</p>
                </div>
                <div className="bg-white border-l-4 border-orange-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part III: Fundamental Rights</h4>
                  <p className="text-sm text-gray-600">Articles 12-35: Lists fundamental rights guaranteed to all citizens</p>
                </div>
                <div className="bg-white border-l-4 border-purple-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part IV: Directive Principles of State Policy</h4>
                  <p className="text-sm text-gray-600">Articles 36-51: Guidelines for state policy and governance</p>
                </div>
                <div className="bg-white border-l-4 border-pink-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part V: The Union</h4>
                  <p className="text-sm text-gray-600">Articles 52-151: Structure and powers of the Union Government</p>
                </div>
                <div className="bg-white border-l-4 border-red-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part VI: The States</h4>
                  <p className="text-sm text-gray-600">Articles 152-237: Structure and powers of State Governments</p>
                </div>
                <div className="bg-white border-l-4 border-cyan-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part VII: The Union Territories</h4>
                  <p className="text-sm text-gray-600">Articles 238-242: Administration of Union Territories</p>
                </div>
                <div className="bg-white border-l-4 border-yellow-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <h4 className="font-bold text-gray-900 mb-1">Part VIII: The Judiciary</h4>
                  <p className="text-sm text-gray-600">Articles 243-262: Structure and powers of the Judiciary</p>
                </div>
              </div>
            </section>

            {/* Schedules Section */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Constitutional Schedules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-t-4 border-green-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Schedule 1</h4>
                  <p className="text-sm text-gray-600">Lists and Territories of the States and Union Territories</p>
                </div>
                <div className="bg-white border-t-4 border-blue-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Schedule 2</h4>
                  <p className="text-sm text-gray-600">Emoluments and Allowances of Constitutional Authorities</p>
                </div>
                <div className="bg-white border-t-4 border-orange-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Schedule 3</h4>
                  <p className="text-sm text-gray-600">Forms of Oaths and Affirmations</p>
                </div>
                <div className="bg-white border-t-4 border-purple-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Schedule 4</h4>
                  <p className="text-sm text-gray-600">Allocation of Seats in the Council of States</p>
                </div>
                <div className="bg-white border-t-4 border-pink-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Schedule 5</h4>
                  <p className="text-sm text-gray-600">Provisions relating to Scheduled Areas and Scheduled Tribes</p>
                </div>
                <div className="bg-white border-t-4 border-red-600 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Schedule 6</h4>
                  <p className="text-sm text-gray-600">Provisions relating to Autonomous Districts and Autonomous Regions</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}