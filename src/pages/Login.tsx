import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../components/Navigation";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { Lock, Mail, User, Users, ChevronRight, Sparkles } from "lucide-react";

interface LoginProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Login({ darkMode, toggleDarkMode }: LoginProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const isLogin = mode === "login";

  async function handleOAuthLogin(provider: "google" | "github") {
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  }

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

        // Fetch profile to determine redirection
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, role, business_about')
          .eq('id', data.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') throw profileError;

        // Check if profile is complete (e.g., has a role and about)
        if (!profile || !profile.role || !profile.business_about) {
          navigate("/complete-profile");
          return;
        }

        // Set legacy localStorage for backward compatibility
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
            }
          }
        });

        if (signupError) throw signupError;

        if (data.user) {
          setError("Signup successful! Please check your email for verification.");
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

                  <div className="hidden">
                    {/* Extra fields moved to CompleteProfile */}
                  </div>

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

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleOAuthLogin("google")}
                      className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 py-3 px-4 rounded-2xl transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.38-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOAuthLogin("github")}
                      className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 py-3 px-4 rounded-2xl transition-all"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      GitHub
                    </button>
                  </div>
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
    </div >
  );
}