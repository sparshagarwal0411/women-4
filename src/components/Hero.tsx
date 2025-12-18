import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GET_STARTED_PATH } from "../constants/routes";

export default function Hero() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-200/30 to-pink-200/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div
        className={`relative z-10 max-w-6xl mx-auto px-6 py-20 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30 shadow-lg">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Empowering Women Entrepreneurs
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
          Women-Centric
          <br />
          Micro-Entrepreneurship
          <br />Toolkit
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Your complete platform for learning, mentorship, and digital tools to
          transform your entrepreneurial dreams into reality
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(GET_STARTED_PATH)}
            className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/about")}
            className="px-8 py-4 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border border-pink-200/80 dark:border-pink-500/40 text-gray-800 dark:text-gray-100 rounded-full font-semibold hover:bg-white/90 dark:hover:bg-gray-800/80 hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            Learn More
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-600 dark:text-pink-300 border border-pink-200/50 dark:border-pink-500/30">
              New
            </span>
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: "10K+", label: "Women Empowered" },
            { number: "500+", label: "Mentors" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glassmorphism p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// ...existing code...