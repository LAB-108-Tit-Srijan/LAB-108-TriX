import { motion } from 'framer-motion';
import { filters } from '../../data/exploreData';

export default function ExploreHero({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) {
  const scrollToGrid = () => {
    document.getElementById('destination-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Cinematic Banner */}
        <div className="relative rounded-[3rem] overflow-hidden mb-12 group" style={{ height: '55vh', minHeight: '450px' }}>
          <img src="/discover.png" alt="Discover India" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.75) 0%, rgba(31,41,55,0.2) 60%)' }} />
          
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-white/50" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/70">Curated Indian Escapes</span>
              </div>
              <h1 className="text-white mb-6" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(36px,5vw,80px)', lineHeight: 1.05 }}>
                Discover India<br />Beyond Algorithms.
              </h1>
              <p className="text-white/80 font-light text-lg max-w-2xl mb-10 leading-relaxed">
                Explore hidden mountain villages, serene backwaters, and misty coffee plantations carefully mapped by TriPOV AI for deep emotional resonance.
              </p>
              <button 
                onClick={scrollToGrid}
                className="px-10 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase text-[#1F2937] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ background: '#fff' }}
              >
                Explore Hidden India
              </button>
            </motion.div>
          </div>
        </div>

        {/* AI Discovery Search & Filters */}
        <div className="max-w-4xl mx-auto -mt-24 relative z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-[2.5rem] p-3 mb-10 transition-all duration-300 hover:shadow-2xl" 
            style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(32px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 12px 48px rgba(31,41,55,0.12)' }}>
            <div className="flex items-center gap-4 px-6 py-2">
              <span className="text-2xl">✨</span>
              <input 
                type="text" 
                placeholder="Ask AI: 'hidden cafes in Himachal' or 'peaceful waterfalls in Kerala'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-base font-light py-3"
                style={{ color: '#1F2937' }}
              />
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:bg-white hover:shadow-sm" style={{ color: '#6B7280' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </button>
                <button className="px-8 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase text-white transition-all hover:shadow-xl hover:-translate-y-px" 
                  style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)' }}>
                  Discover
                </button>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className="px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ 
                  background: activeFilter === f ? '#6F93C4' : 'rgba(255,255,255,0.45)',
                  color: activeFilter === f ? '#fff' : '#6B7280',
                  border: '1px solid rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: activeFilter === f ? '0 8px 24px rgba(111,147,196,0.3)' : 'none'
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
