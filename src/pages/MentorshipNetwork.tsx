import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Users, Search, Video, Phone, Sparkles, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  is_own: boolean;
}

interface Mentor {
  id: string;
  name: string;
  expertise: string;
  avatar: string;
  online: boolean;
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Anjali Mehta',
    expertise: 'Technology & Startups',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    online: true
  },
  {
    id: '2',
    name: 'Priya Sharma',
    expertise: 'Fashion & Retail',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    online: true
  },
  {
    id: '3',
    name: 'Kavita Reddy',
    expertise: 'Food & Catering',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
    online: false
  },
  {
    id: '4',
    name: 'Meera Iyer',
    expertise: 'Arts & Handicrafts',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    online: true
  }
];

const focusAreas = ["Funding", "Pitch", "Branding", "Pricing", "Hiring", "Legal", "Tech", "Retail"];
const quickPrompts = [
  "Can you review my 3-slide pitch?",
  "How should I price my new product line?",
  "What KPIs should I track this quarter?",
  "Best way to find first 50 customers?"
];

export function MentorshipNetwork() {
  const [ref, isInView] = useInView();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(mentors[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const subscription = localStorage.getItem('subscription') || 'free';
  const userRole = localStorage.getItem('userRole') || 'user';
  const isPro = subscription === 'pro';
  const isMentor = userRole === 'mentor';

  useEffect(() => {
    if (selectedMentor) {
      fetchMessages(selectedMentor.id);
    }
  }, [selectedMentor]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (mentorId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('mentor_id', mentorId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data.map(msg => ({
        id: msg.id,
        sender: msg.sender_name,
        content: msg.content,
        timestamp: new Date(msg.created_at).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        is_own: msg.is_own
      })));
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMentor) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      is_own: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    await supabase.from('messages').insert({
      mentor_id: selectedMentor.id,
      sender_name: 'You',
      content: newMessage,
      is_own: true
    });

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedMentor.name,
        content: "Thank you for your message! I'll get back to you soon with detailed guidance.",
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        is_own: false
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const filteredMentors = mentors.filter(mentor =>
    (mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedFocus || mentor.expertise.toLowerCase().includes(selectedFocus.toLowerCase()))
  );

  const handlePrompt = (prompt: string) => {
    setNewMessage(prompt);
  };

  if (!isPro && !isMentor) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="glassmorphism rounded-3xl border-2 border-pink-500/50 dark:border-pink-400/50 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pro Subscription Required
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Mentorship Network is available exclusively for Pro members. Upgrade to unlock unlimited mentorship sessions and connect with experienced mentors.
            </p>
            <a
              href="/#pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Users className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Connect & Grow</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Mentorship Network
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with experienced mentors and fellow entrepreneurs. Share experiences, get guidance, and grow together.
          </p>
        </div>

        <div className="glassmorphism rounded-2xl p-4 mb-6 border border-pink-200/60 dark:border-pink-500/30">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/70 text-sm font-semibold text-pink-700 dark:text-pink-300">
              <Sparkles className="w-4 h-4" />
              Pick a focus area
            </div>
            {focusAreas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedFocus(selectedFocus === area ? null : area)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${selectedFocus === area
                    ? 'bg-pink-100 dark:bg-pink-500/10 border-pink-400 text-pink-700 dark:text-pink-200'
                    : 'bg-white/70 dark:bg-gray-800/70 border-pink-200/60 dark:border-pink-500/30 text-gray-700 dark:text-gray-200 hover:border-pink-400'
                  }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div className="glassmorphism rounded-3xl overflow-hidden h-[600px] flex">
          <div className="w-full md:w-80 border-r border-pink-200 dark:border-pink-500/30 flex flex-col">
            <div className="p-4 border-b border-pink-200 dark:border-pink-500/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor)}
                  className={`p-4 border-b border-pink-200 dark:border-pink-500/30 cursor-pointer transition-all hover:bg-pink-50 dark:hover:bg-gray-800/50 ${selectedMentor?.id === mentor.id ? 'bg-pink-50 dark:bg-gray-800/50' : ''
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {mentor.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 dark:text-white truncate">{mentor.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{mentor.expertise}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-1 flex-col">
            {selectedMentor ? (
              <>
                <div className="p-4 border-b border-pink-200 dark:border-pink-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedMentor.avatar}
                      alt={selectedMentor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{selectedMentor.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedMentor.expertise}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-pink-100 dark:bg-gray-800 hover:bg-pink-200 dark:hover:bg-gray-700 transition-colors">
                      <Phone className="w-5 h-5 text-pink-500" />
                    </button>
                    <button className="p-2 rounded-lg bg-pink-100 dark:bg-gray-800 hover:bg-pink-200 dark:hover:bg-gray-700 transition-colors">
                      <Video className="w-5 h-5 text-pink-500" />
                    </button>
                  </div>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white/50 to-pink-50/50 dark:from-gray-800/50 dark:to-gray-900/50"
                >
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Start a conversation with {selectedMentor.name}
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.is_own ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${message.is_own
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
                          } rounded-2xl px-4 py-3 shadow-md`}>
                          <p className="text-sm mb-1">{message.content}</p>
                          <p className={`text-xs ${message.is_own ? 'text-pink-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-pink-200 dark:border-pink-500/30">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-gray-800 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">Select a mentor to start chatting</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="glassmorphism p-6 rounded-2xl border border-pink-200/60 dark:border-pink-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Jumpstart the chat</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePrompt(prompt)}
                  className="px-3 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-pink-200/60 dark:border-pink-500/30 text-sm text-gray-700 dark:text-gray-200 hover:border-pink-400"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="glassmorphism p-6 rounded-2xl border border-pink-200/60 dark:border-pink-500/30">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Mentor prep checklist</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
              <li>• Share 2-3 bullets on your goal and current stage.</li>
              <li>• Mention constraints: time, budget, team size.</li>
              <li>• Attach a link to pitch/website if ready.</li>
              <li>• Ask for one concrete next step.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
