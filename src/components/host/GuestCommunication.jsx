import { motion } from 'framer-motion';
import { hostMessages } from '../../data/hostData';

export default function GuestCommunication() {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Guest Messages</h2>
        <button className="text-sm font-semibold text-[#6F93C4] hover:underline">Inbox</button>
      </div>

      <div className="flex flex-col gap-4">
        {hostMessages.map((msg, idx) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-colors ${msg.unread ? 'bg-white/80 border-[#6F93C4]/30' : 'bg-white/40 border-white/40 hover:bg-white/60'}`}
          >
            <div className="relative">
              <img src={msg.guestImage} alt={msg.guest} className="w-10 h-10 rounded-full object-cover" />
              {msg.unread && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-sm ${msg.unread ? 'font-bold' : 'font-semibold'} text-gray-900`}>{msg.guest}</h3>
                <span className="text-[10px] text-gray-500">{msg.time}</span>
              </div>
              <p className={`text-xs ${msg.unread ? 'text-gray-900 font-medium' : 'text-gray-600'} line-clamp-2`}>{msg.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-white/50 hover:bg-white/80 rounded-xl text-sm font-semibold text-[#1F2937] transition-colors border border-white/50">
        Message Guests
      </button>
    </div>
  );
}
