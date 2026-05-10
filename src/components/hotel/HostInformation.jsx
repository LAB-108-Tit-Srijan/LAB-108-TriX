import { motion } from 'framer-motion';

export default function HostInformation({ stay }) {
  if (!stay.host) return null;

  return (
    <div className="py-10 border-b border-gray-300">
      <h2 className="text-3xl mb-6 text-[#1F2937]" style={{ fontFamily: 'Playfair Display,serif' }}>
        Meet Your Host
      </h2>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white/40 p-6 rounded-2xl border border-white/50 backdrop-blur-md"
      >
        <img 
          src={stay.host.image} 
          alt={stay.host.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{stay.host.name}</h3>
          <p className="text-gray-600 mb-4">{stay.host.description}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="px-3 py-1 bg-[#6F93C4]/10 text-[#6F93C4] text-xs font-medium rounded-full flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Verified Host
            </span>
            <span className="px-3 py-1 bg-[#8B9D83]/10 text-[#8B9D83] text-xs font-medium rounded-full flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> Local Expert
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
