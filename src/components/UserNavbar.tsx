import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Moon, Sun, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface UserNavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function UserNavbar({ darkMode, toggleDarkMode }: UserNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  const userRole = localStorage.getItem('userRole') || 'user';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // Get profile link based on role
  const getProfileLink = () => '/profile';

  // Role-specific navigation links
  const getNavLinks = () => {
    if (userRole === 'mentor') {
      return [
        { name: 'Connect', href: '/connect' },
      ];
    } else if (userRole === 'admin') {
      return [
        { name: 'Scheme Finder', href: '/scheme-finder' },
        { name: 'Storefront Builder', href: '/storefront' },
        { name: 'Grants', href: '/grants' },
        { name: 'Connect', href: '/connect' },
        { name: 'Finance Toolkit', href: '/finance' },
      ];
    } else {
      return [
        { name: 'Scheme Finder', href: '/scheme-finder' },
        { name: 'Storefront Builder', href: '/storefront' },
        { name: 'Grants', href: '/grants' },
        { name: 'Connect', href: '/connect' },
        { name: 'Finance Toolkit', href: '/finance' },
        { name: 'Skill Up', href: '/skill-up' },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={getProfileLink()} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center group-hover:rotate-6 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              WomenPreneur
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.name === 'Profile' && (location.pathname === '/profile' || location.pathname === '/mentor-profile' || location.pathname === '/admin-profile'));
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-small px-2 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-pink-600 dark:text-pink-300 bg-pink-50 dark:bg-pink-500/10 shadow-sm'
                      : 'text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-rose-50 dark:hover:bg-gray-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Clickable username and userRole */}
            <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-50 dark:bg-pink-500/10">
              <User className="w-4 h-4 text-pink-600 dark:text-pink-300" />
              <span className="text-sm font-medium text-pink-600 dark:text-pink-300">
                {username} ({userRole})
              </span>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.name === 'Profile' && (location.pathname === '/profile' || location.pathname === '/mentor-profile' || location.pathname === '/admin-profile'));
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block font-medium transition-colors ${isActive ? 'text-pink-500 dark:text-pink-400' : 'text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Clickable username and userRole */}
            <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-50 dark:bg-pink-500/10">
              <User className="w-4 h-4 text-pink-600 dark:text-pink-300" />
              <span className="text-sm font-medium text-pink-600 dark:text-pink-300">
                {username} ({userRole})
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
