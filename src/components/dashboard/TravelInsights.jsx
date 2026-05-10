import { useState, useEffect, useRef } from 'react';

const insights = [
  { label: 'Budget Used', value: '$2,840', sub: 'of $5,000', pct: 57, icon: '💰' },
  { label: 'Travel Mood', value: 'Serene', sub: 'Based on 12 trips', pct: null, icon: '🧘' },
  { label: 'AI Personality', value: 'Explorer', sub: 'Adventurous & cultural', pct: null, icon: '🧭' },
];

const envPrefs = [
  { name: 'Mountains', pct: 42 },
  { name: 'Ocean', pct: 28 },
  { name: 'Forest', pct: 18 },
  { name: 'Desert', pct: 12 },
];

export default function TravelInsights() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,40px)', color: '#1F2937', fontWeight: 400 }}>Travel Insights</h2>
          <p className="mt-1.5 text-sm font-light" style={{ color: '#6B7280' }}>Your journey analytics at a glance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Left — Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {insights.map((s, i) => (
              <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 4px 20px rgba(31,41,55,0.05)',
                  opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)',
                  transition: `all 0.6s ease ${i * 100}ms`,
                }}>
                <div className="text-2xl mb-4">{s.icon}</div>
                <div className="text-xs font-light mb-1" style={{ color: '#6B7280' }}>{s.label}</div>
                <div className="text-xl font-semibold mb-0.5" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>{s.value}</div>
                <div className="text-xs font-light" style={{ color: '#9CA3AF' }}>{s.sub}</div>
                {s.pct && (
                  <div className="mt-4 w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(183,198,214,0.25)' }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: visible ? `${s.pct}%` : '0%', background: 'linear-gradient(90deg,#6F93C4,#B7C6D6)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right — Environment prefs */}
          <div className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 20px rgba(31,41,55,0.05)',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'all 0.6s ease 300ms',
            }}>
            <div className="text-xs font-medium tracking-widest uppercase mb-5" style={{ color: '#6F93C4' }}>Preferred Environments</div>
            <div className="flex flex-col gap-4">
              {envPrefs.map((e, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-light" style={{ color: '#1F2937' }}>{e.name}</span>
                    <span className="text-xs font-medium" style={{ color: '#6F93C4' }}>{e.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(183,198,214,0.2)' }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: visible ? `${e.pct}%` : '0%', background: 'linear-gradient(90deg,#6F93C4,#B7C6D6)', transitionDelay: `${400 + i * 100}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
