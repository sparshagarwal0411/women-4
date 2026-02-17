import { useEffect } from 'react';
import { Sparkles, ArrowRight, FileText, TrendingUp, Award, Users, GraduationCap, Layout, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Impact } from '../components/Impact';
import { Contact } from '../components/Contact';
import { Pricing } from '../components/Pricing';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const wins = [
  { label: "Revenue Lift", value: "38%" },
  { label: "Communities", value: "120+" },
  { label: "Advised Hours", value: "48K" },
  { label: "Women Empowered", value: "25K+" },
];

interface HomeProps {
  darkMode: boolean;
}

export function Home({ darkMode }: HomeProps) {
  const { user, profile } = useAuth();

  useEffect(() => {
    if (window.location.hash === '#pricing') {
      setTimeout(() => {
        const element = document.getElementById('pricing');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  if (user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2"
            >
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Entrepreneur'}!
            </motion.h1>
            <p className="text-slate-600 dark:text-gray-400">
              Here's what we've curated for your {profile?.business_about || 'venture'} today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recommendations Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Schemes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphism-premium rounded-3xl p-8 border border-pink-100 dark:border-white/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Schemes</h2>
                  </div>
                  <Link to="/scheme-finder" className="text-sm font-semibold text-primary-500 hover:text-primary-600 flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-pink-300 transition-colors cursor-pointer group relative">
                    <div className="absolute -top-3 -right-3 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-[10px] font-bold text-white shadow-lg flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI INSIGHT
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500">Mudra Loan for {profile?.business_about || 'Women'}</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2">Get up to ₹10 Lakhs for your {profile?.business_about || 'business'} growth with minimal documentation.</p>
                    <p className="mt-3 text-[11px] text-pink-500 dark:text-pink-400 font-bold bg-pink-50 dark:bg-pink-500/10 p-2 rounded-lg border border-pink-100 dark:border-pink-500/20">
                      Aura's Tip: Perfect for your scaling phase! Matches your focus on {profile?.business_about || 'expansion'}.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-pink-300 transition-colors cursor-pointer group">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500">Stand-Up India Expansion</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2">Funding specifically targeted at SC/ST and women entrepreneurs for greenfield ventures.</p>
                  </div>
                </div>
              </motion.div>

              {/* AI Growth Strategy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-primary-500 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      AI Powered Strategy
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Your Next Move for {profile?.business_about || 'Success'}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <TrendingUp className="w-6 h-6 text-primary-400 mb-3" />
                      <h4 className="font-bold mb-1">Scale Strategy</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Focus on digital storefront automation to handle 3x volume.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <Users className="w-6 h-6 text-blue-400 mb-3" />
                      <h4 className="font-bold mb-1">Network Expansion</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Connect with 3 mentors in the {profile?.business_about || 'tech'} sector.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <Award className="w-6 h-6 text-yellow-400 mb-3" />
                      <h4 className="font-bold mb-1">Skill Milestone</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Complete the Finance module to unlock series A grants.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Learning Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glassmorphism-premium rounded-3xl p-8 border border-blue-100 dark:border-white/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Skill Up Progress</h2>
                  </div>
                  <Link to="/skill-up" className="text-sm font-semibold text-primary-500 hover:text-primary-600 flex items-center gap-1">
                    Keep Learning <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-100 dark:border-white/10">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Scale Your {profile?.business_about || 'Business'}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">Complete your foundation course to unlock advanced mentorship.</p>
                  <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <div className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">45% COMPLETE</div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Stats & Quick Links */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glassmorphism-premium rounded-3xl p-8 border border-slate-100 dark:border-white/5"
              >
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Network Highlights</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
                      <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop" alt="Mentor" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Priya Sharma</p>
                      <p className="text-xs text-slate-500">Expert in {profile?.business_about || 'Scale'}</p>
                    </div>
                    <Link to="/connect" className="ml-auto text-primary-500 hover:text-primary-600 font-bold text-xs">Chat</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                      <Layout className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Storefront Built</p>
                      <p className="text-xs text-slate-500">Ready for Launch</p>
                    </div>
                    <Link to="/storefront" className="ml-auto text-primary-500 hover:text-primary-600 font-bold text-xs">Edit</Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900 dark:bg-white rounded-3xl p-8 text-white dark:text-slate-900 shadow-xl"
              >
                <h2 className="text-lg font-bold mb-2">Need Guidance?</h2>
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">Book a 1:1 session with a mentor specializing in {profile?.business_about || 'digital tools'}.</p>
                <Link to="/connect" className="inline-flex items-center gap-2 font-bold text-primary-400 dark:text-primary-600 group">
                  Book Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero darkMode={darkMode} />
      <section className="px-6 -mt-16 md:-mt-24 relative z-20">
        <div className="max-w-6xl mx-auto glassmorphism-premium rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
          <div className="bg-slate-900 dark:bg-white px-8 py-4 flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-white dark:text-slate-900 transition-colors">
            <Sparkles className="w-4 h-4 text-primary-400" />
            Latest Ecosystem Outcomes
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-white/5">
            {wins.map((item) => (
              <div key={item.label} className="p-8 flex flex-col items-start group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-500">
                <div className="text-3xl font-display font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {item.value}
                </div>
                <div className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="features" className="pt-20">
        <Features />
      </div>

      <div id="how-it-works" className="py-20 bg-white dark:bg-surface-dark transition-colors duration-500">
        <HowItWorks />
      </div>

      <div id="community">
        <Impact />
      </div>

      <div id="pricing" className="py-20 bg-slate-50 dark:bg-surface-dark transition-colors duration-500">
        <Pricing />
      </div>

      <section className="px-6 py-20 relative overflow-hidden bg-white dark:bg-surface-dark transition-colors duration-500">
        <div className="max-w-6xl mx-auto glassmorphism-premium rounded-[3rem] border border-slate-100 dark:border-white/10 shadow-2xl p-12 md:p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary-500 mb-4">Spotlight</p>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white leading-[1.1]">
                Why <span className="text-gradient">WomenPreneur</span> Exists.
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-6 leading-relaxed">
                We're more than a toolkit. We're a mission-driven movement dedicated to bridging the gender gap in digital entrepreneurship.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xl hover:scale-105 active:scale-95 transition-all text-center"
              >
                Our Mission
              </Link>
              <Link
                to="/faqs"
                className="px-8 py-4 rounded-full glassmorphism border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center"
              >
                Ecosystem FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
}


