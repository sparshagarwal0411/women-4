import { useState, useEffect, useMemo } from 'react';
import { Heart, Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';

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
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-gray-600 dark:text-gray-300 text-lg">{label}</div>
    </div>
  );
}

export function Impact() {
  const [ref, isInView] = useInView();
  const marqueeItems = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-pink-50/30 via-purple-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Community Impact</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Our Growing Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of women entrepreneurs who are transforming their lives and communities
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <Counter end={15000} label="Women Entrepreneurs" />
          <Counter end={750} label="Expert Mentors" />
          <Counter end={2500} label="Businesses Launched" />
          <Counter end={95} label="Satisfaction Rate" duration={1500} />
        </div>

        <div className="relative w-full -mx-6 sm:-mx-1 overflow-hidden">
          <div
            className="flex gap-10 animate-testimonial-marquee will-change-transform py-3 px-2"
            style={{ width: 'max-content' }}
          >
            {marqueeItems.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[320px] sm:min-w-[400px] lg:min-w-[460px] shrink-0"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-pink-50 via-pink-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-pink-50 via-pink-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80"></div>
        </div>
      </div>
      <style>{`
        @keyframes testimonial-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-testimonial-marquee {
          animation: testimonial-marquee 36s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-testimonial-marquee { animation-duration: 30s; }
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`glassmorphism p-8 rounded-3xl transition-all duration-500 hover:scale-105 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover ring-4 ring-pink-200 dark:ring-pink-500/30"
        />
        <div>
          <div className="font-bold text-gray-800 dark:text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
