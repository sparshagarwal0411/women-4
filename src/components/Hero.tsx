import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GET_STARTED_PATH } from "../constants/routes";
import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-surface-dark transition-colors duration-500">
      <HeroVisual darkMode={darkMode} />

      {/* Premium Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[50%] h-[50%] bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] bg-accent-500/10 dark:bg-accent-950/10 rounded-full blur-[120px] animate-pulse-slow delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full glassmorphism-premium border border-primary-200/50 dark:border-primary-500/20 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-primary-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-slate-300">
            Empowering Women Entrepreneurs
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.1]"
        >
          <span className="text-slate-900 dark:text-white">Women-Centric</span>
          <br />
          <span className="text-gradient animate-glow">Micro-Entrepreneurship</span>
          <br />
          <span className="text-slate-900 dark:text-white italic font-serif">Toolkit.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed"
        >
          Your complete platform for learning, mentorship, and digital tools to
          transform your entrepreneurial dreams into reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={() => navigate(GET_STARTED_PATH)}
            className="group relative px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Launch Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => navigate("/about")}
            className="group px-10 py-5 glassmorphism-premium border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
          >
            Explore Ecosystem
          </button>
        </motion.div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { number: "10K+", label: "Impacted" },
            { number: "500+", label: "Advisors" },
            { number: "95%", label: "Placement" },
            { number: "24/7", label: "Concierge" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="relative group p-8 rounded-3xl glassmorphism border border-slate-100 dark:border-white/5 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-500"
            >
              <div className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                {stat.number}
              </div>
              <div className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

