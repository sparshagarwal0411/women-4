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
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/login" element={
            <>
              <Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <StickyButtons />
            </>
          } />
          <Route path="/profile" element={
            <>
              <UserProfile darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <StickyButtons />
            </>
          } />
          <Route path="/mentor-profile" element={
            <>
              <MentorProfile darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <StickyButtons />
            </>
          } />
          <Route path="/admin-profile" element={
            <>
              <AdminProfile darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <StickyButtons />
            </>
          } />
          <Route path="/scheme-finder" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <SchemeFinder />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/storefront" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <StorefrontBuilder />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/grants" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Grants />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/connect" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Connect />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Community />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/mentorship" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <MentorshipNetwork />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/mentor-mentorship" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <MentorMentorship />
              <StickyButtons />
            </ProtectedRoute>
          } />

          <Route path="/finance" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <FinanceToolkit />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/skill-up" element={
            <ProtectedRoute darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <SkillUp />
              <StickyButtons />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <>
              <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <Home />
              <Footer />
              <StickyButtons />
            </>
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
