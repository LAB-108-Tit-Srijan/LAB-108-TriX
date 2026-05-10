import { useState, useEffect, useRef } from 'react';

const budget = [
  { label: 'Accommodation', amount: '₹18,000', pct: 40, icon: '🏨' },
  { label: 'Transport', amount: '₹6,500', pct: 14, icon: '🚗' },
  { label: 'Food & Dining', amount: '₹8,000', pct: 18, icon: '🍜' },
  { label: 'Activities', amount: '₹7,500', pct: 17, icon: '🎯' },
  { label: 'Emergency Buffer', amount: '₹5,000', pct: 11, icon: '🛡️' },
];

export default function BudgetBreakdown() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="budget" className="py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,44px)', color: '#1F2937', fontWeight: 400 }}>Budget Breakdown</h2>
          <p className="mt-2 text-sm font-light" style={{ color: '#6B7280' }}>Transparent AI-estimated costs for your journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          {/* Total + Visual */}
          <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
            <div className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#6F93C4' }}>Estimated Total</div>
            <div className="text-4xl font-semibold mb-1" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>₹45,000</div>
            <div className="text-xs font-light mb-8" style={{ color: '#9CA3AF' }}>5 days · 1 traveler · luxury tier</div>

            {/* Donut-style bar */}
            <div className="flex gap-1 rounded-full overflow-hidden h-3 mb-6" style={{ background: 'rgba(183,198,214,0.15)' }}>
              {budget.map((b, i) => (
                <div key={i} className="h-full transition-all duration-1000" style={{ width: visible ? `${b.pct}%` : '0%', background: i % 2 === 0 ? '#6F93C4' : '#B7C6D6', transitionDelay: `${400 + i * 100}ms`, borderRadius: i === 0 ? '9999px 0 0 9999px' : i === budget.length - 1 ? '0 9999px 9999px 0' : '0' }} />
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {budget.map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: i % 2 === 0 ? '#6F93C4' : '#B7C6D6' }} />
                  <span className="text-xs font-light" style={{ color: '#6B7280' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-3" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease 200ms' }}>
            {budget.map((b, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 hover:shadow-sm"
                style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(111,147,196,0.08)' }}>{b.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: '#1F2937' }}>{b.label}</div>
                  <div className="w-full h-1.5 rounded-full mt-2 overflow-hidden" style={{ background: 'rgba(183,198,214,0.2)' }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: visible ? `${b.pct}%` : '0%', background: 'linear-gradient(90deg,#6F93C4,#B7C6D6)', transitionDelay: `${500 + i * 120}ms` }} />
                  </div>
                </div>
                <div className="text-sm font-semibold" style={{ color: '#6F93C4', fontFamily: 'Playfair Display,serif' }}>{b.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
