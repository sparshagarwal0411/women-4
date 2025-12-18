// ...existing code...
import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../components/Navigation";

interface LoginProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Login({ darkMode, toggleDarkMode }: LoginProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"user" | "admin" | "mentor">("user");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessAbout, setBusinessAbout] = useState("");
  const [businessLevel, setBusinessLevel] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();

  const isLogin = mode === "login";

  // Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setCaptcha(`${num1} + ${num2}`);
    setCaptchaAnswer(answer.toString());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (isLogin) {
      if (!username || !password || !role) {
        setError("Please fill in all required fields.");
        return;
      }
      // Validate captcha
      if (captchaInput !== captchaAnswer) {
        setError("Captcha verification failed. Please try again.");
        setCaptchaInput("");
        generateCaptcha();
        return;
      }
      
      // Check for special user accounts
      if (username.toLowerCase() === 'sparsh' && password === '123' && role === 'user') {
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", "Sparsh");
        localStorage.setItem("subscription", "pro");
        localStorage.setItem("freePaidCourseUsed", "false");
        localStorage.setItem("businessAbout", "Web Designer");
        localStorage.setItem("businessLevel", "Early-stage");
        localStorage.setItem("teamSize", "4");
        navigate("/profile", { replace: true });
        return;
      }
      
      // Check for special mentor account
      if (username.toLowerCase() === 'mentor123' && password === '123' && role === 'mentor') {
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", "Mentor123");
        localStorage.setItem("subscription", "free"); // Mentors don't need Pro
        navigate("/mentor-profile", { replace: true });
        return;
      }
      
      // Store user info in localStorage for now
      localStorage.setItem("userRole", role);
      localStorage.setItem("username", username);
      localStorage.setItem("subscription", "free"); // Default to free
      localStorage.setItem("freePaidCourseUsed", "false");
      // Navigate to role-specific profile
      if (role === "mentor") {
        navigate("/mentor-profile", { replace: true });
      } else if (role === "admin") {
        navigate("/admin-profile", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    } else {
      if (!name || !email || !password || !role) {
        setError("Please fill in all required fields.");
        return;
      }
      // Validate captcha
      if (captchaInput !== captchaAnswer) {
        setError("Captcha verification failed. Please try again.");
        setCaptchaInput("");
        generateCaptcha();
        return;
      }
      // Store user info in localStorage for now
      localStorage.setItem("userRole", role);
      localStorage.setItem("username", name);
      localStorage.setItem("subscription", "free"); // Default to free
      localStorage.setItem("freePaidCourseUsed", "false");
      if (role === "user" || role === "mentor") {
        localStorage.setItem("businessAbout", businessAbout || "");
        localStorage.setItem("businessLevel", businessLevel || "");
        localStorage.setItem("teamSize", teamSize || "");
      }
      // Navigate to role-specific profile
      if (role === "mentor") {
        navigate("/mentor-profile", { replace: true });
      } else if (role === "admin") {
        navigate("/admin-profile", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gradient-to-br from-rose-100 to-pink-300 dark:from-purple-800 dark:via-pink-600 dark:to-rose-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow flex items-center justify-center p-6 pt-24">
        <motion.div
          className="w-full max-w-md bg-white dark:bg-purple-700 shadow-xl rounded-2xl p-6 border border-pink-700 dark:border-pink-400"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-2xl font-bold text-rose-300 dark:text-pink-500 mb-4 text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>

          <div className="relative grid grid-cols-2 bg-lime-200/60 dark:bg-emerald-800/50 rounded-xl mb-4 overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-emerald-600"
              style={{ width: "50%" }}
              animate={{ x: isLogin ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              className={`py-2 font-medium z-10 ${
                isLogin
                  ? "text-white bg-pink-500"
                  : "text-rose-700 dark:text-rose-300"
              }`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`py-2 font-medium z-10 ${
                !isLogin
                  ? "text-white bg-pink-500"
                  : "text-rose-700 dark:text-rose-300"
              }`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "user" | "admin" | "mentor")}
              className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login-form"
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                >
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex-1 border border-lime-300 dark:border-emerald-700 bg-gray-100 dark:bg-gray-700 rounded-xl p-2 text-center font-semibold text-gray-800 dark:text-white">
                      {captcha} = ?
                    </div>
                    <input
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      type="text"
                      placeholder="Answer"
                      className="w-24 border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        generateCaptcha();
                        setCaptchaInput("");
                      }}
                      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-sm"
                      title="Refresh captcha"
                    >
                      ↻
                    </button>
                  </div>
                  {error && <div className="text-sm text-red-600">{error}</div>}
                  <motion.button
                    type="submit"
                    className="w-full bg-rose-400 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-400 text-white py-2 rounded-xl shadow"
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -1 }}
                  >
                    Login as {role}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="signup-form"
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                >
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                    className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full border border-rose-300 dark:border-violet-700 bg-white dark:bg-pink-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  {(role === "user" || role === "mentor") && (
                    <>
                      <input
                        value={businessAbout}
                        onChange={(e) => setBusinessAbout(e.target.value)}
                        type="text"
                        placeholder="What is your business about? (e.g. Web Designer, Bakery, Boutique)"
                        className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <input
                        value={businessLevel}
                        onChange={(e) => setBusinessLevel(e.target.value)}
                        type="text"
                        placeholder="What stage are you at? (e.g. Idea, Early-stage, Growing)"
                        className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <input
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        type="number"
                        min="1"
                        placeholder="Team size (number of people, e.g. 1, 4, 10)"
                        className="w-full border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 border border-lime-300 dark:border-emerald-700 bg-gray-100 dark:bg-gray-700 rounded-xl p-2 text-center font-semibold text-gray-800 dark:text-white">
                      {captcha} = ?
                    </div>
                    <input
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      type="text"
                      placeholder="Answer"
                      className="w-24 border border-lime-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        generateCaptcha();
                        setCaptchaInput("");
                      }}
                      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-sm"
                      title="Refresh captcha"
                    >
                      ↻
                    </button>
                  </div>
                  {error && <div className="text-sm text-red-600">{error}</div>}
                  <motion.button
                    type="submit"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-xl shadow"
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -1 }}
                  >
                    Sign Up as {role}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
// ...existing code...