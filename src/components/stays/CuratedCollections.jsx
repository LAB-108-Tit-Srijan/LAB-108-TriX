import { useState, useEffect, useRef } from 'react';

const collections = [
  { title: "Best Riverside Escapes", count: "12 stays", image: "/amanzi.png" },
  { title: "Cinematic Mountain Retreats", count: "8 stays", image: "/nordfjord.png" },
  { title: "Hidden Forest Cabins", count: "15 stays", image: "/discover.png" },
  { title: "Peaceful Solo Stays", count: "24 stays", image: "/kyoto.png" },
];

export default function CuratedCollections() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20" style={{ background: 'rgba(217,209,190,0.15)' }}>
      <div className="max-w-[1440px] mx-auto px-12">
        <div className="flex items-end justify-between mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease' }}>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '32px', color: '#1F2937' }}>Curated Collections</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 200ms' }}>
          {collections.map((c, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] h-[400px] rounded-[2rem] overflow-hidden relative group cursor-pointer">
              <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.8) 0%, transparent 60%)' }} />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs font-medium text-white/80 mb-2">{c.count}</div>
                <h3 className="text-xl text-white font-medium leading-snug" style={{ fontFamily: 'Playfair Display,serif' }}>{c.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
