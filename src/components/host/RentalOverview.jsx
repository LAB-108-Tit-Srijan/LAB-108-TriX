import { motion } from 'framer-motion';
import { hostRentals } from '../../data/hostData';

export default function RentalOverview() {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Active Rentals</h2>
        <button className="text-sm font-semibold text-[#6F93C4] hover:underline">Manage Inventory</button>
      </div>

      <div className="flex flex-col gap-4">
        {hostRentals.map((rental, idx) => (
          <motion.div 
            key={rental.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors border border-white"
          >
            <img src={rental.image} alt={rental.item} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900">{rental.item}</h3>
              <p className="text-xs text-gray-500 mb-2">{rental.category}</p>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="text-[#6F93C4]">{rental.booked} Booked</span>
                <span className="text-[#8B9D83]">{rental.available} Available</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
