import { useState, useEffect, useRef } from 'react';

const recs = [
  { id: 1, title: 'Hidden Onsen Village', desc: 'A secret hot spring nestled in misty Japanese mountains.', score: 96, tag: 'Hidden Gem', image: '/kyoto.png' },
  { id: 2, title: 'Arctic Aurora Camp', desc: 'Witness the Northern Lights from a luxury glass igloo.', score: 94, tag: 'Nature', image: '/nordfjord.png' },
  { id: 3, title: 'Saharan Stargazing', desc: 'Experience the clearest night skies on Earth.', score: 91, tag: 'Spiritual', image: '/amanzi.png' },
  { id: 4, title: 'Bamboo Forest Meditation', desc: 'Ancient zen practice in thousand-year-old groves.', score: 89, tag: 'Wellness', image: '/kyoto.png' },
];

export default function AIRecommendations() {
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
          <div className="flex items-center gap-2 mb-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/></svg>
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>AI Curated</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,40px)', color: '#1F2937', fontWeight: 400 }}>Recommended for You</h2>
          <p className="mt-1.5 text-sm font-light" style={{ color: '#6B7280' }}>Intelligent picks based on your travel personality.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recs.map((r, i) => <RecCard key={r.id} rec={r} i={i} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

function RecCard({ rec, i, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${i * 100}ms`,
        background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: hovered ? '0 20px 50px rgba(31,41,55,0.12)' : '0 4px 20px rgba(31,41,55,0.05)',
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="relative" style={{ height: '160px' }}>
        <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.4) 0%, transparent 50%)' }} />
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(234,230,223,0.9)', color: '#1F2937', backdropFilter: 'blur(8px)' }}>{rec.tag}</div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium mb-1" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>{rec.title}</h3>
        <p className="text-xs font-light leading-relaxed mb-3" style={{ color: '#6B7280' }}>{rec.desc}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(111,147,196,0.15)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#6F93C4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <span className="text-xs font-medium" style={{ color: '#6F93C4' }}>{rec.score}% match</span>
          </div>
          <button className="text-xs font-medium flex items-center gap-1" style={{ color: '#6F93C4' }}>
            Explore <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
