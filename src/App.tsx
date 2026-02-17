import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { StickyButtons } from './components/StickyButtons';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { SchemeFinder } from './pages/SchemeFinder';
import { StorefrontBuilder } from './pages/StorefrontBuilder';
import { MentorMentorship } from './pages/MentorMentorship';
import { MentorshipNetwork } from './pages/MentorshipNetwork';
import { Connect } from './pages/Connect';
import { Community } from './pages/Community';
import { Grants } from './pages/Grants';
import FinanceToolkit from './pages/FinanceToolkit';
import { SkillUp } from './pages/SkillUp';
import Login from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { MentorProfile } from './pages/MentorProfile';
import { AdminProfile } from './pages/AdminProfile';
import FAQs from './pages/faqs';
import MoneyMap from './pages/loanmonitor';
import About from './pages/About';
import CompleteProfile from './pages/CompleteProfile';
import { AuthCallback } from './pages/AuthCallback';
import { useAuth } from './hooks/useAuth';
import { UserNavbar } from './components/UserNavbar';
import { AIAssistant } from './components/AIAssistant';
import ScrollToTop from './components/ScrollToTop';

function HomeWrapper({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <>
      {user ? (
        <UserNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      ) : (
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <Home darkMode={darkMode} />
      <Footer />
      {user && <AIAssistant />}
      {!user && <StickyButtons />}
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/login" element={
            <>
              <Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <StickyButtons />
            </>
          } />
          <Route path="/complete-profile" element={
            <>
              <CompleteProfile darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <StickyButtons />
            </>
          } />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/profile" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/mentor-profile" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <MentorProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin-profile" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AdminProfile />
            </ProtectedRoute>
          } />
          <Route path="/scheme-finder" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <SchemeFinder />
            </ProtectedRoute>
          } />
          <Route path="/storefront" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <StorefrontBuilder />
            </ProtectedRoute>
          } />
          <Route path="/grants" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Grants />
            </ProtectedRoute>
          } />
          <Route path="/connect" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Connect />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Community />
            </ProtectedRoute>
          } />
          <Route path="/mentorship" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <MentorshipNetwork />
            </ProtectedRoute>
          } />
          <Route path="/mentor-mentorship" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <MentorMentorship />
            </ProtectedRoute>
          } />

          <Route path="/finance" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <FinanceToolkit />
            </ProtectedRoute>
          } />
          <Route path="/skill-up" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <SkillUp />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <HomeWrapper darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          } />
          <Route path="/faqs" element={
            <>
              <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <FAQs />
              <Footer />
              <StickyButtons />
            </>
          } />
          <Route path="/loan-monitor" element={
            <>
              <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <MoneyMap />
              <Footer />
              <StickyButtons />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <About />
              <Footer />
              <StickyButtons />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
