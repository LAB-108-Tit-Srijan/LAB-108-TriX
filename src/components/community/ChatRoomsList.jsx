import { motion } from 'framer-motion';
import { chatRooms } from '../../data/communityData';

export default function ChatRoomsList() {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Travel Chat Rooms</h2>
        <button className="text-sm font-semibold text-[#6F93C4] hover:underline">View All</button>
      </div>
      <div className="flex flex-col gap-4">
        {chatRooms.map((room, idx) => (
          <motion.div 
            key={room.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {room.name}
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </h3>
              <p className="text-xs text-gray-500 mb-1">{room.active} active now • {room.members} members</p>
              <div className="flex gap-2">
                {room.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-gray-200/50 text-gray-600 px-2 py-0.5 rounded-md">{tag}</span>
                ))}
              </div>
            </div>
            <button className="px-4 py-2 bg-[#6F93C4] text-white text-xs font-semibold rounded-xl hover:bg-[#5a7db0] transition-colors">
              Join
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
