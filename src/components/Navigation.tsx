import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Moon, Sun, LogOut, Layout } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && window.location.hash === '#pricing') {
      setTimeout(() => {
        const element = document.getElementById('pricing');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const navLinks = [
    { name: 'Ecosystem', href: '/' },
    { name: 'Mission', href: '/about' },
    { name: 'Access', href: '/#pricing', isAnchor: true },
    { name: 'Support', href: '/faqs' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.isAnchor) {
      e.preventDefault();
      if (location.pathname === '/') {
        const element = document.getElementById('pricing');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById('pricing');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
      ? 'py-4'
      : 'py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-500 rounded-[2rem] px-6 py-2 ${isScrolled
          ? 'glassmorphism-premium dark:bg-slate-900/60 shadow-2xl border border-slate-100 dark:border-white/5'
          : 'bg-transparent'
          }`}>
          <div className="flex items-center justify-between h-12">
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center group-hover:bg-primary-500 transition-all duration-500 shadow-xl group-hover:rotate-12">
                <Sparkles className="w-6 h-6 text-white dark:text-slate-900 group-hover:text-white" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                Women<span className="text-primary-500">Preneur.</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${location.pathname === link.href || (link.isAnchor && location.pathname === '/' && window.location.hash === '#pricing')
                    ? 'text-primary-500'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-primary-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <Layout className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all group"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Launch App
                </Link>
              )}
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5 text-primary-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-900 dark:text-white p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 p-8 glassmorphism-premium rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6 animate-fadeIn shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  handleNavClick(e, link);
                  setIsOpen(false);
                }}
                className={`block text-lg font-bold tracking-wider uppercase transition-colors ${location.pathname === link.href || (link.isAnchor && location.pathname === '/' && window.location.hash === '#pricing')
                  ? 'text-primary-500'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary-500'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/10">
                <Link
                  to="/profile"
                  className="w-full px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl text-center block flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Layout className="w-5 h-5" />
                  App Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-8 py-4 bg-red-500 text-white rounded-2xl font-bold shadow-xl text-center block flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="w-full px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl text-center block"
                onClick={() => setIsOpen(false)}
              >
                Launch App
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
