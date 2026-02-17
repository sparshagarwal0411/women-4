import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserNavbar } from './UserNavbar';
import { Footer } from './Footer';
import { AIAssistant } from './AIAssistant';

interface ProtectedRouteProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function ProtectedRoute({ children, darkMode, toggleDarkMode }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <UserNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {children}
      <Footer />
      <AIAssistant />
    </div>
  );
}

