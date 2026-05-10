import { useState, useEffect, useRef } from 'react';

const gems = [
  { title: 'Fairy Forest Waterfall', type: 'Nature', desc: 'A hidden cascade tucked behind ancient deodar trees. Only accessible via a unmarked trail.', score: 97, image: '/discover.png' },
  { title: 'Monk\'s Sunrise Ledge', type: 'Spiritual', desc: 'A sacred cliff where monks meditate at dawn. 360° views of five mountain ranges.', score: 95, image: '/nordfjord.png' },
  { title: 'Cloud Nine Café', type: 'Café', desc: 'Perched at 2,800m, this café serves Himalayan honey latte with cedar-smoked pastries.', score: 93, image: '/kyoto.png' },
  { title: 'Forgotten Stone Village', type: 'Culture', desc: 'A 400-year-old settlement where time stands still. Hand-carved stone temples.', score: 91, image: '/amanzi.png' },
];

export default function HiddenGems() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="hidden-gems" className="py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>AI Discovered</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,44px)', color: '#1F2937', fontWeight: 400 }}>Hidden Gems Along Your Path</h2>
          <p className="mt-2 text-sm font-light" style={{ color: '#6B7280' }}>Secret places most travelers never find. AI-curated just for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gems.map((g, i) => (
            <div key={i} className="rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-xl"
              style={{
                background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.4)',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 120}ms`,
              }}>
              <div className="grid grid-cols-[40%_60%]">
                <div className="relative" style={{ minHeight: '200px' }}>
                  <img src={g.image} alt={g.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 70%, rgba(255,255,255,0.3) 100%)' }} />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(234,230,223,0.9)', color: '#6F93C4', backdropFilter: 'blur(8px)' }}>🔮 {g.type}</div>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-base font-medium mb-2" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>{g.title}</h3>
                  <p className="text-xs font-light leading-relaxed mb-4" style={{ color: '#6B7280' }}>{g.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(111,147,196,0.12)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#6F93C4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#6F93C4' }}>{g.score}% match</span>
                    </div>
                    <button className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#6F93C4' }}>
                      Explore <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
