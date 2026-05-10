import { motion } from 'framer-motion';

export default function NearbyExperiences({ stay }) {
  if (!stay.nearbyPlaces && !stay.localFood) return null;

  return (
    <div className="py-10 border-b border-gray-300">
      <h2 className="text-3xl mb-8 text-[#1F2937]" style={{ fontFamily: 'Playfair Display,serif' }}>
        Nearby Experiences & Places
      </h2>

      {stay.nearbyPlaces && stay.nearbyPlaces.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Local Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stay.nearbyPlaces.map((place, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-white/50 backdrop-blur-md hover:bg-white/60 transition-colors cursor-pointer group"
              >
                <img src={place.image} alt={place.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-[#6F93C4] transition-colors">{place.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{place.distance} • {place.time}</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#6F93C4]/10 text-[#6F93C4] px-2 py-0.5 rounded-md">{place.type}</span>
                    <span className="text-xs bg-gray-200/50 text-gray-600 px-2 py-0.5 rounded-md">{place.crowdLevel} Crowd</span>
                  </div>
                </div>
                <div className="text-[#6F93C4] opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {stay.localFood && stay.localFood.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Authentic Food Spots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stay.localFood.map((food, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 bg-white/40 rounded-2xl border border-white/50 backdrop-blur-md hover:bg-white/60 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{food.name}</h4>
                  <span className="text-xs font-medium bg-[#8B9D83]/10 text-[#8B9D83] px-2 py-1 rounded-md">{food.type}</span>
                </div>
                <p className="text-sm text-gray-600">{food.description}</p>
                <button className="text-xs font-semibold text-[#6F93C4] mt-3 flex items-center gap-1 hover:underline">
                  Save to Wishlist <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
