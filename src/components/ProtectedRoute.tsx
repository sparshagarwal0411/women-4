import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserNavbar } from './UserNavbar';
import { Footer } from './Footer';

interface ProtectedRouteProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function ProtectedRoute({ children, darkMode, toggleDarkMode }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!localStorage.getItem('username')) {
      navigate('/login');
    }
  }, [navigate]);

  // Don't render if not authenticated
  if (!localStorage.getItem('username')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <UserNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {children}
      <Footer />
    </div>
  );
}

