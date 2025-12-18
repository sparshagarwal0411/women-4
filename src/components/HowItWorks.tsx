import { UserPlus, BookMarked, Rocket, ArrowDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up & Profile Setup',
    description: 'Create your account and tell us about your entrepreneurial goals'
  },
  {
    icon: BookMarked,
    title: 'Learn & Connect',
    description: 'Access courses, find mentors, and discover relevant schemes'
  },
  {
    icon: Rocket,
    title: 'Launch & Grow',
    description: 'Build your storefront, manage finances, and scale your business'
  }
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [ref, isInView] = useInView();
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={ref}
        className={`glassmorphism p-8 rounded-3xl text-center max-w-sm hover:scale-105 transition-all duration-500 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-6 shadow-xl">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <div className="w-12 h-12 mx-auto -mt-3 mb-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center font-bold text-2xl text-transparent bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text border-4 border-pink-200 dark:border-pink-500/30">
          {index + 1}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {step.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {step.description}
        </p>
      </div>

      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-16 transform -translate-y-1/2">
          <ArrowDown className="w-8 h-8 text-pink-400 rotate-[-90deg] animate-bounce" />
        </div>
      )}

      {index < steps.length - 1 && (
        <div className="lg:hidden my-6">
          <ArrowDown className="w-8 h-8 text-pink-400 animate-bounce" />
        </div>
      )}
    </div>
  );
}

export function HowItWorks() {
  const [ref, isInView] = useInView();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-purple-50/30 via-white to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Three simple steps to transform your entrepreneurial vision into reality
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
