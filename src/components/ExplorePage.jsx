import { useState, useEffect, useMemo } from 'react';
import ExploreHero from './explore/ExploreHero';
import AIRecommendations from './explore/AIRecommendations';
import FeaturedGems from './explore/FeaturedGems';
import DestinationGrid from './explore/DestinationGrid';
import LocalExperiences from './explore/LocalExperiences';
import CinematicMap from './explore/CinematicMap';
import ExploreStaysRentals from './explore/ExploreStaysRentals';
import AIAssistant from './dashboard/AIAssistant';
import Footer from './Footer';
import { destinations } from '../data/exploreData';

export default function ExplorePage() {
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(d => {
      const matchesFilter = activeFilter === 'All' || d.tags.includes(activeFilter);
      const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           d.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* Ambient background glows */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[120px]" style={{ background: '#B7C6D6' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[150px]" style={{ background: '#6F93C4' }} />
      </div>

      <div className="relative z-10">
        <ExploreHero 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <AIRecommendations destinations={filteredDestinations} />
        
        <FeaturedGems />
        
        <DestinationGrid destinations={filteredDestinations} />
        
        <LocalExperiences />
        
        <CinematicMap destinations={filteredDestinations} />
        
        {/* Reel Catcher Integration */}
        <section className="py-24 bg-[#1F2937]">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center gap-12 p-12 md:p-16 rounded-[4rem] bg-[#2D3748] relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#6F93C4]/10 blur-[100px] rounded-full" />
              
              <div className="md:w-1/2 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px bg-[#6F93C4]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#6F93C4]">New Intelligence Tool</span>
                </div>
                <h2 className="text-white mb-6" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,3vw,56px)', lineHeight: 1.1 }}>
                  Seen this place <br /> in a Reel?
                </h2>
                <p className="text-white/60 font-light text-lg mb-10 leading-relaxed">
                  Paste any Instagram travel reel URL and our vision AI will extract the location, cafés, and hidden gems for you.
                </p>
                <button 
                  onClick={() => window.location.href='/reel-catcher'}
                  className="px-10 py-5 rounded-2xl text-sm font-bold tracking-widest uppercase bg-[#6F93C4] text-white hover:shadow-[0_20px_50px_rgba(111,147,196,0.3)] transition-all"
                >
                  Analyze Reel
                </button>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img src="/kasol.png" alt="Reel Inspiration" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ExploreStaysRentals />
        <Footer />
        <AIAssistant />
      </div>
    </div>
  );
}
