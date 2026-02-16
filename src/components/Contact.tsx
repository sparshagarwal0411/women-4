import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export function Contact() {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-32 px-6 bg-white dark:bg-surface-dark transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`text-center mb-24 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glassmorphism-premium border border-primary-200/50 dark:border-primary-500/20 shadow-lg">
            <MessageSquare className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300">Direct Communication</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 text-slate-900 dark:text-white">
            Let's Start Your <span className="text-gradient">Journey.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Connect with our ecosystem advisory team. Whether you have questions or are ready to scale, we're here to facilitate your progress.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div className="glassmorphism-premium p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5 group hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mb-8 shadow-xl group-hover:bg-primary-500 group-hover:text-white transition-all">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">Strategic Advisory</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                Direct inquiry channel for ecosystem support, financial consultation, and mentorship coordination.
              </p>
              <a href="mailto:hq@womenpreneur.ecosystem" className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary-500 transition-colors">
                hq@womenpreneur.ecosystem
              </a>
            </div>

            <div className="glassmorphism-premium p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5 group hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mb-8 shadow-xl group-hover:bg-primary-500 group-hover:text-white transition-all">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">Corporate Headquarters</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Join our Tier-1 network of professional mentors and visionary entrepreneurs across global markets.
              </p>
            </div>
          </div>

          <div className={`glassmorphism-premium p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/5 blur-[80px] rounded-full -mr-20 -mt-20" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 ml-4">
                    Identity
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                    placeholder="Full Name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 ml-4">
                    Communication
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                    placeholder="professional@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 ml-4">
                  Inquiry Context
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all resize-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                  placeholder="How can our ecosystem facilitate your objectives?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-bold shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group/btn ${(isSubmitting || submitted) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-500 hover:text-white'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : submitted ? (
                  <>
                    <span className="text-xl">✓</span>
                    Transmission Successful
                  </>
                ) : (
                  <>
                    Initialize Dialogue
                    <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
