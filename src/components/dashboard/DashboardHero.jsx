import { useState, useEffect } from 'react';

export default function DashboardHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <section className="pt-28 pb-6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-center" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>

          {/* Left — Greeting */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>Travel Operating System</span>
            </div>
            <h1 className="mb-3" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(36px,5vw,64px)', lineHeight: '1.05', color: '#1F2937', fontWeight: 500 }}>
              {greeting}, <span style={{ color: '#6F93C4' }}>Adityansh.</span>
            </h1>
            <p className="text-base font-light max-w-md mb-8" style={{ color: '#6B7280' }}>
              Your next immersive journey awaits. Let your AI companion guide you through curated experiences.
            </p>
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-2xl text-sm font-medium text-white transition-all duration-300 hover:-translate-y-px hover:shadow-lg flex items-center gap-2" style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)', boxShadow: '0 6px 24px rgba(111,147,196,0.3)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/></svg>
                Plan New Journey
              </button>
              <button className="px-6 py-3 rounded-2xl text-sm font-light transition-all duration-300 hover:-translate-y-px hover:shadow-md" style={{ color: '#1F2937', border: '1px solid rgba(217,209,190,0.8)' }}>
                Explore Gems
              </button>
            </div>
          </div>

          {/* Right — Current Trip + Weather */}
          <div className="flex gap-4">
            {/* Current Trip */}
            <div className="flex-1 rounded-3xl overflow-hidden relative" style={{ minHeight: '280px', boxShadow: '0 16px 50px rgba(31,41,55,0.1)' }}>
              <img src="/nordfjord.png" alt="Current Trip" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.65) 0%, transparent 60%)' }} />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{ background: 'rgba(111,147,196,0.85)', backdropFilter: 'blur(8px)' }}>Active Trip</div>
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <h3 className="text-white text-lg font-medium mb-1" style={{ fontFamily: 'Playfair Display,serif' }}>Nordfjord Retreat</h3>
                <p className="text-white/65 text-xs font-light">Jun 15 — Jun 22 · 3 days left</p>
                <div className="mt-3 w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <div className="h-full rounded-full" style={{ width: '60%', background: '#6F93C4' }} />
                </div>
              </div>
            </div>

            {/* Weather + Stats Stack */}
            <div className="flex flex-col gap-4 w-36">
              {/* Weather */}
              <div className="flex-1 rounded-2xl p-4 flex flex-col justify-between" style={{ background: 'rgba(111,147,196,0.1)', border: '1px solid rgba(111,147,196,0.2)' }}>
                <div className="text-3xl">☀️</div>
                <div>
                  <div className="text-2xl font-semibold" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>18°</div>
                  <div className="text-xs font-light" style={{ color: '#6B7280' }}>Norway</div>
                </div>
              </div>
              {/* Trips count */}
              <div className="rounded-2xl p-4" style={{ background: 'rgba(217,209,190,0.35)', border: '1px solid rgba(217,209,190,0.5)' }}>
                <div className="text-2xl font-semibold" style={{ color: '#6F93C4', fontFamily: 'Playfair Display,serif' }}>12</div>
                <div className="text-xs font-light" style={{ color: '#6B7280' }}>Journeys</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
