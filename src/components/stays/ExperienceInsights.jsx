import { useState, useEffect, useRef } from 'react';

const insights = [
  { label: 'Current Crowd', value: 'Very Low', sub: 'Perfect for isolation', icon: '👤', color: '#10B981' },
  { label: 'Weather Forecast', value: '22°C', sub: 'Partly Cloudy, Ideal', icon: '🌤️', color: '#6F93C4' },
  { label: 'Best Season', value: 'Sept - Nov', sub: 'Autumn colors peak', icon: '🍂', color: '#F59E0B' },
  { label: 'Scenic Index', value: '98/100', sub: 'Based on AI analysis', icon: '📸', color: '#8B5CF6' }
];

export default function ExperienceInsights() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-[1440px] mx-auto px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {insights.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              style={{ 
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', 
                transition: `all 0.6s ease ${i * 100}ms` 
              }}>
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{item.label}</div>
              <div className="text-xl font-medium text-gray-900 mb-1" style={{ color: item.color }}>{item.value}</div>
              <div className="text-xs font-light text-gray-400">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
