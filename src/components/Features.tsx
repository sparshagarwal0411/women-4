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

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;

  return (
    <div className="glassmorphism p-8 rounded-3xl h-full border border-pink-200/50 dark:border-pink-500/30 group">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-pink-50/30 to-purple-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful modules designed to support your entrepreneurial journey from start to success
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
