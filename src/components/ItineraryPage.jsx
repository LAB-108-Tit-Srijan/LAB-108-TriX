import { useState, useEffect } from 'react';
import Timeline from './itinerary/Timeline';
import HiddenGems from './itinerary/HiddenGems';
import FoodExperiences from './itinerary/FoodExperiences';
import BudgetBreakdown from './itinerary/BudgetBreakdown';
import WeatherSafety from './itinerary/WeatherSafety';
import StaysAndTransport from './itinerary/StaysAndTransport';
import AIAssistant from './dashboard/AIAssistant';
import Footer from './Footer';

export default function ItineraryPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* HERO — Full-width cinematic banner */}
      <section className="relative" style={{ height: 'clamp(420px,55vh,600px)' }}>
        <img src="/nordfjord.png" alt="Himachal Mountains" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.72) 0%, rgba(31,41,55,0.25) 40%, rgba(31,41,55,0.15) 100%)' }} />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 pt-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white/50" />
              <span className="text-xs font-medium tracking-widest uppercase text-white/70">AI-Generated Journey</span>
            </div>
            <h1 className="mb-3" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(36px,5vw,64px)', lineHeight: '1.08', color: '#fff', fontWeight: 500 }}>
              Your Cinematic Escape<br />Through <span style={{ color: '#B7C6D6' }}>Himachal.</span>
            </h1>
            <p className="text-sm font-light text-white/60 max-w-lg mb-6">
              Curated by AI for immersive exploration, hidden moments, and emotionally rich travel experiences.
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '📅', label: '5 Days · Jun 15 – Jun 20' },
                { icon: '🧘', label: 'Peaceful · Nature' },
                { icon: '🌡️', label: '18–24°C · Clear skies' },
                { icon: '💰', label: 'Luxury · ₹45,000 est.' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-light text-white"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <span>{p.icon}</span>{p.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav bar */}
      <div className="sticky top-16 z-30">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-6 py-3 px-6 rounded-2xl -mt-6"
            style={{ background: 'rgba(234,230,223,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(217,209,190,0.5)', boxShadow: '0 4px 20px rgba(31,41,55,0.06)' }}>
            {['Itinerary', 'Hidden Gems', 'Food', 'Budget', 'Stays', 'Transport'].map((n, i) => (
              <a key={i} href={`#${n.toLowerCase().replace(' ', '-')}`} className="text-xs font-light transition-colors duration-200 hover:font-medium whitespace-nowrap"
                style={{ color: i === 0 ? '#6F93C4' : '#6B7280' }}>{n}</a>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl text-xs font-medium text-white transition-all duration-200 hover:shadow-md" style={{ background: '#6F93C4' }}>
                Save Trip
              </button>
              <button className="px-4 py-2 rounded-xl text-xs font-light transition-all duration-200 hover:shadow-sm" style={{ color: '#6B7280', border: '1px solid rgba(217,209,190,0.6)' }}>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <Timeline />
      <HiddenGems />
      <FoodExperiences />
      <BudgetBreakdown />
      <WeatherSafety />
      <StaysAndTransport />
      <Footer />
      <AIAssistant />
    </div>
  );
}
