import { motion } from 'framer-motion';

export default function StaysHero({ 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter, 
  categories,
  filterTags,
  activeTags,
  setActiveTags,
  maxBudget,
  setMaxBudget
}) {
  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  return (
    <section className="relative pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Cinematic Hospitality Banner */}
        <div className="relative rounded-[2rem] overflow-hidden mb-12 group" style={{ height: '55vh', minHeight: '450px' }}>
          <img src="/stays/kasol_camp.webp" alt="Luxury Riverside Cabin" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.7) 0%, rgba(31,41,55,0.1) 60%)' }} />
          
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <h1 className="text-white mb-4" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(40px,5vw,72px)', lineHeight: 1.1 }}>
              Stay Somewhere<br />Worth Remembering.
            </h1>
            <p className="text-white/80 font-light text-lg max-w-2xl" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
              From luxury lakeside havelis to vibrant backpacker hostels. AI-curated Indian travel experiences for every budget.
            </p>
          </div>
        </div>

        {/* Smart Stay Search System */}
        <div className="max-w-5xl mx-auto -mt-24 relative z-20 px-4 md:px-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] p-4 mb-6 transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row flex-wrap lg:flex-nowrap items-center gap-2" 
            style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 8px 32px rgba(31,41,55,0.08)' }}>
            
            {/* Search Segments */}
            <div className="w-full md:w-auto flex-1 min-w-[200px] px-6 py-3 rounded-xl transition-colors hover:bg-white/40 cursor-text">
              <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">Destination</div>
              <input 
                type="text" 
                placeholder="Where to? (e.g. Goa, Kasol)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-gray-900 placeholder-gray-400" 
              />
            </div>
            
            <div className="w-full md:w-px h-px md:h-10 bg-gray-300/50 block" />
            
            <div className="w-full md:w-auto flex-1 min-w-[150px] px-6 py-3 rounded-xl transition-colors hover:bg-white/40 cursor-text flex gap-4">
              <div className="w-1/2">
                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">Check-in</div>
                <input type="date" className="w-full bg-transparent border-none outline-none text-sm font-medium text-gray-900" />
              </div>
              <div className="w-1/2">
                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">Check-out</div>
                <input type="date" className="w-full bg-transparent border-none outline-none text-sm font-medium text-gray-900" />
              </div>
            </div>

            <div className="w-full md:w-px h-px md:h-10 bg-gray-300/50 block" />
            
            <div className="w-full md:w-auto flex-1 min-w-[150px] px-6 py-3 rounded-xl transition-colors hover:bg-white/40 cursor-text">
              <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">Guests</div>
              <select className="w-full bg-transparent border-none outline-none text-sm font-medium text-gray-900 cursor-pointer">
                <option>2 Guests, 1 Room</option>
                <option>1 Guest, 1 Room (Dorm)</option>
                <option>4 Guests, 2 Rooms</option>
              </select>
            </div>

            <div className="w-full md:w-px h-px md:h-10 bg-gray-300/50 block" />

            {/* AI Toggle */}
            <div className="w-full md:w-auto flex-1 min-w-[180px] px-6 py-3 flex items-center justify-between rounded-xl">
              <div>
                <div className="text-xs font-semibold tracking-wider text-[#6F93C4] uppercase mb-1 flex items-center gap-1">✨ AI Match</div>
                <div className="text-sm font-medium text-gray-900">Low Crowd</div>
              </div>
              <div className="w-10 h-6 rounded-full bg-[#6F93C4]/20 flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-[#6F93C4] transform translate-x-4 transition-transform" />
              </div>
            </div>

            {/* CTA */}
            <button className="h-14 px-8 rounded-full text-sm font-medium text-white transition-all hover:shadow-lg w-full lg:w-auto" style={{ background: 'linear-gradient(135deg,#6F93C4,#B7C6D6)' }}>
              Discover Stays
            </button>
          </motion.div>

          {/* Budget Slider */}
          <div className="mb-6 max-w-2xl mx-auto flex items-center justify-between gap-6 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Max Budget: ₹{maxBudget}</span>
            <input 
              type="range" 
              min="400" 
              max="25000" 
              step="100" 
              value={maxBudget} 
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#6F93C4] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveFilter(c)}
                className="px-5 py-2.5 rounded-full text-sm font-light transition-all duration-300"
                style={{ 
                  background: activeFilter === c ? 'rgba(111,147,196,0.9)' : 'rgba(255,255,255,0.4)',
                  color: activeFilter === c ? '#fff' : '#6B7280',
                  border: activeFilter === c ? '1px solid rgba(111,147,196,0)' : '1px solid rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: activeFilter === c ? '0 4px 15px rgba(111,147,196,0.3)' : 'none'
                }}>
                {c}
              </button>
            ))}
          </div>

          {/* Experience Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterTags && filterTags.map((t) => (
              <button key={t} onClick={() => toggleTag(t)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                style={{ 
                  background: activeTags.includes(t) ? 'rgba(44,62,80,0.8)' : 'rgba(255,255,255,0.3)',
                  color: activeTags.includes(t) ? '#fff' : '#4B5563',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}>
                {t} {activeTags.includes(t) && '✓'}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
