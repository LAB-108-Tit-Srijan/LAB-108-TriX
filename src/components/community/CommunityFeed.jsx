import { motion } from 'framer-motion';
import { communityFeed } from '../../data/communityData';

export default function CommunityFeed() {
  return (
    <div className="flex flex-col gap-6">
      {communityFeed.map((post, idx) => (
        <motion.div 
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 hover:bg-white/60 transition-colors"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="text-sm font-bold text-gray-900">{post.user}</h3>
                <p className="text-xs text-gray-500">{post.location} • {post.time}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
            </button>
          </div>

          {/* Content */}
          <p className="text-sm text-gray-800 mb-4 leading-relaxed">{post.content}</p>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-gray-200/50 text-gray-600 px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>

          {/* Image */}
          {post.image && (
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-4 relative group">
              <img src={post.image} alt="Travel Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-300/50">
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#6F93C4] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                {post.comments}
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 text-gray-600 hover:text-[#6F93C4] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              </button>
              <button className="p-1.5 text-gray-600 hover:text-[#6F93C4] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
