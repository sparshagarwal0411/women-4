import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Share2, MessageCircle, X, Loader2 } from 'lucide-react';
import { getGroqResponse, ChatMessage } from '../lib/groq';

export function StickyButtons() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: 'Hello! I\'m your WomenPreneur assistant. How can I help you today?', isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Load ElevenLabs Convai widget script once
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed@beta"]'
    );

    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed@beta';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Keep the script in place so the widget stays available between route changes
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareWebsite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Women-Centric Micro-Entrepreneurship Toolkit',
          text: 'Empowering women entrepreneurs through learning, mentorship, and digital tools',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setError(null);
    setIsLoading(true);

    // Add user message to chat
    setChatMessages(prev => [...prev, { text: userMessage, isBot: false }]);

    try {
      // Get API key from environment variable
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
        throw new Error('Groq API key not configured. Please set VITE_GROQ_API_KEY in your .env file.');
      }

      // Convert chat messages to Groq format
      const groqMessages: ChatMessage[] = chatMessages
        .filter(msg => msg.text !== 'Hello! I\'m your WomenPreneur assistant. How can I help you today?')
        .map(msg => ({
          role: msg.isBot ? 'assistant' : 'user',
          content: msg.text
        }));

      // Add current user message
      groqMessages.push({
        role: 'user',
        content: userMessage
      });

      // Get response from Groq
      const response = await getGroqResponse(groqMessages, apiKey);
      
      // Add bot response to chat
      setChatMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response. Please try again.';
      setError(errorMessage);
      setChatMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please check your API key configuration or try again later.', 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ElevenLabs AI Voice Assistant – floating widget available on all pages */}
      <elevenlabs-convai agent-id="agent_2701kcrxcxjefxe81hpn81q6e9w3"></elevenlabs-convai>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <button
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>

        <button
          onClick={shareWebsite}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-300 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
          aria-label="Share website"
        >
          <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>

        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-300 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
          aria-label="Open chatbot"
        >
          {showChatbot ? (
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          ) : (
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {showChatbot && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] glassmorphism rounded-3xl shadow-2xl z-40 animate-fadeIn">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-t-3xl">
            <h3 className="text-white font-bold text-lg">Chat Assistant</h3>
            <p className="text-pink-100 text-sm">We're here to help!</p>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white/50 to-pink-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.isBot
                    ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
                    : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-pink-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Thinking...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-pink-200 dark:border-pink-500/30 rounded-b-3xl bg-white/50 dark:bg-gray-800/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 outline-none text-sm text-gray-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
