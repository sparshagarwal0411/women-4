import { useEffect } from 'react';
import Hero  from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Impact } from '../components/Impact';
import { Contact } from '../components/Contact';
import { Pricing } from '../components/Pricing';

const wins = [
  { label: "Revenue lift", value: "38%" },
  { label: "Communities reached", value: "120+" },
  { label: "Mentor hours", value: "48K" },
  { label: "Women supported", value: "25K+" },
];

export function Home() {
  useEffect(() => {
    // Handle scroll to pricing section if hash is present
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
      <section className="px-6 -mt-12 md:-mt-16">
        <div className="max-w-6xl mx-auto glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 px-6 py-4 flex items-center gap-2 text-sm font-semibold text-pink-700 dark:text-pink-200">
            Latest wins from the WomenPreneur community
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-pink-100/70 dark:divide-pink-500/20">
            {wins.map((item) => (
              <div key={item.label} className="p-5 flex flex-col items-start">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {item.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="community">
        <Impact />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <section className="px-6">
        <div className="max-w-6xl mx-auto my-16 glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 shadow-xl p-8 bg-gradient-to-br from-white/90 to-pink-50/80 dark:from-gray-900/70 dark:to-purple-900/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Spotlight</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Why WomenPreneur exists</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Meet the women-first team, values, and the impact stories that power our platform.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/about"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                Visit About
              </a>
              <a
                href="/faqs"
                className="px-5 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-pink-200/70 dark:border-pink-500/40 text-pink-600 dark:text-pink-300 font-semibold hover:border-pink-400"
              >
                Quick FAQs
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
