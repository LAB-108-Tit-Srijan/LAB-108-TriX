import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const forecast = [
  { day: 'Day 1', temp: '22°C', icon: '☀️', cond: 'Sunny' },
  { day: 'Day 2', temp: '20°C', icon: '⛅', cond: 'Partly Cloudy' },
  { day: 'Day 3', temp: '18°C', icon: '🌤️', cond: 'Clear' },
  { day: 'Day 4', temp: '19°C', icon: '🌧️', cond: 'Light Rain' },
  { day: 'Day 5', temp: '21°C', icon: '☀️', cond: 'Sunny' },
];

const alerts = [
  { icon: '🌧️', title: 'Light rain on Day 4', desc: 'Pack a light rain jacket. Indoor activities planned accordingly.', severity: 'low' },
  { icon: '📋', title: 'Trail Advisory', desc: 'Hampta Pass trail may be slippery — trek poles recommended.', severity: 'medium' },
  { icon: '🛡️', title: 'Safe Region', desc: 'Kullu-Manali corridor is well-monitored. Emergency services available.', severity: 'info' },
];

export default function WeatherSafety() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather */}
          <div className="rounded-3xl p-8" style={{
            background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.4)',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease',
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(111,147,196,0.1)' }}>🌤️</div>
              <div>
                <h3 className="text-lg font-medium" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>Weather Forecast</h3>
                <p className="text-xs font-light" style={{ color: '#6B7280' }}>5-day AI-powered prediction</p>
              </div>
            </div>
            <div className="flex gap-2">
              {forecast.map((f, i) => (
                <div key={i} className="flex-1 text-center p-3 rounded-2xl transition-all duration-200 hover:shadow-sm"
                  style={{ background: i === 0 ? 'rgba(111,147,196,0.1)' : 'rgba(234,230,223,0.4)', border: i === 0 ? '1px solid rgba(111,147,196,0.2)' : '1px solid rgba(217,209,190,0.3)' }}>
                  <div className="text-xs font-light mb-2" style={{ color: '#6B7280' }}>{f.day}</div>
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <div className="text-sm font-semibold" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>{f.temp}</div>
                  <div className="text-xs font-light mt-0.5" style={{ color: '#9CA3AF' }}>{f.cond}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety */}
          <div className="rounded-3xl p-8" style={{
            background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.4)',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease 150ms',
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(111,147,196,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-medium" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>Safety Insights</h3>
                <p className="text-xs font-light" style={{ color: '#6B7280' }}>AI-analyzed advisories</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {alerts.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: 'rgba(234,230,223,0.5)', border: '1px solid rgba(217,209,190,0.3)' }}>
                  <span className="text-lg mt-0.5">{a.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: '#1F2937' }}>{a.title}</div>
                    <div className="text-xs font-light mt-0.5" style={{ color: '#6B7280' }}>{a.desc}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{
                    background: a.severity === 'medium' ? 'rgba(217,175,100,0.15)' : a.severity === 'info' ? 'rgba(111,147,196,0.1)' : 'rgba(183,198,214,0.2)',
                    color: a.severity === 'medium' ? '#B8860B' : '#6F93C4',
                  }}>{a.severity}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => navigate('/safety')} className="text-sm font-medium text-[#6F93C4] hover:underline flex items-center gap-1">
                View Full Safety Dashboard <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
