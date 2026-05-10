import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AIRecommendations({ destinations }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Generate mock recommendations based on the current list
  const recs = (destinations || []).slice(0, 3).map((d, i) => ({
    id: d.id,
    text: i === 0 ? "Because you liked peaceful nature..." : i === 1 ? "Perfect for cinematic solo escapes..." : "Low crowd gems found...",
    suggestion: d.title + " Escapes",
    icon: d.tags.includes('Mountains') ? "🏔️" : d.tags.includes('Beaches') ? "🏖️" : "🌿"
  }));

  if (!recs.length) return null;

  return (
    <section ref={ref} className="py-12 mt-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {recs.map((r, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 50 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => navigate(`/destination/${r.id}`)}
              className="flex-shrink-0 w-80 p-8 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
              style={{ 
                background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(32px)', border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 10px 30px rgba(31,41,55,0.04)'
              }}
            >
              <div className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-2xl mb-6 transition-transform duration-500 group-hover:rotate-12" style={{ background: 'rgba(111,147,196,0.08)', border: '1px solid rgba(111,147,196,0.1)' }}>
                {r.icon}
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#6F93C4' }}>{r.text}</div>
              <h3 className="text-xl font-medium leading-snug" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>{r.suggestion}</h3>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#6B7280]">
                Learn More <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
