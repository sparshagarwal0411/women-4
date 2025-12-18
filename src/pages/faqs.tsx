import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}
// ...existing code...
export const FAQ_PATH = "/faqs";
// ...existing code...
const faqs: FAQItem[] = [
  {
    question: "What is the Women-Centric Micro-Entrepreneurship Toolkit?",
    answer: "Our toolkit is a comprehensive platform designed specifically for women entrepreneurs, offering resources, mentorship, and digital tools to help start and grow your business. It includes learning materials, networking opportunities, and practical business solutions."
  },
  {
    question: "How can I connect with a mentor?",
    answer: "After signing up, you'll have access to our mentorship matching system. You can browse mentor profiles, view their expertise areas, and request connections. Our algorithm also suggests mentors based on your business goals and industry."
  },
  {
    question: "Is this platform only for new entrepreneurs?",
    answer: "No, our platform caters to entrepreneurs at all stages - from those just starting to established business owners looking to scale. We have different resource tracks tailored to various business maturity levels."
  },
  {
    question: "What types of learning resources are available?",
    answer: "We offer a variety of resources including video tutorials, interactive workshops, downloadable templates, case studies, and live webinars. Topics cover business planning, marketing, finance, digital skills, and more."
  },
  {
    question: "How much does it cost to join?",
    answer: "We offer different membership tiers to suit various needs. The basic membership is free and includes access to essential resources. Premium memberships with additional features and personalized support are available at competitive rates."
  },
  {
    question: "Can I access the platform on mobile devices?",
    answer: "Yes, our platform is fully responsive and can be accessed on any device. We also have a mobile app available for both iOS and Android for convenient on-the-go access."
  },
  {
    question: "How do you support rural entrepreneurs?",
    answer: "We have specific programs designed for rural entrepreneurs, including offline resource access, regional language support, and connections to local business networks. We also provide guidance on accessing government schemes and financial aid."
  },
  {
    question: "What kind of support do you offer after business launch?",
    answer: "We provide ongoing support through our community forums, regular check-ins with mentors, growth tracking tools, and advanced training modules. We also help connect you with potential partners and investors."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our platform and services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-pink-200/50 dark:border-pink-500/30 rounded-xl overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-md"
              initial={false}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-pink-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}