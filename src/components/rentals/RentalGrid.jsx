import { motion } from 'framer-motion';

export default function RentalGrid({ rentals, onBook }) {
  if (rentals.length === 0) {
    return (
      <div className="py-24 text-center">
        <h3 className="text-2xl text-gray-500 font-medium">No equipment found matching your criteria.</h3>
      </div>
    );
  }

  return (
    <section className="py-12 max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rentals.map((rental, i) => (
          <motion.div
            key={rental.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={rental.image} 
                alt={rental.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold tracking-wider text-[#1F2937]">
                {rental.category.split(' ')[0]}
              </div>
              
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/90 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>

              {/* AI Recommendation Chip */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-[#6F93C4]/90 backdrop-blur-md p-3 rounded-xl border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-xs font-bold tracking-wider uppercase">✨ AI Pick</span>
                  </div>
                  <p className="text-white/90 text-[11px] leading-tight">{rental.aiRec}</p>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1 bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl text-[#1F2937] font-medium leading-snug" style={{ fontFamily: 'Playfair Display,serif' }}>
                  {rental.title}
                </h3>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                  <span className="text-[#F59E0B] text-sm">★</span>
                  <span className="text-xs font-bold text-gray-700">{rental.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 font-light mb-4 line-clamp-2">{rental.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {rental.specs.slice(0, 2).map(spec => (
                  <span key={spec} className="px-2 py-1 bg-[#EAE6DF]/50 text-[#1F2937] text-[10px] font-medium uppercase tracking-wider rounded-md">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Price</div>
                  <div className="text-lg font-bold text-[#6F93C4]">
                    ₹{rental.price} <span className="text-xs font-light text-gray-500">/ day</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onBook(rental); }}
                    className="px-5 py-2 bg-[#1F2937] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#6F93C4] transition-colors shadow-lg hover:shadow-[#6F93C4]/30"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
