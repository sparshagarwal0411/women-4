import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { Briefcase, Users, BarChart3, ChevronRight, User, Sparkles } from "lucide-react";
import { Navigation } from "../components/Navigation";

export default function CompleteProfile({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
    const [role, setRole] = useState<"user" | "mentor">("user");
    const [fullName, setFullName] = useState("");
    const [businessAbout, setBusinessAbout] = useState("");
    const [businessLevel, setBusinessLevel] = useState("");
    const [teamSize, setTeamSize] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/login");
                return;
            }
            if (user.user_metadata?.full_name) {
                setFullName(user.user_metadata.full_name);
            }
        }
        checkUser();
    }, [navigate]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: fullName,
                    role: role,
                    business_about: businessAbout,
                    business_level: businessLevel,
                    team_size: parseInt(teamSize) || 0,
                    updated_at: new Date().toISOString(),
                });

            if (profileError) throw profileError;

            // Set legacy localStorage
            localStorage.setItem("userRole", role);
            localStorage.setItem("username", fullName || user.email?.split('@')[0] || 'User');

            if (role === "mentor") navigate("/mentor-profile");
            else navigate("/profile");

        } catch (err: any) {
            setError(err.message || "An error occurred while saving your profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <main className="flex-grow flex items-center justify-center p-6 pt-28">
                <motion.div
                    className="w-full max-w-lg glassmorphism-premium rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-8 md:p-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-3">
                            <Sparkles className="w-8 h-8 text-primary-500" />
                            Complete Your Profile
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Tell us a bit more about you to personalize your experience.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">I am joining as a:</label>
                            <div className="grid grid-cols-2 gap-4">
                                {(['user', 'mentor'] as const).map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === r ? 'bg-primary-500/10 border-primary-500 text-primary-600 dark:text-primary-400' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-400 hover:border-slate-300'}`}
                                    >
                                        <span className="uppercase tracking-widest text-xs font-bold">{r}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Briefcase className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                            <textarea
                                value={businessAbout}
                                onChange={(e) => setBusinessAbout(e.target.value)}
                                placeholder="Business Focus (e.g. Fintech, Retail, HealthTech)"
                                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all min-h-[100px]"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                                <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    value={businessLevel}
                                    onChange={(e) => setBusinessLevel(e.target.value)}
                                    type="text"
                                    placeholder="Stage (e.g. Idea)"
                                    className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(e.target.value)}
                                    type="number"
                                    placeholder="Team Size"
                                    className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 transition-all active:scale-[0.98]"
                            whileHover={{ scale: 1.01 }}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Complete Registration
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
