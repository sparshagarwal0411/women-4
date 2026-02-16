import { BookOpen, Globe, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCarousel from './TiltCarousel';

const features = [
  {
    icon: BookOpen,
    title: 'Learning Hub',
    description: 'Access comprehensive courses, tutorials, and resources designed specifically for women entrepreneurs'
  },
  {
    icon: Globe,
    title: 'Multilingual Design',
    description: 'Access the platform in multiple languages to ensure inclusivity and ease of use'
  },
  {
    icon: Handshake,
    title: 'Mentorship',
    description: 'Get personalized guidance from experienced entrepreneurs and industry experts'
  }
];

export function Features() {
  return (
    <section className="py-32 px-6 bg-slate-50 dark:bg-surface-dark transition-colors duration-500 overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glassmorphism-premium border border-primary-200/50 dark:border-primary-500/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300">Feature Modules</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 text-slate-900 dark:text-white">
            Everything You Need <br /><span className="text-gradient">to Succeed.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Powerful tools and immersive modules designed to support your entrepreneurial journey from inception to industry-leading success.
          </p>
        </motion.div>

        <TiltCarousel>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </TiltCarousel>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;

  return (
    <div className="glassmorphism-premium p-10 rounded-[2.5rem] h-full border border-slate-100 dark:border-white/5 group transition-all duration-500 hover:shadow-2xl">
      <div className="w-20 h-20 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mb-10 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-xl group-hover:rotate-6">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-display font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
        {feature.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
        {feature.description}
      </p>

      <div className="mt-8 flex items-center gap-2 text-primary-500 font-bold text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        Discover Module <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}

import { Sparkles, ArrowRight } from 'lucide-react';
