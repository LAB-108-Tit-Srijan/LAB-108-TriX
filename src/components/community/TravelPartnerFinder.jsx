import { motion } from 'framer-motion';
import { travelPartners } from '../../data/communityData';

export default function TravelPartnerFinder() {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Find Travel Partners</h2>
        <button className="text-sm font-semibold text-[#6F93C4] hover:underline">Post Trip</button>
      </div>

      {/* Recommended Match Alert */}
      <div className="mb-6 p-4 bg-[#6F93C4]/10 border border-[#6F93C4]/20 rounded-2xl flex items-start gap-3">
        <div className="text-xl">✨</div>
        <div>
          <h4 className="text-sm font-semibold text-[#2C3E50]">AI Match Found</h4>
          <p className="text-xs text-gray-600">3 travelers are looking for partners to Spiti Valley in December. <a href="#" className="text-[#6F93C4] underline">View Matches</a></p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {travelPartners.map((partner, idx) => (
          <motion.div 
            key={partner.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-2xl bg-white/60 border border-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={partner.avatar} alt={partner.user} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{partner.user}, {partner.age}</h3>
                  <p className="text-xs text-[#6F93C4] font-medium">{partner.destination}</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#1F2937] text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Message
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-3">
              <div className="bg-gray-100/50 p-2 rounded-lg"><span className="font-semibold text-gray-900">Dates:</span> {partner.dates}</div>
              <div className="bg-gray-100/50 p-2 rounded-lg"><span className="font-semibold text-gray-900">Budget:</span> {partner.budget}</div>
              <div className="bg-gray-100/50 p-2 rounded-lg col-span-2"><span className="font-semibold text-gray-900">Style:</span> {partner.style}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {partner.interests.map(interest => (
                <span key={interest} className="text-[10px] bg-[#8B9D83]/10 text-[#8B9D83] px-2 py-0.5 rounded-full">{interest}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
