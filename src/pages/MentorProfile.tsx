import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';
import { User, Shield, Calendar, TrendingUp, Award, Users, MessageCircle, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { MentorshipNetwork } from './MentorshipNetwork';

interface MentorProfileProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function MentorProfile({ darkMode, toggleDarkMode }: MentorProfileProps) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Mentor';
  const userRole = localStorage.getItem('userRole') || 'mentor';

  useEffect(() => {
    // Redirect to login if not authenticated or not a mentor
    if (!localStorage.getItem('username')) {
      navigate('/login');
    } else if (userRole !== 'mentor') {
      navigate('/login');
    }
  }, [navigate, userRole]);

  const stats = [
    { icon: Users, label: 'Mentees', value: '12' },
    { icon: MessageCircle, label: 'Sessions Completed', value: '48' },
    { icon: Award, label: 'Rating', value: '4.9/5' },
    { icon: Calendar, label: 'Member Since', value: new Date().toLocaleDateString() },
  ];

  const quickLinks = [
    { name: 'Connect Hub', href: '/connect', description: 'Access Community feed and Mentorship in one place' },
    { name: 'Mentorship Network', href: '/mentorship', description: 'Chat with mentees and manage 1:1 sessions' },
    { name: 'My Mentees', href: '/mentorship', description: 'View and manage your mentees' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <UserNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 shadow-xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome, {username}!
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300 mb-4">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span className="capitalize font-semibold">{userRole}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Guide and mentor aspiring entrepreneurs on their journey to success. Share your expertise and make a difference.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glassmorphism rounded-2xl border border-pink-200/60 dark:border-pink-500/30 shadow-lg p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="block glassmorphism rounded-2xl border border-pink-200/60 dark:border-pink-500/30 shadow-lg p-6 hover:scale-105 transition-all duration-300 group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {link.description}
                    </p>
                    <div className="mt-4 text-purple-500 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                      Access →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mentorship Network Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 shadow-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Connect
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Go to the Connect hub to access Community and Mentorship in one place.
            </p>
            <Link
              to="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Go to Connect
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

