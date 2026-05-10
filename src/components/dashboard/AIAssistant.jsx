import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const suggestions = [
  'What should I pack for Himachal?',
  'Best hidden gems near Jibhi?',
  'Is it safe to hike in Monsoon?',
  'Suggest a 5-day Spiti itinerary',
];

export default function AIAssistant() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hello! I\'m your TriPOV travel companion. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const send = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((m) => [...m, { from: 'user', text: msg }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'ai', text: 'Namaste! I\'m analyzing India\'s hidden gems and your profile to give you the perfect recommendation. This is a demo response — full Indian AI integration coming soon! 🇮🇳' }]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{
          background: 'linear-gradient(135deg,#6F93C4,#5a7db0)',
          boxShadow: '0 8px 32px rgba(111,147,196,0.4)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-8 z-50 w-96 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(234,230,223,0.96)', backdropFilter: 'blur(24px)',
            border: '1px solid rgba(217,209,190,0.6)',
            boxShadow: '0 24px 80px rgba(31,41,55,0.18)',
            animation: 'fadeUp 0.3s ease forwards',
          }}>
          {/* Header */}
          <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(217,209,190,0.5)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6F93C4,#B7C6D6)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: '#1F2937' }}>TriPOV AI</div>
              <div className="text-xs font-light" style={{ color: '#6B7280' }}>Travel companion</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => navigate('/safety')} className="px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider text-green-700 bg-green-100 hover:bg-green-200 transition-colors">
                Safety
              </button>
              <div className="w-2 h-2 rounded-full" style={{ background: '#6F93C4' }} />
            </div>
          </div>

          {/* Messages */}
          <div className="px-5 py-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: '300px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="px-4 py-3 rounded-2xl text-sm font-light max-w-[80%]"
                  style={{
                    background: m.from === 'user' ? '#6F93C4' : 'rgba(255,255,255,0.7)',
                    color: m.from === 'user' ? '#fff' : '#1F2937',
                    border: m.from === 'ai' ? '1px solid rgba(217,209,190,0.4)' : 'none',
                  }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick suggestions */}
          <div className="px-5 pb-2 flex gap-2 flex-wrap">
            {suggestions.slice(0, 2).map((s, i) => (
              <button key={i} onClick={() => send(s)} className="px-3 py-1.5 rounded-full text-xs font-light transition-all duration-200 hover:shadow-sm"
                style={{ background: 'rgba(111,147,196,0.1)', color: '#6F93C4', border: '1px solid rgba(111,147,196,0.2)' }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 pb-5 pt-2">
            <div className="flex items-center gap-2 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(183,198,214,0.3)' }}>
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask anything about your journey..."
                className="flex-1 bg-transparent text-sm font-light outline-none" style={{ color: '#1F2937' }} />
              <button onClick={() => send()} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105" style={{ background: '#6F93C4' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
