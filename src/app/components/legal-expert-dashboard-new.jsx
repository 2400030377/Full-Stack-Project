import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router';
import { useIndiaColors } from '../hooks/use-india-colors';
import { Button } from './ui/button';
import { BookOpen, Users, BarChart3, LogOut, FileText, Briefcase, MessageSquare, Scale, CheckCircle } from 'lucide-react';

export function LegalExpertDashboardNew() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const colors = useIndiaColors();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Legal Opinions', value: '34', icon: Briefcase, color: '#7C3AED' },
    { label: 'Questions Answered', value: '287', icon: MessageSquare, color: '#7C3AED' },
    { label: 'Articles Updated', value: '45', icon: FileText, color: '#7C3AED' },
    { label: 'Avg Rating', value: '4.9★', icon: BarChart3, color: '#7C3AED' },
  ];

  const legalGuidance = [
    {
      title: 'Constitutional Interpretation',
      description: 'Provide legal analysis and expert interpretation of constitutional provisions',
      expertise: ['Article Analysis', 'Supreme Court Decisions', 'Comparative Law', 'Constitutional History'],
      status: 'Expert',
    },
    {
      title: 'Landmark Case Studies',
      description: 'Document and explain important Supreme Court judgments affecting citizens',
      expertise: ['Case Summaries', 'Legal Precedents', 'Implications', 'Current Status'],
      status: 'Expert',
    },
    {
      title: 'Legal Guidance Portal',
      description: 'Answer citizen questions on constitutional rights and legal remedies',
      expertise: ['Constitutional Rights', 'Legal Procedures', 'Court Remedies', 'Dispute Resolution'],
      status: 'Expert',
    },
    {
      title: 'Content Validation',
      description: 'Review and validate constitutional content for legal accuracy',
      expertise: ['Content Review', 'Fact Checking', 'Legal Accuracy', 'Citation Verification'],
      status: 'Expert',
    },
  ];

  const cases = [
    {
      title: 'Kesavananda Bharati v. State of Kerala',
      year: '1973',
      significance: 'Established "Basic Structure" doctrine - limits constitutional amendment power',
      status: 'Landmark',
    },
    {
      title: 'Gopal Nath v. State of Punjab',
      year: '1967',
      significance: 'Ruled on Fundamental Rights vs. property rights - shaped future amendments',
      status: 'Landmark',
    },
    {
      title: 'Right to Privacy (Justice Puttaswamy)',
      year: '2017',
      significance: 'Recognized privacy as a fundamental right under Article 21',
      status: 'Recent',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F3FF' }}>
      {/* Header */}
      <header className="bg-white border-b-4 border-purple-600 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-4xl">⚖️</span>
              Legal Expert Portal
            </h1>
            <p className="text-sm text-gray-600 mt-1">Constitutional Law & Legal Expertise</p>
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
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">🎯 Your Role as a Legal Expert</h2>
          <p className="text-gray-800 leading-relaxed">
            As a legal expert, you provide authoritative constitutional interpretation and legal guidance. You update constitutional content with latest court decisions, answer complex legal questions, create case studies from landmark judgments, and validate content accuracy. Your expertise establishes constitutional understanding on firm legal foundations and helps citizens understand their legal rights and remedies.
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

        {/* Landmark Cases */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Scale className="w-8 h-8 text-purple-600" />
            Landmark Constitutional Cases
          </h2>
          <div className="space-y-4">
            {cases.map((caseItem, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-600">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{caseItem.title}</h3>
                    <p className="text-sm text-purple-600 font-semibold">{caseItem.year}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{
                      backgroundColor: caseItem.status === 'Landmark' ? '#7C3AED' : '#2563EB',
                    }}
                  >
                    {caseItem.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{caseItem.significance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Expertise Areas */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-purple-600" />
            Areas of Legal Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalGuidance.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-600">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                <div className="space-y-2 mb-4">
                  {item.expertise.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-purple-600 rounded-full" />
                      {ex}
                    </div>
                  ))}
                </div>
                <Button className="text-sm w-full" style={{ backgroundColor: '#7C3AED', color: 'white' }}>
                  Manage Content →
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Constitutional Knowledge Areas */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8 border-t-4 border-purple-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-purple-600" />
            Constitutional Knowledge Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Fundamental Rights & Duties',
              'Directive Principles of State Policy',
              'Supreme Court Interpretations',
              'Constitutional Amendments',
              'Judicial Precedents',
              'Access to Justice',
              'Administrative Law',
              'Electoral Commission',
              'Right to Information',
            ].map((area, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="font-medium text-gray-900">{area}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Responsibilities */}
        <section className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-8 mb-8 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Professional Responsibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">⚖️</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Legal Accuracy</h3>
                <p className="text-sm text-gray-700">Ensure all constitutional content is legally accurate and supported by reliable sources</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Content Updates</h3>
                <p className="text-sm text-gray-700">Keep constitutional information current with latest court decisions and amendments</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">👥</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Legal Guidance</h3>
                <p className="text-sm text-gray-700">Provide expert answers to constitutional questions and help people understand their rights</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🔍</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Content Validation</h3>
                <p className="text-sm text-gray-700">Review and validate content created by others to maintain legal standards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#7C3AED', color: 'white' }}>
              <FileText className="w-6 h-6" />
              Update Content
            </Button>
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#7C3AED', color: 'white' }}>
              <MessageSquare className="w-6 h-6" />
              Answer Questions
            </Button>
            <Button className="h-24 text-lg flex items-center justify-center gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#7C3AED', color: 'white' }}>
              <Scale className="w-6 h-6" />
              View Cases
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}