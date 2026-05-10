import { motion } from 'framer-motion';
import { hostBookings } from '../../data/hostData';

export default function UpcomingBookings() {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Upcoming Bookings</h2>
        <button className="text-sm font-semibold text-[#6F93C4] hover:underline">View Calendar</button>
      </div>

      <div className="flex flex-col gap-4">
        {hostBookings.map((booking, idx) => (
          <motion.div 
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-2xl bg-white/60 hover:bg-white/80 transition-colors border border-white flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img src={booking.guestImage} alt={booking.guest} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{booking.guest}</h3>
                  <p className="text-xs text-gray-500">{booking.dates}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${booking.status === 'Confirmed' ? 'bg-[#8B9D83]/20 text-[#8B9D83]' : 'bg-yellow-500/20 text-yellow-700'}`}>
                {booking.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-100/50 p-2 rounded-lg">
                <span className="text-gray-500 block mb-1">Property</span>
                <span className="font-semibold text-gray-900">{booking.property}</span>
              </div>
              <div className="bg-gray-100/50 p-2 rounded-lg">
                <span className="text-gray-500 block mb-1">Room / Type</span>
                <span className="font-semibold text-gray-900">{booking.room}</span>
              </div>
            </div>

            {booking.request && (
              <div className="mt-2 p-2 bg-[#6F93C4]/10 rounded-lg text-xs text-[#1F2937] border-l-2 border-[#6F93C4]">
                <strong>Special Request:</strong> {booking.request}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
