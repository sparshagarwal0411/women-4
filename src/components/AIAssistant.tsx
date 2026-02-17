import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
        { role: 'ai', content: "Hi! I'm Aura, your AI Business Assistant. How can I help you grow your venture today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { profile } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        // Simulated AI response logic tailored to user focus
        setTimeout(() => {
            let aiResponse = "";
            const focus = profile?.business_about?.toLowerCase() || "";

            if (userMessage.toLowerCase().includes('marketing')) {
                aiResponse = `For a ${focus || 'new'} business, I recommend focusing on Instagram Reels and local community groups. Have you tried setting up a Google Business profile yet?`;
            } else if (userMessage.toLowerCase().includes('funding') || userMessage.toLowerCase().includes('money') || userMessage.toLowerCase().includes('loan')) {
                aiResponse = `Since you mentioned ${focus}, the Mudra Loan (Shishu category) seems perfect for your current scale. You can apply for up to ₹50,000 with minimal paperwork. Would you like me to find the application link?`;
            } else if (userMessage.toLowerCase().includes('logo') || userMessage.toLowerCase().includes('design')) {
                aiResponse = `Clean and minimalist designs are trending. For ${focus}, I'd suggest using a palette of soft pastels or bold professional blues. You can use our Storefront Builder to experiment with different themes!`;
            } else {
                aiResponse = `That's a great question about ${userMessage}. Given your focus on ${focus || 'entrepreneurship'}, I'd suggest checking out the 'Digital Marketing' course in our SkillUp section. It covers exactly what you need!`;
            }

            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] glassmorphism-premium rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Aura AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-[10px] opacity-80 uppercase tracking-wider font-bold">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {messages.map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user'
                                        ? 'bg-primary-500 text-white rounded-tr-none'
                                        : 'bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none'
                                        }`}>
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-3 rounded-2xl rounded-tl-none">
                                        <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-100 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask me anything..."
                                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-primary-500/50 outline-none text-sm dark:text-white"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1.5 p-1.5 bg-primary-500 text-white rounded-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-2xl relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                {isOpen ? <X className="relative z-10 w-6 h-6" /> : <Bot className="relative z-10 w-6 h-6" />}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                >
                    <Sparkles className="w-4 h-4 text-yellow-300 fill-current" />
                </motion.div>
            </motion.button>
        </div>
    );
}
