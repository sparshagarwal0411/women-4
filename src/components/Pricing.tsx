import { Check, Sparkles, Gift, Crown } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Access to all free courses',
      'Scheme Finder access',
      'Basic storefront builder',
      'Community support',
      'Limited mentorship (1 session/month)',
    ],
    notIncluded: [
      'Paid courses',
      'Unlimited mentorship',
      'Priority support',
      'Certification',
    ],
    buttonText: 'Get Started',
    buttonLink: '/login',
    popular: false,
  },
  {
    name: 'Pro',
    price: 999,
    period: 'month',
    description: 'For serious entrepreneurs',
    features: [
      'Everything in Free',
      'Access to ALL paid courses',
      '1 free paid course included',
      'Unlimited mentorship sessions',
      'Priority support',
      'All certifications included',
      'Advanced storefront features',
      'Finance toolkit premium features',
    ],
    buttonText: 'Upgrade to Pro',
    buttonLink: '/login',
    popular: true,
  },
];

const loyaltyBenefits = [
  '25% discount on next plan renewal',
  'Early access to new courses',
  'Exclusive Pro-only workshops',
  'Priority customer support',
  'Referral rewards program',
];

export function Pricing() {
  const [ref, isInView] = useInView();

  return (
    <section id="pricing" className="py-32 px-6 bg-slate-50 dark:bg-surface-dark transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`text-center mb-24 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glassmorphism-premium border border-primary-200/50 dark:border-primary-500/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300">Investment Structure</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 text-slate-900 dark:text-white">
            Ecosystem <span className="text-gradient">Access.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Choose the tier that aligns with your professional growth. Each tier is designed to provide maximum value as you scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20 relative">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative glassmorphism-premium rounded-[3rem] p-12 border-2 transition-all duration-500 group overflow-hidden ${plan.popular
                ? 'border-primary-500/50 dark:border-primary-500/30 shadow-2xl scale-105 z-20'
                : 'border-slate-100 dark:border-white/5 opacity-80 hover:opacity-100 scale-100 z-10'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-1 right-8">
                  <span className="px-6 py-2 bg-primary-500 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-b-2xl flex items-center gap-2 shadow-lg">
                    <Crown className="w-4 h-4" />
                    Tier Leader
                  </span>
                </div>
              )}

              <div className="mb-12">
                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-6xl font-display font-bold ${plan.popular ? 'text-gradient' : 'text-slate-900 dark:text-white'}`}>
                    ₹{plan.price.toLocaleString()}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">/{plan.period}</span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{plan.description}</p>
              </div>

              <ul className="space-y-6 mb-12">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 group/item">
                    <div className="w-6 h-6 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary-500 transition-colors">
                      <Check className="w-4 h-4 text-primary-500 group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded && plan.notIncluded.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 opacity-40 grayscale">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-slate-400 font-bold text-xs pr-0.5">✕</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 line-through font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.buttonLink}
                className={`block w-full py-5 rounded-[2rem] font-bold text-center transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-95 ${plan.popular
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                  }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Loyalty Program */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glassmorphism-premium rounded-[3rem] border border-slate-100 dark:border-white/5 p-12 max-w-4xl mx-auto relative group overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/10 blur-[60px] rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />

          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-20 h-20 rounded-[1.5rem] bg-yellow-500 flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-12 transition-transform duration-500">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Loyalty Program
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Premium rewards for sustained ecosystem contributors and entrepreneurs.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {loyaltyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 group/benefit">
                <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 font-bold text-sm group-hover/benefit:bg-primary-500 group-hover/benefit:text-white transition-all">
                  0{index + 1}
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-bold text-sm tracking-wide uppercase">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary-500 rounded-[2rem] border border-primary-400/50 shadow-2xl relative overflow-hidden group/offer">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/offer:opacity-100 transition-opacity" />
            <p className="text-white text-center font-bold tracking-wide relative z-10">
              SPECIAL INCENTIVE: GET 25% RENEWAL REBATE ON PRO UPGRADES THIS MONTH.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// ... existing code removed redundant import ...

