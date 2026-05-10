import { motion } from 'framer-motion';
import HostSidebar from './HostSidebar';

const forumPosts = [
  { id: 1, title: 'Tips for handling monsoon season in Manali?', author: 'Host Arjun', replies: 12, category: 'Maintenance' },
  { id: 2, title: 'Best photography spots near Old Manali for guests?', author: 'Host Priya', replies: 8, category: 'Experiences' },
  { id: 3, title: 'How to optimize listing for international travelers?', author: 'Host Vikram', replies: 24, category: 'Marketing' },
];

const resources = [
  { title: 'The Premium Hosting Guide 2024', type: 'PDF', size: '4.2 MB' },
  { title: 'Cinematic Photography for Stays', type: 'VIDEO', size: '15:20' },
  { title: 'Managing Guest Expectations', type: 'ARTICLE', size: '5 min read' },
];

export default function HostCommunityPage() {
  return (
    <div className="flex min-h-screen bg-[#EAE6DF]">
      <HostSidebar />

      <main className="flex-1 ml-64 p-8">
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif text-[#1F2937] mb-2"
          >
            Host Collective
          </motion.h1>
          <p className="text-gray-500 font-medium">Connect, collaborate, and grow with the TriPOV host community.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Forum Area */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-[#1F2937]">Host Forum</h2>
                <button className="px-5 py-2 bg-[#1F2937] text-white text-sm font-bold rounded-xl hover:bg-[#6F93C4] transition-all">
                  New Discussion
                </button>
              </div>

              <div className="space-y-4">
                {forumPosts.map((post, idx) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-5 rounded-2xl border border-white/40 bg-white/20 hover:bg-white/50 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-[#6F93C4] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#6F93C4]/10 border border-[#6F93C4]/20">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{post.replies} replies</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#6F93C4] transition-colors mb-1">{post.title}</h3>
                    <p className="text-xs text-gray-500">Started by <span className="font-bold text-gray-700">{post.author}</span> · 2 hours ago</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Event Collaboration */}
            <section className="bg-[#1F2937] text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-serif mb-2">Local Collaboration</h2>
                <p className="text-gray-400 text-sm mb-8">Partner with nearby hosts to create unique multi-stay experiences.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-[#D9D1BE] mb-2 text-sm">Village Food Trail</h4>
                    <p className="text-xs text-gray-300 mb-4">A joint event between 3 hosts in Old Manali.</p>
                    <button className="text-xs font-bold text-white hover:underline">Join Initiative</button>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-[#D9D1BE] mb-2 text-sm">Adventure Bundle</h4>
                    <p className="text-xs text-gray-300 mb-4">Combine stays with rafting and cycling rentals.</p>
                    <button className="text-xs font-bold text-white hover:underline">Propose Bundle</button>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#6F93C4]/20 blur-3xl rounded-full" />
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <section className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#1F2937] mb-6">Learning Center</h2>
              <div className="space-y-6">
                {resources.map((res) => (
                  <div key={res.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D9D1BE]/30 flex items-center justify-center text-lg">
                      {res.type === 'PDF' ? '📄' : res.type === 'VIDEO' ? '🎥' : '📝'}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1F2937] leading-tight mb-1">{res.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#6F93C4] uppercase">{res.type}</span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[10px] text-gray-400">{res.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 rounded-xl border border-[#D9D1BE] text-[#1F2937] text-sm font-bold hover:bg-[#D9D1BE]/20 transition-all">
                Browse All Resources
              </button>
            </section>

            <section className="bg-[#D9D1BE] rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xl font-serif text-[#1F2937] mb-4">Host of the Month</h3>
              <div className="flex items-center gap-4 mb-4">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram" alt="Host" className="w-16 h-16 rounded-full border-2 border-white" />
                <div>
                  <h4 className="font-bold text-[#1F2937]">Vikram Singh</h4>
                  <p className="text-xs text-gray-700">"Peak Luxury Retreats"</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "TriPOV has transformed how I manage my boutique stays. The analytics tools are a game changer!"
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
