import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CinematicMap({ destinations }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Use a subset of destinations for markers to keep it clean
  const markers = (destinations || []).slice(0, 5).map((d, i) => ({
    ...d,
    x: 25 + (i * 12),
    y: 35 + (i * 8)
  }));

  return (
    <section className="py-24 overflow-hidden" style={{ background: 'rgba(234,230,223,0.2)' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Map Logic (Left) */}
          <div className="lg:w-1/2 relative">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-px bg-[#6F93C4]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#6F93C4]">Spatial Intelligence</span>
              </div>
              <h2 className="mb-4" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,3vw,48px)', color: '#1F2937', lineHeight: 1.1 }}>
                Interactive <br />Discovery Map.
              </h2>
              <p className="text-sm font-light text-[#6B7280] max-w-md leading-relaxed">
                Browse hidden gems spatially. Our AI identifies zones with low crowd density and high scenic resonance across India.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Himalayas', 'Western Ghats', 'Desert', 'Backwaters'].map(zone => (
                <div key={zone} className="px-5 py-2.5 rounded-xl bg-white border border-gray-100 text-[11px] font-bold text-[#6F93C4] shadow-sm uppercase tracking-widest">
                  {zone}
                </div>
              ))}
            </div>
          </div>

          {/* SVG Map (Right) */}
          <div className="lg:w-1/2 relative bg-white/40 rounded-[3rem] p-8 md:p-12 border border-white/60 backdrop-blur-md min-h-[500px] flex items-center justify-center">
            <div className="w-full max-w-[400px] aspect-[4/5] relative">
              {/* Mock India SVG Outline */}
              <svg viewBox="0 0 100 120" className="w-full h-full opacity-[0.08]" fill="#1F2937">
                <path d="M50 5 L70 20 L85 40 L90 70 L80 90 L50 115 L20 90 L10 70 L15 40 L30 20 Z" />
              </svg>

              {/* Functional Markers */}
              {markers.map((m) => (
                <motion.button
                  key={m.id}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelected(m)}
                  className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                >
                  <div className="w-full h-full rounded-full bg-[#6F93C4]/20 animate-ping absolute" />
                  <div className="w-4 h-4 rounded-full bg-[#6F93C4] border-2 border-white shadow-lg relative flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-white" />
                  </div>
                </motion.button>
              ))}

              {/* Preview Card */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    onClick={() => navigate(`/destination/${selected.id}`)}
                    className="absolute inset-x-0 bottom-4 mx-4 p-5 rounded-[2rem] bg-white shadow-2xl border border-gray-100 z-20 flex items-center gap-5 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="relative w-20 h-20 shrink-0">
                      <img src={selected.image} alt="" className="w-full h-full rounded-2xl object-cover" />
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#6F93C4] flex items-center justify-center text-[10px] text-white font-bold">
                        {selected.aiScore}%
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-[#6F93C4] uppercase mb-1 tracking-widest">{selected.location}</div>
                      <h4 className="text-base font-medium text-[#1F2937] mb-1" style={{ fontFamily: 'Playfair Display,serif' }}>{selected.title}</h4>
                      <p className="text-[11px] text-[#6B7280] font-light line-clamp-1">{selected.desc}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Map UI Floating Elements */}
            <div className="absolute top-8 left-8 px-4 py-2 rounded-xl bg-white/80 border border-white shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F2937]">Live Safety Shield Active</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
