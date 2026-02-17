import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Calendar, TrendingUp, Award, Crown, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export function UserProfile() {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Username and role from localStorage or profile
  // Username and role derived from profile
  const username = profile?.full_name || 'Entrepreneur';
  const userRole = profile?.role || 'user';
  const subscription = localStorage.getItem('subscription') || 'free'; // Subscription still uses local/db hybrid for demo
  const isPro = subscription === 'pro';

  // Real-time clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading && !profile) {
      navigate('/login');
    }
  }, [profile, loading, navigate]);

  // Dynamic stats calculation
  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
  const schemesApplied = JSON.parse(localStorage.getItem('appliedSchemes') || '[]');

  const stats = [
    { icon: TrendingUp, label: 'Schemes Applied', value: schemesApplied.length.toString() },
    { icon: Award, label: 'Courses Enrolled', value: enrolledCourses.length.toString() },
    {
      icon: Clock,
      label: 'Local Time',
      value: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    },
  ];

  const quickLinks = [
    { name: 'Scheme Finder', href: '/scheme-finder', description: 'Discover government schemes and grants' },
    { name: 'Storefront Builder', href: '/storefront', description: 'Create your digital storefront' },
    { name: 'Mentorship Network', href: '/connect', description: 'Connect with other users and experienced mentors' },
    { name: 'Finance Toolkit', href: '/finance', description: 'Manage your finances and track expenses' },
    { name: 'Skill Up', href: '/skill-up', description: 'Enhance your skills with expert-led courses' },
    { name: 'Grants', href: '/grants', description: 'Explore available grants for your business' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome, {username}!
                  </h1>
                  <div className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-pink-100 dark:border-white/5 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300 mb-4 flex-wrap">
                  <Shield className="w-5 h-5 text-pink-500" />
                  <span className="capitalize">{userRole}</span>
                  {isPro && (
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Pro Member
                    </span>
                  )}
                </div>
                {profile?.business_about && (
                  <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 font-medium">
                    Sector: <span className="text-pink-600 dark:text-pink-400">{profile.business_about}</span>
                  </p>
                )}
                <p className="text-gray-600 dark:text-gray-300">
                  You're currently in the <span className="font-bold underline decoration-pink-500 decoration-2">{profile?.business_level || 'Exploration'}</span> phase of your journey. Aura is ready to assist you!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glassmorphism rounded-2xl border border-pink-200/60 dark:border-pink-500/30 shadow-lg p-6 group hover:border-pink-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
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
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Quick Access
              </h2>
              <Link to="/home" className="text-sm text-pink-500 hover:underline">Back to Dashboard</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {link.description}
                    </p>
                    <div className="mt-4 text-pink-500 dark:text-pink-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                      Access →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

