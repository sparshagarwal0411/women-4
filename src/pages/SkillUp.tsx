import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Award, DollarSign, CheckCircle, Star, PlayCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  isFree: boolean;
  hasCertification: boolean;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn the basics of digital marketing including SEO, social media marketing, and email campaigns.',
    instructor: 'Priya Sharma',
    duration: '8 weeks',
    students: 1245,
    rating: 4.8,
    price: 0,
    isFree: true,
    hasCertification: true,
    category: 'Marketing',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'E-commerce Business Setup',
    description: 'Complete guide to setting up and running a successful e-commerce business from scratch.',
    instructor: 'Dr. Anjali Mehta',
    duration: '10 weeks',
    students: 892,
    rating: 4.9,
    price: 2999,
    isFree: false,
    hasCertification: true,
    category: 'Business',
    level: 'Intermediate',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Financial Planning for Entrepreneurs',
    description: 'Master financial planning, budgeting, and investment strategies for your business.',
    instructor: 'Kavita Reddy',
    duration: '6 weeks',
    students: 1567,
    rating: 4.7,
    price: 0,
    isFree: true,
    hasCertification: true,
    category: 'Finance',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Social Media Mastery',
    description: 'Advanced strategies for building your brand and engaging customers on social media platforms.',
    instructor: 'Meera Iyer',
    duration: '12 weeks',
    students: 2103,
    rating: 4.9,
    price: 4999,
    isFree: false,
    hasCertification: true,
    category: 'Marketing',
    level: 'Advanced',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    title: 'Product Photography Basics',
    description: 'Learn professional product photography techniques to showcase your products effectively.',
    instructor: 'Sunita Patel',
    duration: '4 weeks',
    students: 678,
    rating: 4.6,
    price: 0,
    isFree: true,
    hasCertification: false,
    category: 'Design',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    title: 'Business Analytics & Data-Driven Decisions',
    description: 'Use data analytics to make informed business decisions and track your performance metrics.',
    instructor: 'Dr. Anjali Mehta',
    duration: '14 weeks',
    students: 543,
    rating: 4.8,
    price: 6999,
    isFree: false,
    hasCertification: true,
    category: 'Analytics',
    level: 'Advanced',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    title: 'Content Writing for Business',
    description: 'Master the art of writing compelling content for websites, blogs, and marketing materials.',
    instructor: 'Priya Sharma',
    duration: '6 weeks',
    students: 1890,
    rating: 4.7,
    price: 0,
    isFree: true,
    hasCertification: true,
    category: 'Writing',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    title: 'Customer Service Excellence',
    description: 'Learn how to provide exceptional customer service and build lasting customer relationships.',
    instructor: 'Kavita Reddy',
    duration: '5 weeks',
    students: 1123,
    rating: 4.9,
    price: 1999,
    isFree: false,
    hasCertification: true,
    category: 'Business',
    level: 'Intermediate',
    image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '9',
    title: 'Web Development Basics',
    description: 'Introduction to HTML, CSS, and JavaScript to build your own business website.',
    instructor: 'Dr. Anjali Mehta',
    duration: '16 weeks',
    students: 2341,
    rating: 4.8,
    price: 8999,
    isFree: false,
    hasCertification: true,
    category: 'Technology',
    level: 'Intermediate',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '10',
    title: 'Time Management for Entrepreneurs',
    description: 'Effective strategies to manage your time, prioritize tasks, and boost productivity.',
    instructor: 'Meera Iyer',
    duration: '3 weeks',
    students: 987,
    rating: 4.6,
    price: 0,
    isFree: true,
    hasCertification: false,
    category: 'Productivity',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/5905482/pexels-photo-5905482.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  const [ref, isInView] = useInView();
  const [enrolled, setEnrolled] = useState(false);
  const subscription = localStorage.getItem('subscription') || 'free';
  const isPro = subscription === 'pro';
  const freePaidCourseUsed = localStorage.getItem('freePaidCourseUsed') === 'true';

  const handleEnroll = () => {
    if (course.isFree || enrolled) {
      setEnrolled(true);
      alert(`Successfully ${enrolled ? 'already enrolled' : 'enrolled'} in "${course.title}"!`);
    } else if (isPro && !freePaidCourseUsed) {
      // Pro users get one free paid course
      setEnrolled(true);
      localStorage.setItem('freePaidCourseUsed', 'true');
      alert(`Successfully enrolled in "${course.title}"!\n\nThis is your free paid course included with Pro subscription.`);
    } else if (isPro) {
      // Pro users can access all paid courses
      setEnrolled(true);
      alert(`Successfully enrolled in "${course.title}"!\n\nAs a Pro member, you have access to all paid courses!`);
    } else {
      alert(`This is a paid course. Price: ₹${course.price.toLocaleString()}\n\nUpgrade to Pro to access all paid courses and get 1 free paid course!\n\nVisit the Pricing section to upgrade.`);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glassmorphism rounded-2xl border border-pink-200/60 dark:border-pink-500/30 shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {course.isFree && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              FREE
            </span>
          )}
          {course.hasCertification && (
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" />
              Certificate
            </span>
          )}
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            course.level === 'Beginner' ? 'bg-blue-500/90 text-white' :
            course.level === 'Intermediate' ? 'bg-yellow-500/90 text-white' :
            'bg-red-500/90 text-white'
          }`}>
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm text-pink-500 dark:text-pink-400 font-medium">
            {course.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {course.rating}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
          {course.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">{course.instructor}</p>
          </div>
          {!course.isFree && (
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
              <p className={`text-lg font-bold ${isPro ? 'text-green-500' : 'text-pink-500'}`}>
                {isPro ? 'Free (Pro)' : `₹${course.price.toLocaleString()}`}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleEnroll}
          className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            enrolled
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : course.isFree
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
              : isPro
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          {enrolled ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Enrolled
            </>
          ) : course.isFree ? (
            <>
              <PlayCircle className="w-5 h-5" />
              Enroll Free
            </>
          ) : isPro ? (
            <>
              <PlayCircle className="w-5 h-5" />
              Enroll Free (Pro)
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Upgrade to Enroll
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function SkillUp() {
  const navigate = useNavigate();
  const [ref, isInView] = useInView();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  useEffect(() => {
    // Only allow users to access Skill Up
    const userRole = localStorage.getItem('userRole');
    if (!localStorage.getItem('username')) {
      navigate('/login');
    } else if (userRole !== 'user') {
      navigate('/profile');
    }
  }, [navigate]);

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesFree = !showFreeOnly || course.isFree;
    return matchesCategory && matchesLevel && matchesFree;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <BookOpen className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Skill Development</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Skill Up
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Enhance your entrepreneurial skills with our curated courses. Learn from industry experts and get certified.
          </p>
          
          {/* Info Box */}
          {/* <div className="max-w-2xl mx-auto glassmorphism rounded-xl border border-pink-200/60 dark:border-pink-500/30 p-4 mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-pink-500">Fake Login Credentials:</strong> Username: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">demo_user</code> | Password: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">demo123</code>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Use these credentials to access paid courses. All courses are for demonstration purposes.
            </p>
          </div> */}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border border-pink-200/60 dark:border-pink-500/30 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 rounded-xl border border-pink-200/60 dark:border-pink-500/30 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-pink-200/60 dark:border-pink-500/30 bg-white dark:bg-gray-800 cursor-pointer">
            <input
              type="checkbox"
              checked={showFreeOnly}
              onChange={(e) => setShowFreeOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Free Only</span>
          </label>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No courses found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

