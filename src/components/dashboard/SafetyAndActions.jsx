import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const alerts = [
  { type: 'weather', icon: '🌧️', title: 'Rain Expected', desc: 'Light rain forecast in Nordfjord tomorrow, 60% chance.', severity: 'low' },
  { type: 'advisory', icon: '📋', title: 'Local Advisory', desc: 'Mountain trail partially closed due to maintenance until Jun 18.', severity: 'medium' },
  { type: 'scam', icon: '🛡️', title: 'Scam Alert', desc: 'Beware of unofficial taxi operators at Bergen Airport.', severity: 'low' },
];

export default function SafetySnapshot() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          {/* Safety */}
          <div className="rounded-3xl p-8"
            style={{
              background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 20px rgba(31,41,55,0.05)',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'all 0.6s ease',
            }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(111,147,196,0.12)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-medium" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>Safety Snapshot</h3>
                <p className="text-xs font-light" style={{ color: '#6B7280' }}>Active alerts for your destinations</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {alerts.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl transition-all duration-200 hover:shadow-sm cursor-pointer"
                  style={{ background: 'rgba(234,230,223,0.5)', border: '1px solid rgba(217,209,190,0.4)' }}>
                  <span className="text-lg mt-0.5">{a.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: '#1F2937' }}>{a.title}</div>
                    <div className="text-xs font-light mt-0.5" style={{ color: '#6B7280' }}>{a.desc}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-light" style={{ background: a.severity === 'medium' ? 'rgba(217,175,100,0.15)' : 'rgba(111,147,196,0.1)', color: a.severity === 'medium' ? '#B8860B' : '#6F93C4' }}>{a.severity}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/safety')} className="mt-5 w-full py-3 rounded-2xl text-sm font-light flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md hover:bg-gray-50 cursor-pointer" style={{ border: '1px solid rgba(217,209,190,0.7)', color: '#1F2937' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
              View Full Safety Details
            </button>
          </div>

          {/* Quick Actions */}
          <QuickActions visible={visible} />
        </div>
      </div>
    </section>
  );
}

const actions = [
  { title: 'Plan New Journey', path: '/ai-planner', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> },
  { title: 'Explore Hidden Gems', path: '/explore', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { title: 'Book Stays', path: '/stays', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { title: 'Rentals', path: '/rentals', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { title: 'AI Assistant', path: '/ai-planner', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/></svg> },
  { title: 'My Profile', path: '/profile', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

function QuickActions({ visible }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-3xl p-8"
      style={{
        background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 20px rgba(31,41,55,0.05)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)',
        transition: 'all 0.6s ease 150ms',
      }}>
      <h3 className="text-lg font-medium mb-6" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map((a, i) => (
          <button key={i} onClick={() => navigate(a.path)} className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
            style={{ background: 'rgba(234,230,223,0.45)', border: '1px solid rgba(217,209,190,0.4)' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(111,147,196,0.1)' }}>{a.icon}</div>
            <span className="text-xs font-medium text-center" style={{ color: '#1F2937' }}>{a.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
