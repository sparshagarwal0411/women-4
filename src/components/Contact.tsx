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
    <section className="py-24 px-6 bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <MessageSquare className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Get In Touch</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Let's Start Your Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions? We're here to help you every step of the way
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="glassmorphism p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <Mail className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Reach out to our support team for any inquiries
              </p>
              <a href="mailto:support@womenentrepreneurs.org" className="text-pink-500 hover:text-purple-500 font-semibold transition-colors">
                support@womenentrepreneurs.org
              </a>
            </div>

            <div className="glassmorphism p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <MessageSquare className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join our vibrant community of women entrepreneurs and mentors who are always ready to help
              </p>
            </div>
          </div>

          <div className={`glassmorphism p-10 rounded-3xl transition-all duration-700 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all resize-none text-gray-800 dark:text-white"
                  placeholder="Tell us about your entrepreneurial goals..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${
                  (isSubmitting || submitted) ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : submitted ? (
                  <>
                    <span className="text-2xl">✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
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
