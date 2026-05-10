import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const gems = [
  { 
    id: 'tirthan-valley',
    name: 'Jibhi Waterfall Trail', 
    desc: 'A hidden moss-covered cascade deep within the Tirthan Valley forest. Cinematic sunlight filtering through ancient deodars.',
    score: 98, crowd: 'Very Low', time: 'Early Morning', image: '/nordfjord.png'
  },
  { 
    id: 'spiti-valley',
    name: 'Naggar Castle Views', 
    desc: 'Historic architecture meets endless mountain panoramas. A place where time stands still.',
    score: 94, crowd: 'Moderate', time: 'Sunset', image: '/kyoto.png'
  }
];

export default function FeaturedGems() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-[1440px] mx-auto px-12">
        <div className="mb-14" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>AI Curated</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,3vw,48px)', color: '#1F2937', fontWeight: 400 }}>Featured Hidden Gems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gems.map((g, i) => (
            <div key={i} onClick={() => navigate(`/destination/${g.id}`)} className="group relative rounded-[2rem] overflow-hidden cursor-pointer"
              style={{ 
                height: '500px',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', 
                transition: `all 0.8s ease ${i * 200}ms` 
              }}>
              <img src={g.image} alt={g.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.8) 0%, rgba(31,41,55,0.2) 50%, transparent 100%)' }} />
              
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)', color: '#6F93C4' }}>
                  ✨ {g.score}% Match
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white backdrop-blur-md" style={{ background: 'rgba(31,41,55,0.4)' }}>
                  {g.crowd} Crowd
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">{g.time}</div>
                <h3 className="text-white mb-3" style={{ fontFamily: 'Playfair Display,serif', fontSize: '28px' }}>{g.name}</h3>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-6 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {g.desc}
                </p>
                <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all group-hover:bg-white" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-gray-900"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
