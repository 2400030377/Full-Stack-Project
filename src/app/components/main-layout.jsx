import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Search, ChevronDown, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import emblemImage from "figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png";
import { useIndiaColors } from "../hooks/use-india-colors";
import { useAuth } from "../contexts/auth-context";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", nativeName: "ଓଡିଆ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्" }
];

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const colors = useIndiaColors();

  const navLinks = [
    { label: "Read", path: "/read" },
    { label: "Explore", path: "/explore" },
    { label: "History", path: "/history" },
    { label: "Preamble", path: "/preamble" }
  ];

  const isActive = (path) => location.pathname === path;
  const currentLanguage = LANGUAGES.find((lang) => lang.code === selectedLanguage) || LANGUAGES[0];
  const textColor = colors.primary;

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!languageMenuRef.current?.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (!userMenuRef.current?.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setIsLanguageDropdownOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/read?q=${encodeURIComponent(query)}` : "/read");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-body)",
        backgroundColor: colors.background
      }}
    >
      <div className="h-1 flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <header className="border-b border-gray-200 bg-white/95 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 sm:w-14 sm:h-14">
                  <img src={emblemImage} alt="State Emblem of India" className="w-full h-full object-contain" />
                </div>
                <div style={{ fontFamily: "var(--font-serif)" }}>
                  <div className="text-xs sm:text-sm text-gray-600">Constitution of</div>
                  <div className="font-semibold text-base sm:text-lg leading-tight">India</div>
                </div>
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      type="button"
                      aria-label="User menu"
                      onClick={() => setIsUserMenuOpen((open) => !open)}
                      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": `${textColor}55` }}
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm font-medium text-gray-700">
                        {user.fullName}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {user.role && (
                            <p className="text-xs text-gray-600 capitalize mt-1">Role: {user.role.replace('_', ' ')}</p>
                          )}
                        </div>
                        {user.role && (
                          <button
                            onClick={() => {
                              const dashboardMap = {
                                admin: '/admin/dashboard',
                                educator: '/dashboard/educator',
                                citizen: '/dashboard/citizen',
                                legal_expert: '/dashboard/legal-expert',
                              };
                              navigate(dashboardMap[user.role] || '/');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2 border-b border-gray-100"
                          >
                            <span>📊</span>
                            Dashboard
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="px-3 py-2 text-sm font-medium text-white rounded-md transition-colors"
                    style={{ backgroundColor: textColor }}
                  >
                    Sign In
                  </Link>
                )}
              </div>

              <div className="relative" ref={languageMenuRef}>
                <button
                  type="button"
                  aria-label="Change language"
                  onClick={() => setIsLanguageDropdownOpen((open) => !open)}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": `${textColor}55` }}
                >
                  <span style={{ fontFamily: "var(--font-body)" }}>{currentLanguage.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        type="button"
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                          selectedLanguage === lang.code ? "bg-gray-100" : ""
                        }`}
                      >
                        <div style={{ fontFamily: "var(--font-body)" }}>
                          <div className="font-medium text-gray-900">{lang.name}</div>
                          <div className="text-sm text-gray-600">{lang.nativeName}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <nav className="flex flex-wrap gap-1 sm:gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm sm:text-base transition-colors ${
                      isActive(link.path) ? "text-white" : "text-gray-800 hover:bg-gray-100"
                    }`}
                    style={{
                      fontFamily: "var(--font-serif)",
                      backgroundColor: isActive(link.path) ? textColor : undefined
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search articles, parts, schedules"
                  aria-label="Search constitution content"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white"
                  style={{
                    fontFamily: "var(--font-body)",
                    "--tw-ring-color": `${textColor}55`,
                    boxShadow: "none"
                  }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div style={{ fontFamily: "var(--font-serif)" }} className="text-gray-600 text-sm">
              © 2026 Constitution of India. Public information portal.
            </div>
            <div className="flex gap-5" style={{ fontFamily: "var(--font-serif)" }}>
              <a href="#" className="text-gray-600 hover:text-[#000080] text-sm">About</a>
              <a href="#" className="text-gray-600 hover:text-[#000080] text-sm">Contact</a>
              <a href="#" className="text-gray-600 hover:text-[#000080] text-sm">Accessibility</a>
              <Link to="/roles" className="text-gray-600 hover:text-[#000080] text-sm">Platform Roles</Link>
              <Link to="/admin/login" className="text-gray-400 hover:text-gray-600 text-xs">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export {
  MainLayout
};
