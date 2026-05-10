import { motion } from 'framer-motion';
import { communityStories } from '../../data/communityData';

export default function CommunityStories() {
  return (
    <section className="py-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>Live Travel Stories</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Add Story Button */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#6F93C4] flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <svg className="w-6 h-6 text-[#6F93C4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <span className="text-xs font-medium text-gray-600">Add Story</span>
          </div>

          {/* User Stories */}
          {communityStories.map((story, idx) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
            >
              <div className={`w-16 h-16 rounded-full p-1 border-2 ${story.viewed ? 'border-gray-300' : 'border-[#6F93C4]'} transition-colors`}>
                <img src={story.image} alt={story.user} className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-xs font-medium text-gray-800">{story.user}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
