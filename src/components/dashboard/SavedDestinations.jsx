import { useState, useEffect, useRef } from 'react';

const collections = [
  { title: 'Himalayan Escapes', count: 5, images: ['/nordfjord.png'] },
  { title: 'Kerala Backwaters', count: 3, images: ['/kyoto.png'] },
  { title: 'Rajasthan Royalty', count: 4, images: ['/amanzi.png'] },
  { title: 'Goa Hidden Beaches', count: 2, images: ['/discover.png'] },
];

export default function SavedDestinations() {
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
        <div className="flex items-end justify-between mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,40px)', color: '#1F2937', fontWeight: 400 }}>Saved Collections</h2>
            <p className="mt-1.5 text-sm font-light" style={{ color: '#6B7280' }}>Your curated wishlist of dream destinations.</p>
          </div>
          <button className="text-sm font-medium flex items-center gap-1.5" style={{ color: '#6F93C4' }}>
            View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((c, i) => (
            <div key={i} className="group cursor-pointer rounded-2xl overflow-hidden"
              style={{
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}>
              <div className="relative" style={{ height: '180px' }}>
                <img src={c.images[0]} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.55) 0%, transparent 50%)' }} />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-sm font-medium" style={{ fontFamily: 'Playfair Display,serif' }}>{c.title}</h3>
                  <p className="text-white/60 text-xs font-light mt-0.5">{c.count} saved</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110" style={{ background: 'rgba(234,230,223,0.85)', backdropFilter: 'blur(8px)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#6F93C4" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
