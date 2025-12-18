import { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { supabase } from '../lib/supabase';

interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  eligibility: string;
  funding_range: string;
  deadline: string;
  state: string;
  link: string;
}

export function SchemeFinder() {
  const [ref, isInView] = useInView();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Manufacturing', 'Technology', 'Agriculture', 'Retail', 'Services', 'Handicrafts', 'Education', 'Healthcare', 'Food & Beverage'];
  const states = ['All', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'West Bengal', 'Rajasthan', 'Punjab', 'Haryana'];

  // Fallback schemes if database is empty
  const fallbackSchemes: Scheme[] = [
    {
      id: '1',
      title: 'Pradhan Mantri Mudra Yojana',
      description: 'Micro Units Development & Refinance Agency Ltd. provides loans up to ₹10 lakh to small/micro business enterprises.',
      category: 'Services',
      eligibility: 'Women entrepreneurs aged 18-65 years',
      funding_range: '₹50,000 - ₹10,00,000',
      deadline: 'Ongoing',
      state: 'All States',
      link: 'https://www.mudra.org.in'
    },
    {
      id: '2',
      title: 'Stand-Up India Scheme',
      description: 'Bank loans between ₹10 lakh to ₹1 crore for at least one SC/ST borrower and at least one woman borrower per bank branch.',
      category: 'Services',
      eligibility: 'SC/ST and women entrepreneurs',
      funding_range: '₹10,00,000 - ₹1,00,00,000',
      deadline: 'Ongoing',
      state: 'All States',
      link: 'https://www.standupmitra.in'
    },
    {
      id: '3',
      title: 'Mahila Udyam Nidhi Scheme',
      description: 'Financial assistance for women entrepreneurs in Maharashtra to start or expand their business.',
      category: 'Manufacturing',
      eligibility: 'Women entrepreneurs in Maharashtra',
      funding_range: '₹5,00,000 - ₹50,00,000',
      deadline: '31st March 2025',
      state: 'Maharashtra',
      link: 'https://www.msme.gov.in'
    },
    {
      id: '4',
      title: 'Technology Development Fund',
      description: 'Support for technology-based startups and innovation in the technology sector.',
      category: 'Technology',
      eligibility: 'Women-led tech startups',
      funding_range: '₹25,00,000 - ₹2,00,00,000',
      deadline: '15th June 2025',
      state: 'All States',
      link: 'https://www.dst.gov.in'
    },
    {
      id: '5',
      title: 'Rural Women Entrepreneurship Development',
      description: 'Financial and training support for rural women to start businesses in agriculture and allied sectors.',
      category: 'Agriculture',
      eligibility: 'Rural women entrepreneurs',
      funding_range: '₹1,00,000 - ₹10,00,000',
      deadline: 'Ongoing',
      state: 'All States',
      link: 'https://www.nabard.org'
    },
    {
      id: '6',
      title: 'Handicrafts Export Promotion Scheme',
      description: 'Financial assistance for women artisans to export handicrafts and traditional products.',
      category: 'Handicrafts',
      eligibility: 'Women artisans and exporters',
      funding_range: '₹2,00,000 - ₹20,00,000',
      deadline: '30th September 2025',
      state: 'All States',
      link: 'https://www.epch.in'
    },
    {
      id: '7',
      title: 'Food Processing Business Loan',
      description: 'Specialized loans for women entrepreneurs in food processing and packaging industries.',
      category: 'Food & Beverage',
      eligibility: 'Women in food processing business',
      funding_range: '₹5,00,000 - ₹50,00,000',
      deadline: 'Ongoing',
      state: 'All States',
      link: 'https://www.mofpi.gov.in'
    },
    {
      id: '8',
      title: 'Digital India Startup Hub',
      description: 'Funding and mentorship for women entrepreneurs in digital and e-commerce businesses.',
      category: 'Technology',
      eligibility: 'Women digital entrepreneurs',
      funding_range: '₹10,00,000 - ₹1,00,00,000',
      deadline: 'Ongoing',
      state: 'All States',
      link: 'https://www.startupindia.gov.in'
    },
    {
      id: '9',
      title: 'Retail Business Expansion Grant',
      description: 'Financial support for women to expand existing retail businesses or open new outlets.',
      category: 'Retail',
      eligibility: 'Women retail business owners',
      funding_range: '₹3,00,000 - ₹30,00,000',
      deadline: '31st December 2025',
      state: 'All States',
      link: 'https://www.msme.gov.in'
    },
    {
      id: '10',
      title: 'Healthcare Services Entrepreneurship',
      description: 'Support for women entrepreneurs starting healthcare services, clinics, or wellness centers.',
      category: 'Healthcare',
      eligibility: 'Women healthcare entrepreneurs',
      funding_range: '₹10,00,000 - ₹1,00,00,000',
      deadline: 'Ongoing',
      state: 'All States',
      link: 'https://www.nhsrcindia.org'
    },
    {
      id: '11',
      title: 'Education & Training Services',
      description: 'Funding for women to start educational institutions, training centers, or coaching classes.',
      category: 'Education',
      eligibility: 'Women education entrepreneurs',
      funding_range: '₹5,00,000 - ₹50,00,000',
      deadline: 'Ongoing',
      state: 'All States',
      link: 'https://www.education.gov.in'
    },
    {
      id: '12',
      title: 'Karnataka Women Entrepreneurship Scheme',
      description: 'State-specific scheme providing financial assistance and training for women entrepreneurs in Karnataka.',
      category: 'Services',
      eligibility: 'Women entrepreneurs in Karnataka',
      funding_range: '₹2,00,000 - ₹25,00,000',
      deadline: '28th February 2025',
      state: 'Karnataka',
      link: 'https://www.karnataka.gov.in'
    }
  ];

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('schemes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setSchemes(data);
    } else {
      // Use fallback schemes if database is empty
      setSchemes(fallbackSchemes);
    }
    setLoading(false);
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesState = selectedState === 'All' || scheme.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Scheme Finder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover government schemes, grants, and funding opportunities designed for women entrepreneurs
          </p>
        </div>

        <div className="glassmorphism p-8 rounded-3xl mb-12">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search schemes by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all text-gray-800 dark:text-white"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-pink-500" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">Filters:</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 text-gray-800 dark:text-white outline-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 text-gray-800 dark:text-white outline-none cursor-pointer"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="glassmorphism p-12 rounded-3xl text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No schemes found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredSchemes.map((scheme, index) => (
              <SchemeCard key={scheme.id} scheme={scheme} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SchemeCard({ scheme, index }: { scheme: Scheme; index: number }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`glassmorphism p-6 rounded-3xl hover:scale-105 transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-sm rounded-full font-semibold">
          {scheme.category}
        </span>
        <MapPin className="w-5 h-5 text-pink-500" />
      </div>

      <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
        {scheme.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {scheme.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span className="font-semibold">Funding:</span> {scheme.funding_range}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="font-semibold">Deadline:</span> {scheme.deadline}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 text-purple-500" />
          <span className="font-semibold">State:</span> {scheme.state}
        </div>
      </div>

      <div className="mb-4 p-3 bg-pink-50 dark:bg-gray-800/50 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Eligibility:</span> {scheme.eligibility}
        </p>
      </div>

      <a
        href={scheme.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
      >
        Apply Now
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
