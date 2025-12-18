import { Users, MessageCircle, Trophy, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

export function Connect() {
  const [ref, isInView] = useInView();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Connect with your tribe
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join the WomenPreneur community, share your journey, and get guidance from mentors –
            all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Community card */}
          <div className="glassmorphism p-8 rounded-3xl border border-pink-200/60 dark:border-pink-500/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Community
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Post updates, ask questions, and cheer on fellow founders.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 mb-6">
              <li>• Share wins, roadblocks, and questions with everyone.</li>
              <li>• React and comment on posts to earn Social Points (SP).</li>
              <li>• Climb the community leaderboard as you stay active.</li>
            </ul>

            <div className="mt-auto flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-500/10 text-xs font-semibold text-pink-700 dark:text-pink-200">
                <Trophy className="w-4 h-4" />
                1 Like = 1 SP · 1 Comment = 2 SP
              </div>
              <Link
                to="/community"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Go to Community
              </Link>
            </div>
          </div>

          {/* Mentorship card */}
          <div className="glassmorphism p-8 rounded-3xl border border-pink-200/60 dark:border-pink-500/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mentorship
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  One-on-one conversations with curated mentors.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 mb-6">
              <li>• Browse mentors by expertise and focus area.</li>
              <li>• Chat in real-time and ask for specific guidance.</li>
              <li>• Perfect for deep dives into strategy and execution.</li>
            </ul>

            <div className="mt-auto flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-xs font-semibold text-purple-700 dark:text-purple-200">
                <Sparkles className="w-4 h-4" />
                Best for structured 1:1 support
              </div>
              <Link
                to="/mentorship"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Go to Mentorship
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


