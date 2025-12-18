import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';
import { User, Shield, Calendar, TrendingUp, Award, Settings, BarChart, Users, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminProfileProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function AdminProfile({ darkMode, toggleDarkMode }: AdminProfileProps) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin';
  const userRole = localStorage.getItem('userRole') || 'admin';

  useEffect(() => {
    // Redirect to login if not authenticated or not an admin
    if (!localStorage.getItem('username')) {
      navigate('/login');
    } else if (userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate, userRole]);

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234' },
    { icon: TrendingUp, label: 'Active Sessions', value: '89' },
    { icon: FileText, label: 'Schemes Listed', value: '156' },
    { icon: Calendar, label: 'Member Since', value: new Date().toLocaleDateString() },
  ];

  const adminFeatures = [
    { icon: Users, name: 'User Management', description: 'Manage users, mentors, and their profiles' },
    { icon: FileText, name: 'Content Management', description: 'Manage schemes, content, and resources' },
    { icon: BarChart, name: 'Analytics Dashboard', description: 'View platform analytics and insights' },
    { icon: Settings, name: 'System Settings', description: 'Configure platform settings and preferences' },
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
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome, {username}!
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300 mb-4">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="capitalize font-semibold">{userRole}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage the platform, oversee operations, and ensure everything runs smoothly for all users.
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
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

          {/* Admin Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Admin Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="glassmorphism rounded-2xl border border-pink-200/60 dark:border-pink-500/30 shadow-lg p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                          {feature.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

