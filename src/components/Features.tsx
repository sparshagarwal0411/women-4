import { BookOpen, Globe, Handshake } from 'lucide-react';
import { useInView } from '../hooks/useInView';

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

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [ref, isInView] = useInView();
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`glassmorphism p-8 rounded-3xl hover:scale-105 transition-all duration-500 group ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
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
  const [ref, isInView] = useInView();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-pink-50/30 to-purple-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful modules designed to support your entrepreneurial journey from start to success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
