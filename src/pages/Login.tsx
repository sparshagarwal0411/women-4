import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { supabase } from "../lib/supabase";
import { Lock, Mail, User, Briefcase, Users, BarChart3, ChevronRight, Sparkles } from "lucide-react";

interface LoginProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Login({ darkMode, toggleDarkMode }: LoginProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"user" | "admin" | "mentor">("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessAbout, setBusinessAbout] = useState("");
  const [businessLevel, setBusinessLevel] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLogin = mode === "login";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;

        // Fetch profile to determine role-based redirection
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        // Set legacy localStorage for backward compatibility with other components
        localStorage.setItem("userRole", profile.role);
        localStorage.setItem("username", profile.full_name || email.split('@')[0]);

        if (profile.role === "mentor") navigate("/mentor-profile");
        else if (profile.role === "admin") navigate("/admin-profile");
        else navigate("/profile");

      } else {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
              business_about: businessAbout,
              business_level: businessLevel,
              team_size: parseInt(teamSize) || 0,
            }
          }
        });

        if (signupError) throw signupError;

        if (data.user) {
          setError("Signup successful! Please check your email for verification.");
          // Reset fields
          setMode("login");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-primary-500' : 'bg-primary-300'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-accent-500' : 'bg-accent-300'}`} />
      </div>

      <main className="flex-grow flex items-center justify-center p-6 pt-28 relative z-10">
        <motion.div
          layout
          className="w-full max-w-xl glassmorphism-premium rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            {/* Left Side - Visual/Info (Hidden on small screens) */}
            <div className="hidden md:flex w-2/5 bg-gradient-to-br from-primary-600/90 to-accent-600/90 p-8 flex-col justify-between text-white relative">
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold leading-tight mb-4">Empowering Women Entrepreneurs</h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Join a thriving community of women leaders, access global opportunities, and scale your vision.
                </p>
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-xs bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <Users className="w-4 h-4 text-primary-200" />
                  <span>5,000+ Active Members</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-3/5 p-8 md:p-10">
              <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {isLogin ? "Welcome Back" : "Join our Community"}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {isLogin ? "Log in to your account to continue" : "Create an account to start your journey"}
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl mb-8">
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${isLogin ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${!isLogin ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Sign Up
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`p-3 rounded-xl text-xs font-medium text-center ${error.includes('successful') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                    >
                      {error}
                    </motion.div>
                  )}

                  {!isLogin && (
                    <div className="space-y-4">
                      {/* Name Field */}
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                          required
                        />
                      </div>

                      {/* Role Selector */}
                      <div className="grid grid-cols-3 gap-3">
                        {(['user', 'mentor', 'admin'] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded-xl border transition-all ${role === r ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/20' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-400'}`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                      required
                    />
                  </div>

                  {!isLogin && (role === "user" || role === "mentor") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-2"
                    >
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                          value={businessAbout}
                          onChange={(e) => setBusinessAbout(e.target.value)}
                          type="text"
                          placeholder="Business Focus (e.g. Fintech, Retail)"
                          className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                          <input
                            value={businessLevel}
                            onChange={(e) => setBusinessLevel(e.target.value)}
                            type="text"
                            placeholder="Stage"
                            className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                          />
                        </div>
                        <div className="relative group">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                          <input
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                            type="number"
                            placeholder="Team"
                            className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 group disabled:opacity-70 transition-all active:scale-[0.98]"
                    whileHover={{ scale: 1.01 }}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {isLogin ? "Authenticate" : "Create Account"}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </AnimatePresence>

              <div className="mt-8 text-center">
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  By continuing, you agree to our <span className="text-primary-500 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary-500 hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}