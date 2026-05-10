import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StaysHero from './stays/StaysHero';
import FeaturedStays from './stays/FeaturedStays';
import CuratedCollections from './stays/CuratedCollections';
import ImmersiveShowcase from './stays/ImmersiveShowcase';
import ExperienceInsights from './stays/ExperienceInsights';
import StaysMap from './stays/StaysMap';
import AIAssistant from './dashboard/AIAssistant';
import Footer from './Footer';
import { stays as staticStays, stayCategories, filterTags } from '../data/staysData';
import { subscribeToProperties } from '../services/propertyService';

export default function StaysPage() {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTags, setActiveTags] = useState([]);
  const [maxBudget, setMaxBudget] = useState(25000);
  const [liveProperties, setLiveProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    setTimeout(() => setVisible(true), 80); 
    const unsubscribe = subscribeToProperties((data) => {
      setLiveProperties(data);
    });
    return () => unsubscribe();
  }, []);

  const combinedStays = useMemo(() => {
    // Combine static stays with real-time host properties.
    const combined = [...liveProperties, ...staticStays];
    return combined;
  }, [liveProperties]);

  const filteredStays = useMemo(() => {
    return combinedStays.filter(stay => {
      const matchCat = selectedCategory === 'All' || stay.type === selectedCategory;
      const stayName = stay.name || '';
      const stayLoc = stay.location || '';
      const matchSearch = stayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          stayLoc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const price = stay.pricePerNight || 0;
      const matchBudget = price <= maxBudget;
      
      const matchTags = activeTags.length === 0 || 
                        activeTags.some(tag => stay.tags && stay.tags.includes(tag)) ||
                        activeTags.some(tag => stay.amenities && stay.amenities.includes(tag));

      return matchCat && matchSearch && matchBudget && matchTags;
    });
  }, [searchQuery, selectedCategory, activeTags, maxBudget, combinedStays]);

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* Ambient background glows */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[120px]" style={{ background: '#D9D1BE' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[150px]" style={{ background: '#6F93C4' }} />
      </div>

      <div className="relative z-10">
        <StaysHero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={selectedCategory}
          setActiveFilter={setSelectedCategory}
          categories={stayCategories}
          filterTags={filterTags}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
          maxBudget={maxBudget}
          setMaxBudget={setMaxBudget}
        />
        <FeaturedStays 
          stays={filteredStays} 
          onViewDetails={(stay) => navigate(`/hotel/${stay.propertyId || stay.id}`)}
        />
        <CuratedCollections />
        <ImmersiveShowcase />
        <ExperienceInsights />
        <StaysMap />
        <Footer />
        <AIAssistant />
      </div>
    </div>
  );
}
