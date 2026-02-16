import { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Fashion Entrepreneur',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'This platform gave me the confidence and tools to launch my boutique. The mentorship program connected me with amazing women who believed in my vision.'
  },
  {
    name: 'Aisha Khan',
    role: 'Food Business Owner',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'The finance toolkit and scheme finder helped me secure funding I didn\'t even know existed. Now my catering business is thriving!'
  },
  {
    name: 'Maya Patel',
    role: 'Handicraft Artisan',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'Building my online store was so easy with the storefront builder. I can now reach customers across the country and support my family.'
  },
  {
    name: 'Neha Verma',
    role: 'Wellness Coach',
    image: 'https://images.pexels.com/photos/3760853/pexels-photo-3760853.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'The weekly mentor office hours helped me package my services and price with confidence. My bookings doubled in 2 months.'
  },
  {
    name: 'Ritika Das',
    role: 'Home Baker',
    image: 'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'Scheme Finder surfaced a subsidy I qualified for. That grant paid for my first commercial oven!'
  },
  {
    name: 'Sara Fernandes',
    role: 'Eco Retail Founder',
    image: 'https://images.pexels.com/photos/3760855/pexels-photo-3760855.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'I loved how the finance toolkit is India-specific—GST, UPI, COD—all accounted for. MoneyMap keeps my cash flow honest.'
  }
];

function Counter({ end, label, duration = 2000 }: { end: number; label: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <div className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors duration-500">
        {count.toLocaleString()}{end === 95 ? '%' : '+'}
      </div>
      <div className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400">{label}</div>
    </motion.div>
  );
}

export function Impact() {
  const marqueeItems = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <section className="py-32 px-6 bg-white dark:bg-surface-dark transition-colors duration-500 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glassmorphism-premium border border-primary-200/50 dark:border-primary-500/20 shadow-lg">
            <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300">Community Impact</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 text-slate-900 dark:text-white">
            Our Growing <span className="text-gradient">Community.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join thousands of women entrepreneurs who are transforming their lives and communities through our ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          <Counter end={15000} label="Impacted" />
          <Counter end={750} label="Advisors" />
          <Counter end={2500} label="Ventures" />
          <Counter end={95} label="NPS Score" duration={1500} />
        </div>

        <div className="relative w-full -mx-6 sm:-mx-1 overflow-hidden">
          <div
            className="flex gap-10 animate-testimonial-marquee will-change-transform py-6 px-2"
            style={{ width: 'max-content' }}
          >
            {marqueeItems.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[340px] sm:min-w-[420px] lg:min-w-[480px] shrink-0"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-surface-dark dark:via-surface-dark/80"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-surface-dark dark:via-surface-dark/80"></div>
        </div>
      </div>
      <style>{`
        @keyframes testimonial-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-testimonial-marquee {
          animation: testimonial-marquee 40s linear infinite;
        }
        .animate-testimonial-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glassmorphism-premium p-10 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02] border border-slate-100 dark:border-white/5 group"
    >
      <div className="flex gap-1 mb-8 opacity-50 group-hover:opacity-100 transition-opacity">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-primary-500 fill-primary-500" />
        ))}
      </div>
      <p className="text-slate-700 dark:text-slate-300 mb-10 text-lg leading-relaxed font-medium">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center border-2 border-white dark:border-surface-dark">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
        </div>
        <div>
          <div className="font-display font-bold text-slate-900 dark:text-white text-lg">{testimonial.name}</div>
          <div className="text-sm font-semibold text-primary-500 tracking-wide uppercase">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}
