import { useMemo, useState } from 'react';
import { MessageCircle, ThumbsUp, Send, Trophy, Users, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

const initialPosts: Post[] = [
  {
    id: '1',
    author: 'Asha (Retail)',
    content:
      'Launched my first pop-up in the local market this weekend. Footfall was low, but 8 paying customers and 15 email signups. Any tips on improving booth visibility?',
    createdAt: 'Today · 9:20 AM',
    likes: 5,
    comments: [
      {
        id: 'c1',
        author: 'Neha',
        content: 'Try adding a clear “What you get” board and a small demo table at the front.',
        createdAt: 'Today · 9:45 AM',
      },
    ],
  },
  {
    id: '2',
    author: 'Farah (Food)',
    content:
      'Got my first repeat corporate order for lunch catering (50 people). Want to build a simple landing page next – any no-code tools you love?',
    createdAt: 'Yesterday · 6:10 PM',
    likes: 8,
    comments: [
      {
        id: 'c2',
        author: 'Priya',
        content: 'Tally + a simple storefront is great to start, or try basic landing on any website builder.',
        createdAt: 'Yesterday · 6:30 PM',
      },
      {
        id: 'c3',
        author: 'Kavita',
        content: 'Keep it one-page: menu, pricing range, testimonials, and a WhatsApp button.',
        createdAt: 'Yesterday · 6:48 PM',
      },
    ],
  },
];

export function Community() {
  const [ref, isInView] = useInView();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const username = localStorage.getItem('username') || 'Founder';

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: username,
      content: newPost.trim(),
      createdAt: 'Just now',
      likes: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  const handleAddComment = (postId: string) => {
    const draft = commentDrafts[postId]?.trim();
    if (!draft) return;

    const comment: Comment = {
      id: `${postId}-${Date.now()}`,
      author: username,
      content: draft,
      createdAt: 'Just now',
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post,
      ),
    );

    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }));
  };

  const leaderboard = useMemo(() => {
    const scores = new Map<string, number>();

    posts.forEach((post) => {
      const sp = post.likes + post.comments.length * 2;
      const current = scores.get(post.author) ?? 0;
      scores.set(post.author, current + sp);
    });

    return Array.from(scores.entries())
      .map(([user, sp]) => ({ user, sp }))
      .sort((a, b) => b.sp - a.sp)
      .slice(0, 5);
  }, [posts]);

  const getPostSP = (post: Post) => post.likes + post.comments.length * 2;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr,1fr] gap-8">
        <div>
          <div
            ref={ref}
            className={`mb-6 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
              <Users className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Community Feed
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Share, Support & Grow
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Post updates, ask for feedback, and cheer on other women building their businesses.
              Social Points (SP) help highlight the most active contributors.
            </p>
          </div>

          {/* Create post */}
          <div className="glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 p-4 mb-6">
            <form onSubmit={handleCreatePost}>
              <textarea
                rows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share a win, a challenge, or a question with the community..."
                className="w-full resize-none rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-pink-200 dark:border-pink-500/30 px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-300/60 dark:focus:ring-pink-500/40"
              />
              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>
                    1 Like = 1 SP · 1 Comment = 2 SP (credited to the post author)
                  </span>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={!newPost.trim()}
                >
                  <Send className="w-4 h-4" />
                  Post
                </button>
              </div>
            </form>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {post.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.createdAt}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-pink-50 dark:bg-pink-500/10 text-[11px] font-medium text-pink-700 dark:text-pink-200">
                    <Trophy className="w-3 h-3" />
                    {getPostSP(post)} SP
                  </div>
                </div>

                <p className="text-sm text-gray-800 dark:text-gray-100 mb-3 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
                  <button
                    type="button"
                    onClick={() => handleLike(post.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/70 border border-pink-200/70 dark:border-pink-500/30 hover:border-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.likes} likes</span>
                  </button>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/70 border border-pink-200/70 dark:border-pink-500/30">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>

                {/* Comments list */}
                {post.comments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-pink-100/70 dark:border-pink-500/20 px-3 py-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">
                            {comment.author}
                          </p>
                          <p className="text-[11px] text-gray-400 dark:text-gray-500">
                            {comment.createdAt}
                          </p>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-200">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add comment */}
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={commentDrafts[post.id] ?? ''}
                    onChange={(e) =>
                      setCommentDrafts((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    placeholder="Add a comment..."
                    className="flex-1 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-pink-200 dark:border-pink-500/30 px-3 py-2 text-xs text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-pink-300/70 dark:focus:ring-pink-500/40"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold hover:shadow-md hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={!(commentDrafts[post.id]?.trim())}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <div className="glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Community Leaderboard
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Ranked by Social Points (SP) from likes and comments on posts.
                </p>
              </div>
            </div>

            {leaderboard.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start posting and engaging to appear on the leaderboard.
              </p>
            ) : (
              <ol className="space-y-2 mt-3">
                {leaderboard.map((entry, index) => (
                  <li
                    key={entry.user}
                    className="flex items-center justify-between rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-pink-100/70 dark:border-pink-500/20 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {entry.user}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-pink-700 dark:text-pink-200">
                      <Sparkles className="w-3.5 h-3.5" />
                      {entry.sp} SP
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="glassmorphism rounded-3xl border border-pink-200/60 dark:border-pink-500/30 p-5 text-sm text-gray-700 dark:text-gray-200 space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              How Social Points work
            </h3>
            <p>• Every like on your post gives you 1 SP.</p>
            <p>• Every comment on your post gives you 2 SP.</p>
            <p>• SP is currently calculated for this session only (demo mode).</p>
          </div>
        </div>
      </div>
    </div>
  );
}


