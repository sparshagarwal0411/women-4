import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle,
  Globe2,
  Heart,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Women supported", value: "25K+", accent: "from-pink-400 to-rose-500" },
  { label: "Communities reached", value: "120+", accent: "from-rose-800 to-purple-500" },
  { label: "Avg. revenue lift", value: "38%", accent: "from-pink-400 to-rose-800" },
  { label: "Mentor hours served", value: "48K", accent: "from-rose-400 to-purple-900"}
];

const values = [
  {
    title: "Safety & trust",
    icon: ShieldCheck,
    description: "Privacy-first tools, transparent data practices, and human help when you need it.",
  },
  {
    title: "Community first",
    icon: Users,
    description: "Built with feedback from real founders across India, from metros to tier-3 towns.",
  },
  {
    title: "Progress over perfect",
    icon: Lightbulb,
    description: "Ship fast, learn fast. We keep iterating so you can keep winning.",
  },
  {
    title: "Celebrate growth",
    icon: Star,
    description: "Every milestone matters—funding wins, first sale, or first 100 loyal customers.",
  },
];

const faqs = [
  {
    question: "Who is this toolkit for?",
    answer:
      "Women founders, side‑hustlers, and leaders who want finance tools, mentoring, and ready-to-use resources without a steep learning curve.",
  },
  {
    question: "Do I need prior business experience?",
    answer:
      "No. We guide you from idea validation to scaling. Templates and calculators are beginner-friendly, with expert tracks when you’re ready.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Sensitive data stays in your browser for tools like MoneyMap. For cloud features we follow strict permissioning and encryption.",
  },
  {
    question: "How do I talk to a human?",
    answer:
      "Reach out via the mentorship network or drop a note through Contact. We prioritize responses for critical money and compliance questions.",
  },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 space-y-16">
        {/* Hero */}
        <section className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-pink-200/60 dark:border-pink-500/30">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Women-first. Future-ready.
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              About <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">WomenPreneur</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              We are a women-led crew building tools, stories, and support systems so founders can launch, fund, and grow without gatekeepers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/finance"
className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
  bg-gradient-to-r from-pink-500 to-purple-600
  dark:from-purple-600 dark:to-pink-500
  text-white font-semibold shadow-lg hover:scale-[1.02] transition"              >
                Explore Finance Toolkit <ArrowUpRight className="w-5 h-5" />
              </Link>
              <Link
                to="/mentorship"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-pink-300/70 dark:border-pink-500/40 text-pink-600 dark:text-pink-300 font-semibold bg-white/70 dark:bg-gray-800/70 hover:border-pink-400"
              >
                Meet mentors
              </Link>
              <Link
                to="/finance"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/80 dark:bg-gray-900/70 border border-pink-200/70 dark:border-pink-500/40 text-pink-700 dark:text-pink-200 font-semibold hover:border-pink-400"
              >
                Finance Toolkit (overview)
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white font-semibold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Community love</p>
                <p className="font-semibold text-gray-800 dark:text-white">4.5/5 average mentor rating</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 via-purple-200/40 to-indigo-200/40 blur-3xl rounded-full" />
            <div className="relative glassmorphism rounded-3xl p-8 border border-white/60 dark:border-white/10 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our promise</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Radical accessibility for women entrepreneurs: local languages, simple calculators, and a community that sticks.
              </p>
              <div className="space-y-3">
                {["Practical playbooks", "Human mentors", "Money confidence"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glassmorphism rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.accent} mb-4`} />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Story + Highlight */}
        <section className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="glassmorphism rounded-3xl p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/60 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 text-sm font-semibold">
              <Heart className="w-4 h-4" /> Why we exist
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The spark</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We started as a Saturday coffee chat group helping each other write grant proposals and negotiate supplier contracts.
              Those sessions turned into playbooks. Playbooks became tools. Today WomenPreneur is a living, evolving platform crafted
              by the same women who rely on it.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <Globe2 className="w-4 h-4" />
              Built by founders across India, backed by mentors from 14 countries.
            </div>
          </div>

          <div className="glassmorphism rounded-3xl p-8 border border-white/60 dark:border-white/10 shadow-xl space-y-6 bg-gradient-to-br from-white/80 to-pink-50/80 dark:from-gray-900/70 dark:to-purple-900/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Impact snapshot</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Money confidence in action</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-200">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-1" />
                <span>MoneyMap loan monitor keeps records local-first—no cloud dependency.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-1" />
                <span>Finance Toolkit calculators tuned for Indian GST, MSME and lender norms.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-1" />
                <span>Mentor office hours every Friday with industry operators.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">How we operate</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Values that guide us</h3>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glassmorphism rounded-2xl p-6 border border-white/60 dark:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{value.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">FAQs</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ask us anything</h3>
            </div>
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/70 border border-pink-200/60 dark:border-pink-500/30 text-pink-600 dark:text-pink-300 font-semibold"
            >
              View full FAQ <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="glassmorphism rounded-2xl border border-white/60 dark:border-white/10"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                    <ArrowUpRight
                      className={`w-5 h-5 text-pink-500 transition-transform ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="glassmorphism rounded-3xl p-10 border border-white/60 dark:border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent" />
          <div className="relative flex flex-wrap items-center gap-6 justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Let’s build together</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to write your next win?</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl">
                Start with the Finance Toolkit, monitor cash with MoneyMap, or jump into a mentor session. We are one tap away.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/finance"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg"
              >
                Register Now
              </Link>
              <Link
                to="/login"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-pink-200/70 dark:border-pink-500/40 text-pink-600 dark:text-pink-300 font-semibold hover:border-pink-400"
              >
                Continue the Grind
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

