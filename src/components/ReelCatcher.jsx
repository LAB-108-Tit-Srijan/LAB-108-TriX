import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import AIAssistant from './dashboard/AIAssistant';

const demoData = {
  'https://www.instagram.com/reels/manali-snow/': {
    location: 'Sethan Village, Himachal Pradesh',
    mood: 'Adventurous & Cold',
    spots: ['Igloo Village', 'Sethan Valley Point', 'Forbidden Peak Trail'],
    cafes: ['The Lazy Dog', 'Café 1947'],
    stays: [
      { name: 'Sethan Igloo Stay', price: '₹4,500', rating: '4.8' },
      { name: 'Valley View Cabin', price: '₹3,200', rating: '4.6' }
    ],
    time: 'Best visited: Jan - Feb (For Snow)',
    crowd: 'Low'
  },
  'https://www.instagram.com/reels/kerala-monsoon/': {
    location: 'Munnar, Kerala',
    mood: 'Peaceful & Misty',
    spots: ['Lakkam Waterfalls', 'Eravikulam National Park', 'Top Station'],
    cafes: ['Tea Valley Café', 'Rapsy Restaurant'],
    stays: [
      { name: 'Tea Garden Resort', price: '₹8,500', rating: '4.9' },
      { name: 'Mountain Mist Lodge', price: '₹4,200', rating: '4.7' }
    ],
    time: 'Best visited: June - Sept (Monsoon)',
    crowd: 'Moderate'
  },
  'https://www.instagram.com/reels/rajasthan-royalty/': {
    location: 'Udaipur, Rajasthan',
    mood: 'Luxurious & Heritage',
    spots: ['City Palace Lake View', 'Ambrai Ghat', 'Jagmandir Island'],
    cafes: ['Upre by 1506', 'Jheel\'s Ginger Coffee Bar'],
    stays: [
      { name: 'Lake Pichola Palace', price: '₹25,000', rating: '5.0' },
      { name: 'Heritage Haveli Stay', price: '₹12,000', rating: '4.8' }
    ],
    time: 'Best visited: Oct - March',
    crowd: 'High'
  }
};

export default function ReelCatcher() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      // Return specific demo data or a default fallback
      const found = demoData[url.trim()] || {
        location: 'Tirthan Valley, Himachal Pradesh',
        mood: 'Cinematic & Peaceful',
        spots: ['Secret Waterfall Trail', 'Riverside Pebble Beach'],
        cafes: ['The Himalayan Trout Café'],
        stays: [
          { name: 'Riverview Glass Cabin', price: '₹6,500', rating: '4.9' }
        ],
        time: 'Best visited: March - June',
        crowd: 'Very Low'
      };
      setResult(found);
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 relative overflow-hidden" style={{ background: '#EAE6DF' }}>
      {/* Ambient background glows */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full opacity-20 blur-[120px]" style={{ background: '#6F93C4' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full opacity-15 blur-[120px]" style={{ background: '#D9D1BE' }} />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── HERO SECTION ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#6F93C4]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6F93C4]">AI Media Intelligence</span>
              <div className="w-8 h-px bg-[#6F93C4]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-medium text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Turn Reels Into <br /> <span style={{ color: '#6F93C4' }}>Real Journeys.</span>
            </h1>
            <p className="text-lg font-light text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              AI-powered cinematic travel intelligence that transforms viral Instagram reels into immersive Indian travel experiences.
            </p>
          </motion.div>
        </div>

        {/* ── INPUT SECTION ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-24"
        >
          <div 
            className="rounded-[40px] p-10 md:p-12 shadow-2xl relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(32px)',
            }}
          >
            {/* Decorative Reel Icon */}
            <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="1"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-medium text-[#1F2937] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Paste Reel Link to Extract Intelligence</h3>
              
              <form onSubmit={handleAnalyze} className="flex flex-col gap-6">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">🎞️</div>
                  <input
                    type="text"
                    placeholder="Paste Instagram Reel URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-16 pr-6 py-6 rounded-3xl bg-white/60 border border-white/20 outline-none focus:ring-2 focus:ring-[#6F93C4]/20 focus:bg-white transition-all text-sm font-medium"
                    style={{ color: '#1F2937' }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isAnalyzing || !url}
                    className="flex-1 py-5 rounded-2xl text-sm font-bold tracking-widest uppercase text-white shadow-xl hover:shadow-[#6F93C4]/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)' }}
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Analyzing Travel Intelligence...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        <span>Analyze Reel</span>
                      </div>
                    )}
                  </button>
                  
                  <button type="button" className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/40 bg-white/20 backdrop-blur-md hover:bg-white hover:shadow-xl transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  </button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#6B7280] mb-4">Try these Demo Reels:</p>
                <div className="flex flex-col gap-2">
                  {Object.keys(demoData).map((durl, idx) => (
                    <button 
                      key={idx} 
                      type="button"
                      onClick={() => setUrl(durl)}
                      className="text-left px-4 py-2 rounded-xl bg-white/30 hover:bg-white/50 text-[11px] font-medium text-[#6F93C4] transition-all truncate border border-white/10"
                    >
                      {durl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-[#6B7280]">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#D9D1BE]" />)}
                </div>
                <span>Used by 1,200+ cinematic travelers today</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── ANALYSIS RESULTS ── */}
        <AnimatePresence>
          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12"
            >
              {/* Left: AI Summary Card */}
              <div className="flex flex-col gap-8">
                <div 
                  className="rounded-[40px] p-10 overflow-hidden relative"
                  style={{ background: '#6F93C4', color: '#fff', boxShadow: '0 40px 100px rgba(111,147,196,0.25)' }}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70 mb-4 text-white">AI Extraction Verified</div>
                    <h2 className="text-4xl font-medium mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>{result.location}</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">🧠</div>
                        <div>
                          <div className="text-xs opacity-60">Travel Mood</div>
                          <div className="text-sm font-semibold">{result.mood}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">⏳</div>
                        <div>
                          <div className="text-xs opacity-60">Timing</div>
                          <div className="text-sm font-semibold">{result.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">👥</div>
                        <div>
                          <div className="text-xs opacity-60">Crowd Density</div>
                          <div className="text-sm font-semibold">{result.crowd}</div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-12 py-5 rounded-2xl bg-white text-[#6F93C4] text-sm font-bold shadow-2xl hover:scale-105 transition-transform">
                      Save to My Collections
                    </button>
                  </div>
                </div>

                {/* Nearby Stays */}
                <div className="rounded-[40px] p-8 bg-white/40 backdrop-blur-xl border border-white/50">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#1F2937] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6F93C4]" /> Nearby Stays
                  </h3>
                  <div className="flex flex-col gap-4">
                    {result.stays.map((stay, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/60 hover:bg-white transition-all cursor-pointer group shadow-sm border border-transparent hover:border-[#6F93C4]/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#D9D1BE]/20 flex items-center justify-center text-xl">🏨</div>
                          <div>
                            <div className="text-sm font-semibold text-[#1F2937]">{stay.name}</div>
                            <div className="text-[10px] font-bold text-[#6B7280]">⭐ {stay.rating}</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-[#6F93C4]">{stay.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Detected Features */}
              <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Spots Card */}
                  <div className="rounded-[40px] p-8 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-[#6F93C4]/10 flex items-center justify-center text-2xl mb-6">📍</div>
                    <h4 className="text-lg font-medium text-[#1F2937] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Detected Hidden Spots</h4>
                    <div className="flex flex-col gap-3">
                      {result.spots.map(s => (
                        <div key={s} className="flex items-center gap-3 text-sm font-light text-[#6B7280]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6F93C4]" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cafes Card */}
                  <div className="rounded-[40px] p-8 bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-[#D9D1BE]/20 flex items-center justify-center text-2xl mb-6">☕</div>
                    <h4 className="text-lg font-medium text-[#1F2937] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Café Intelligence</h4>
                    <div className="flex flex-col gap-3">
                      {result.cafes.map(c => (
                        <div key={c} className="flex items-center gap-3 text-sm font-light text-[#6B7280]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D9D1BE]" /> {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Mood Visualization */}
                <div className="rounded-[48px] p-12 bg-[#F3F4F6]/50 border border-white/40 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#6F93C4]/5 blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
                  <h4 className="text-sm font-bold tracking-widest uppercase text-[#1F2937] mb-8">AI Atmospheric Analysis</h4>
                  <div className="flex flex-wrap gap-4">
                    {['Peaceful', 'Minimal', 'Cinematic', 'Cold Blue', 'Slow Life'].map(mood => (
                      <div key={mood} className="px-6 py-3 rounded-full bg-white/80 border border-white text-xs font-semibold text-[#1F2937] shadow-sm">
                        {mood}
                      </div>
                    ))}
                  </div>
                  <p className="mt-10 text-sm font-light text-[#6B7280] leading-relaxed max-w-lg">
                    Our vision engine detected deep blues and misty mountain textures. The content suggests an intentional, slow-paced journey through high-altitude Himalayan valleys. Recommended for travelers seeking spiritual and aesthetic clarity.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 p-10 rounded-[40px] bg-white shadow-xl border border-gray-100">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#6F93C4] text-white flex items-center justify-center shadow-lg">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>Plan a Trip to this Location</h4>
                      <p className="text-xs text-[#6B7280]">Import detected intelligence into AI Planner</p>
                    </div>
                  </div>
                  <button className="px-10 py-4 rounded-xl bg-[#1F2937] text-white text-sm font-bold hover:bg-[#6F93C4] transition-all">
                    Start Planning
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
}
