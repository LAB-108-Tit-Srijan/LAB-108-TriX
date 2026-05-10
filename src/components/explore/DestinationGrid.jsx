import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DestinationGrid({ destinations }) {
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <section ref={ref} id="destination-grid" className="py-24" style={{ background: 'rgba(234,230,223,0.3)' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-14" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <div className="flex items-end justify-between">
            <div>
              <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,3vw,48px)', color: '#1F2937', fontWeight: 400 }}>Immersive Destinations</h2>
              <p className="mt-2 text-sm font-light text-gray-500 max-w-lg">Wander through breathtaking landscapes carefully mapped by AI for deep emotional resonance.</p>
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#6F93C4]">
              {destinations.length} Destinations Found
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {destinations.map((d, i) => (
              <motion.div
                layout
                key={d.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ${d.gridSpan}`}
                onClick={() => navigate(`/destination/${d.id}`)}
              >
                <img src={d.image} alt={d.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.85) 0%, rgba(31,41,55,0.2) 50%, transparent 100%)' }} />
                
                {/* Save Button */}
                <button 
                  onClick={(e) => toggleSave(e, d.id)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md z-20"
                  style={{ background: saved.includes(d.id) ? '#6F93C4' : 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={saved.includes(d.id) ? '#fff' : 'none'} stroke={saved.includes(d.id) ? '#fff' : '#fff'} strokeWidth="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>

                {/* Tags */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white/90 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    AI Score: {d.aiScore}%
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#D9D1BE' }}>{d.location}</span>
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">{d.crowdLevel} Crowd</span>
                  </div>
                  <h3 className="text-2xl text-white font-medium mb-2" style={{ fontFamily: 'Playfair Display,serif' }}>{d.title}</h3>
                  <p className="text-white/60 text-xs font-light line-clamp-2 group-hover:text-white/90 transition-colors">{d.desc}</p>
                </div>

                {/* Glass Reveal on Hover */}
                <div className="absolute inset-0 bg-[#6F93C4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
