import { useState, useEffect } from 'react';
import CommunityHero from './community/CommunityHero';
import CommunityStories from './community/CommunityStories';
import CommunityFeed from './community/CommunityFeed';
import ChatRoomsList from './community/ChatRoomsList';
import TravelPartnerFinder from './community/TravelPartnerFinder';
import AIAssistant from './dashboard/AIAssistant';
import Footer from './Footer';

export default function CommunityPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* Ambient background glows */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[120px]" style={{ background: '#D9D1BE' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[150px]" style={{ background: '#6F93C4' }} />
      </div>

      <div className="relative z-10 transition-opacity duration-1000" style={{ opacity: visible ? 1 : 0 }}>
        <CommunityHero />
        <CommunityStories />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Feed */}
            <div className="lg:w-2/3">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Trending Discussions</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#6F93C4] text-white text-sm font-semibold rounded-full hover:bg-[#5a7db0] transition-colors">Create Post</button>
                </div>
              </div>
              <CommunityFeed />
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <TravelPartnerFinder />
                <ChatRoomsList />
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <AIAssistant />
      </div>
    </div>
  );
}
