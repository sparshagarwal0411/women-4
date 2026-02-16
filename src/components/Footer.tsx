import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-slate-100 py-24 px-6 border-t border-slate-100 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid md:grid-cols-4 gap-16">
          <div className="col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-white dark:text-slate-900" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Women<span className="text-primary-500">Preneur.</span></span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              A premium, women-first toolkit for finance, mentorship, and digital storefronts—engineered for sustainable growth.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary-500 bg-primary-500/5 border border-primary-500/10 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Ecosystem Update: Weekly Mentorship
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-widest">Toolkit</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="/finance" className="hover:text-primary-500 transition-colors">Capital Management</a></li>
              <li><a href="/scheme-finder" className="hover:text-primary-500 transition-colors">Grant Intelligence</a></li>
              <li><a href="/storefront" className="hover:text-primary-500 transition-colors">Digital Commerce</a></li>
              <li><a href="/mentorship" className="hover:text-primary-500 transition-colors">Expert Advisory</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-slate-900 dark:text-white uppercase tracking-widest">Resources</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="/about" className="hover:text-primary-500 transition-colors">Mission & Impact</a></li>
              <li><a href="/faqs" className="hover:text-primary-500 transition-colors">Help Center / FAQ</a></li>
              <li><a href="/loan-monitor" className="hover:text-primary-500 transition-colors">Portfolio Analytics</a></li>
              <li><a href="/community" className="hover:text-primary-500 transition-colors">Peer Network</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white uppercase tracking-widest">Ecosystem News</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
              Join 5,000+ entrepreneurs receiving weekly insights on scaling and funding.
            </p>
            <form className="space-y-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glassmorphism border border-slate-200 dark:border-white/5 flex-1">
                  <Mail className="w-4 h-4 text-primary-500" />
                  <input
                    type="email"
                    placeholder="entrepreneur@email.com"
                    className="bg-transparent outline-none text-sm font-medium flex-1 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-primary-500 hover:text-white transition-all shadow-xl"
                >
                  Join Newsletter
                </button>
              </div>
            </form>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glassmorphism border border-slate-100 dark:border-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
          <p>© {currentYear} WomenPreneur Ecosystem. Built for Excellence.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Ethics</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Service Terms</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Global Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
