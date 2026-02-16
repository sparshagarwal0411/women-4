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

export function HowItWorks() {
  const [ref, isInView] = useInView();

  return (
    <section className="py-32 px-6 bg-white dark:bg-surface-dark transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`text-center mb-24 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glassmorphism-premium border border-primary-200/50 dark:border-primary-500/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300">The Roadmap</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 text-slate-900 dark:text-white">
            How It <span className="text-gradient">Works.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Three strategic phases to accelerate your entrepreneurial journey and achieve your business milestones.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 lg:gap-12 relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [ref, isInView] = useInView();
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center group">
      <div
        ref={ref}
        className={`glassmorphism-premium p-12 rounded-[3rem] text-center max-w-sm transition-all duration-700 border border-slate-100 dark:border-white/5 hover:shadow-2xl ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="w-24 h-24 mx-auto rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mb-8 shadow-2xl group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
          <Icon className="w-12 h-12" />
        </div>
        <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center font-display font-bold text-2xl text-primary-500 border border-primary-500/20">
          0{index + 1}
        </div>
        <h3 className="text-2xl font-display font-bold mb-4 text-slate-900 dark:text-white">
          {step.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {step.description}
        </p>
      </div>

      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-[40%] -right-12 translate-x-1/2 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary-500 to-transparent" />
        </div>
      )}
    </div>
  );
}

import { Sparkles } from 'lucide-react';
