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
    <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-white via-pink-50/30 to-purple-50/30 dark:from-gray-800 dark:via-gray-900">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Choose Your Plan</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your entrepreneurial journey. Upgrade anytime with our loyalty program benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative glassmorphism rounded-3xl border-2 p-8 ${
                plan.popular
                  ? 'border-pink-500 dark:border-pink-400 shadow-2xl scale-105'
                  : 'border-pink-200/60 dark:border-pink-500/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded && plan.notIncluded.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 opacity-50">
                    <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-center text-gray-400">✗</span>
                    <span className="text-gray-500 dark:text-gray-400 line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.buttonLink}
                className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:scale-105'
                    : 'bg-white dark:bg-gray-800 border-2 border-pink-200 dark:border-pink-500/30 text-pink-600 dark:text-pink-400 hover:border-pink-400'
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Loyalty Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 p-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Loyalty Program
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get rewarded for staying with us
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {loyaltyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-500/30">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-yellow-600 dark:text-yellow-400">Special Offer:</strong> Get{' '}
              <strong className="text-pink-600 dark:text-pink-400">25% off</strong> on your next plan renewal when you upgrade to Pro!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

