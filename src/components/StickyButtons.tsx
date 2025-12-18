import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function StickyButtons() {
  const [isVisible, setIsVisible] = useState(false);

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

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ElevenLabs AI Voice Assistant – floating widget available on all pages */}
      <elevenlabs-convai agent-id="agent_2701kcrxcxjefxe81hpn81q6e9w3"></elevenlabs-convai>

      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center group animate-fadeIn"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </>
  );
}
