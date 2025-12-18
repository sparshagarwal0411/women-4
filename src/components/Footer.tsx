import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

return (
    <footer className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-gray-900 text-gray-900 dark:text-gray-100 py-16 px-6 border-t border-pink-100/60 dark:border-pink-500/20">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">WomenPreneur</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Women-first toolkit for finance, mentorship, and digital storefronts—built to help you grow with confidence.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-pink-600 dark:text-pink-300 bg-white/70 dark:bg-white/5 border border-pink-200/70 dark:border-pink-500/30 px-3 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              New office hours every Friday
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Platform</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><a href="/finance" className="hover:text-pink-500 transition-colors">Finance Toolkit</a></li>
              <li><a href="/scheme-finder" className="hover:text-pink-500 transition-colors">Scheme Finder</a></li>
              <li><a href="/storefront" className="hover:text-pink-500 transition-colors">Storefront Builder</a></li>
              <li><a href="/mentorship" className="hover:text-pink-500 transition-colors">Mentorship</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><a href="/about" className="hover:text-pink-500 transition-colors">About & Impact</a></li>
              <li><a href="/faqs" className="hover:text-pink-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">Help Center</a></li>
              <li><a href="/loan-monitor.html" target="_blank" className="hover:text-pink-500 transition-colors">Loan Monitor</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Stay in touch</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Get one practical email a week: funding tips, templates, and mentor office hours.
            </p>
            <form className="space-y-3">
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-pink-200/70 dark:border-pink-500/30 flex-1">
                  <Mail className="w-4 h-4 text-pink-500" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-transparent outline-none text-sm flex-1 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We respect your inbox. Unsubscribe anytime.
              </p>
            </form>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-pink-100/70 dark:border-pink-500/30 flex items-center justify-center hover:scale-105 hover:text-pink-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-pink-100/70 dark:border-pink-500/30 flex items-center justify-center hover:scale-105 hover:text-pink-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-pink-100/70 dark:border-pink-500/30 flex items-center justify-center hover:scale-105 hover:text-pink-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-pink-100/70 dark:border-pink-500/30 flex items-center justify-center hover:scale-105 hover:text-pink-500 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-100/70 dark:border-pink-500/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>© {currentYear} Women-Centric Micro-Entrepreneurship Toolkit. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-500">Privacy</a>
            <a href="#" className="hover:text-pink-500">Terms</a>
            <a href="#" className="hover:text-pink-500">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
