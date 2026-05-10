import { motion } from 'framer-motion';

export default function RentalHero({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories }) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden" style={{ minHeight: '60vh' }}>
      <img src="/kasol.png" alt="Rentals Hero" className="absolute inset-0 w-full h-full object-cover scale-105" style={{ filter: 'brightness(0.6)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(31,41,55,0.2) 0%, #EAE6DF 100%)' }} />
      
      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 z-10 flex flex-col items-center text-center mt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl text-white mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>
            Equip Your Cinematic Adventure
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light mb-12">
            Discover premium bikes, camping gear, and travel equipment for your Indian journey.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl bg-white/20 backdrop-blur-xl border border-white/30 p-2 rounded-3xl flex flex-col md:flex-row gap-2 shadow-2xl"
        >
          <div className="flex-1 bg-white/90 rounded-2xl flex items-center px-4 py-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search equipment, destination..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-gray-800 ml-3 text-sm placeholder-gray-500"
            />
          </div>
          
          <div className="flex-1 bg-white/90 rounded-2xl flex items-center px-4 py-3">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-gray-800 text-sm cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="flex gap-2">
            <input type="date" className="bg-white/90 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none" />
            <input type="date" className="bg-white/90 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none" />
          </div>

          <button className="bg-[#6F93C4] text-white px-8 py-3 rounded-2xl font-bold text-sm tracking-wider uppercase hover:bg-[#5a7db0] transition-colors">
            Find Gear
          </button>
        </motion.div>
      </div>
    </section>
  );
}
