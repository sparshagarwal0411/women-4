import { useEffect } from 'react';
import Hero from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Impact } from '../components/Impact';
import { Contact } from '../components/Contact';
import { Pricing } from '../components/Pricing';

const wins = [
  { label: "Revenue Lift", value: "38%" },
  { label: "Communities", value: "120+" },
  { label: "Advised Hours", value: "48K" },
  { label: "Women Empowered", value: "25K+" },
];

export function Home() {
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

  return (
    <>
      <Hero />
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
        <div className="max-w-6xl mx-auto glassmorphism-premium rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl p-12 md:p-16 relative overflow-hidden group">
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
              <a
                href="/about"
                className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xl hover:scale-105 active:scale-95 transition-all text-center"
              >
                Our Mission
              </a>
              <a
                href="/faqs"
                className="px-8 py-4 rounded-full glassmorphism border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center"
              >
                Ecosystem FAQ
              </a>
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

import { Sparkles } from 'lucide-react';
