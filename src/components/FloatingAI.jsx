import { useState, useRef, useEffect } from 'react';
import { sendMessage, resetChat } from '../services/aiService';

const suggestions = [
  '🗺️ Best places near Manali?',
  '💰 Budget for Goa 5 days?',
  '🍽️ Best street food in Delhi?',
  '📅 3-day Jaipur itinerary',
  '⚠️ Monsoon travel safety tips',
  '🏔️ Hidden gems in Northeast India',
];

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Namaste! 🙏 I'm **TriPOV AI** — your personal travel concierge for India.\n\nAsk me about places, food, budgets, maps, safety, itineraries — anything!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim() || isTyping) return;
    setMessages(m => [...m, { from: 'user', text: msg }]);
    setInput('');
    setIsTyping(true);
    try {
      const reply = await sendMessage(msg);
      setMessages(m => [...m, { from: 'ai', text: reply }]);
    } catch {
      setMessages(m => [...m, { from: 'ai', text: "Sorry, I couldn't process that. Please try again! 🙏" }]);
    }
    setIsTyping(false);
  };

  const handleReset = () => {
    resetChat();
    setMessages([{ from: 'ai', text: "Chat reset! 🙏 How can I help you with your travel plans?" }]);
  };

  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <>
      {/* Floating Orb Button */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-7 right-7 w-14 h-14 rounded-full flex items-center justify-center z-[9999] transition-all duration-300 hover:scale-110 group"
        style={{
          background: open ? '#1F2937' : 'linear-gradient(135deg,#6F93C4,#5a7db0)',
          boxShadow: open ? '0 8px 32px rgba(31,41,55,0.5)' : '0 8px 32px rgba(111,147,196,0.5)',
        }}>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-7 z-[9999] w-[400px] max-h-[75vh] rounded-3xl overflow-hidden flex flex-col"
          style={{
            background: 'rgba(234,230,223,0.97)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(217,209,190,0.6)',
            boxShadow: '0 24px 80px rgba(31,41,55,0.22)',
            animation: 'tripovFadeUp 0.3s ease forwards',
          }}>

          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(217,209,190,0.5)', background: 'rgba(255,255,255,0.3)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6F93C4,#B7C6D6)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2z"/><path d="M2 12h20"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold" style={{ color: '#1F2937' }}>TriPOV AI</div>
              <div className="text-[10px] font-medium flex items-center gap-1" style={{ color: '#6F93C4' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Travel Concierge • Powered by Gemini
              </div>
            </div>
            <button onClick={handleReset} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors" title="Reset chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3" style={{ maxHeight: '380px', minHeight: '200px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="px-4 py-3 rounded-2xl text-[13px] leading-relaxed max-w-[85%]"
                  style={{
                    background: m.from === 'user' ? '#6F93C4' : 'rgba(255,255,255,0.8)',
                    color: m.from === 'user' ? '#fff' : '#1F2937',
                    border: m.from === 'ai' ? '1px solid rgba(217,209,190,0.4)' : 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}>
                  {m.from === 'ai' ? formatText(m.text) : m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                  style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(217,209,190,0.4)' }}>
                  <span className="w-2 h-2 bg-[#6F93C4] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#6F93C4] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#6F93C4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {suggestions.slice(0, 3).map((s, i) => (
              <button key={i} onClick={() => send(s)}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:shadow-sm hover:-translate-y-0.5"
                style={{ background: 'rgba(111,147,196,0.1)', color: '#6F93C4', border: '1px solid rgba(111,147,196,0.2)' }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-1">
            <div className="flex items-center gap-2 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(183,198,214,0.3)' }}>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about places, food, budget..."
                disabled={isTyping}
                className="flex-1 bg-transparent text-sm outline-none disabled:opacity-50" style={{ color: '#1F2937' }} />
              <button onClick={() => send()} disabled={isTyping || !input.trim()}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-40"
                style={{ background: '#6F93C4' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes tripovFadeUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
