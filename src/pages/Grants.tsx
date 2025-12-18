import { useState } from 'react';
import { Search, Filter, ExternalLink, Sparkles, Award, Calendar, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface Grant {
  id: string;
  title: string;
  description: string;
  focus: string;
  amount: string;
  deadline: string;
  region: string;
  link: string;
  forStage: string;
}

const grants: Grant[] = [
  {
    id: '1',
    title: 'WomenPreneur Starter Micro-Grant',
    description:
      '₹50,000 micro-grant for idea-stage women founders to validate their first product or service with real customers.',
    focus: 'Idea validation',
    amount: '₹50,000',
    deadline: 'Quarterly · Next: 31 Jan 2026',
    region: 'All India',
    forStage: 'Idea',
    link: '#',
  },
  {
    id: '2',
    title: 'Digital Growth Grant for Women-led SMEs',
    description:
      'Support for women-owned small businesses to go online – covers website, basic branding, and initial digital marketing.',
    focus: 'Digital & e-commerce',
    amount: '₹1,00,000',
    deadline: '15 Mar 2026',
    region: 'Tier 2 & Tier 3 cities',
    forStage: 'Growing',
    link: '#',
  },
  {
    id: '3',
    title: 'Social Impact Women Innovators Fund',
    description:
      'Grant for women entrepreneurs building solutions in health, education, livelihood or climate that impact low-income communities.',
    focus: 'Social impact',
    amount: '₹2,50,000',
    deadline: 'Rolling · Reviewed monthly',
    region: 'All India',
    forStage: 'Early Revenue',
    link: '#',
  },
  {
    id: '4',
    title: 'Creative & Handicrafts Scale-Up Grant',
    description:
      'Funding for women artisans and creative entrepreneurs to expand production, upgrade tools, or participate in fairs.',
    focus: 'Arts & handicrafts',
    amount: '₹75,000',
    deadline: '30 Apr 2026',
    region: 'Rural & semi-urban',
    forStage: 'Growing',
    link: '#',
  },
];

export function Grants() {
  const [ref, isInView] = useInView();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<'All' | 'Idea' | 'Early Revenue' | 'Growing'>('All');

  const filteredGrants = grants.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase()) ||
      g.focus.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === 'All' || g.forStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Award className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Grants for Women Entrepreneurs
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Grants
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover curated grant-style opportunities that help you validate ideas, go digital, and
            scale your women-led business.
          </p>
        </div>

        {/* Search & filters */}
        <div className="glassmorphism p-6 rounded-3xl border border-pink-200/60 dark:border-pink-500/30 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by grant name, focus area, or keywords..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none text-gray-800 dark:text-white text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              <Filter className="w-4 h-4 text-pink-500" />
              <span className="font-semibold">Filter by stage:</span>
            </div>
            {(['All', 'Idea', 'Early Revenue', 'Growing'] as const).map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  stageFilter === stage
                    ? 'bg-pink-100 dark:bg-pink-500/10 border-pink-400 text-pink-700 dark:text-pink-200'
                    : 'bg-white/70 dark:bg-gray-800/70 border-pink-200/60 dark:border-pink-500/30 text-gray-700 dark:text-gray-200 hover:border-pink-400'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr,1.2fr] gap-8">
          {/* Grants list */}
          <div className="space-y-6">
            {filteredGrants.length === 0 ? (
              <div className="glassmorphism p-10 rounded-3xl text-center border border-pink-200/60 dark:border-pink-500/30">
                <p className="text-gray-600 dark:text-gray-300">
                  No grants match your search or filters. Try broadening your keywords or stage.
                </p>
              </div>
            ) : (
              filteredGrants.map((grant) => (
                <div
                  key={grant.id}
                  className="glassmorphism p-6 rounded-3xl border border-pink-200/60 dark:border-pink-500/30 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
                          {grant.focus}
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-200 font-medium">
                          {grant.forStage} stage
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {grant.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {grant.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2 text-right">
                      <div className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                        <Sparkles className="w-4 h-4" />
                        {grant.amount}
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {grant.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-700 dark:text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="font-semibold">Grant Amount</p>
                        <p>{grant.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-semibold">Deadline</p>
                        <p>{grant.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="font-semibold">Region</p>
                        <p>{grant.region}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={grant.link}
                    target={grant.link === '#' ? '_self' : '_blank'}
                    rel={grant.link === '#' ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    View details / Apply
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Guidance column */}
          <div className="space-y-5">
            <div className="glassmorphism p-6 rounded-3xl border border-pink-200/60 dark:border-pink-500/30">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                How to stand out in grant applications
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
                <li>• Be specific about the problem you are solving and who it helps.</li>
                <li>• Show how the grant money will be used in 3–4 clear line items.</li>
                <li>• Add proof: early customers, testimonials, revenue, or pilots.</li>
                <li>• Keep your story simple: 1–2 key numbers, 1 strong founder motivation.</li>
              </ul>
            </div>

            <div className="glassmorphism p-6 rounded-3xl border border-pink-200/60 dark:border-pink-500/30">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                Grant readiness checklist
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
                <li>□ 1-page summary of your business (problem, solution, target customer).</li>
                <li>□ Basic numbers: current monthly revenue or expected first 6 months.</li>
                <li>□ Simple budget for how this grant will be spent.</li>
                <li>□ Links ready: website / storefront / Instagram / WhatsApp catalogue.</li>
                <li>□ A short founder story (why this matters to you).</li>
              </ul>
            </div>

            <div className="glassmorphism p-6 rounded-3xl border border-pink-200/60 dark:border-pink-500/30 text-sm text-gray-700 dark:text-gray-200">
              <p className="font-semibold mb-1">Note</p>
              <p>
                These grants are sample programmes designed inside WomenPreneur to help you think
                about funding. Use this page as a playbook and pair it with real schemes in
                Scheme&nbsp;Finder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


