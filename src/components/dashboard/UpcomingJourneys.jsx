import { useState, useEffect, useRef } from 'react';

const trips = [
  { id: 1, dest: 'Kyoto Canopy', country: 'Japan', dates: 'Jul 4 — Jul 12', image: '/kyoto.png', progress: 0, status: 'Planned', aiStatus: 'Itinerary Ready', weather: '24°C Sunny' },
  { id: 2, dest: 'Amanzi Sands', country: 'Namibia', dates: 'Aug 18 — Aug 25', image: '/amanzi.png', progress: 0, status: 'Upcoming', aiStatus: 'Generating...', weather: '32°C Clear' },
  { id: 3, dest: 'Nordfjord Retreat', country: 'Norway', dates: 'Jun 15 — Jun 22', image: '/nordfjord.png', progress: 60, status: 'Active', aiStatus: 'Live Updates', weather: '18°C Cloudy' },
];

export default function UpcomingJourneys() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,40px)', color: '#1F2937', fontWeight: 400 }}>Upcoming Journeys</h2>
            <p className="mt-1.5 text-sm font-light" style={{ color: '#6B7280' }}>Your curated travel timeline.</p>
          </div>
          <button className="text-sm font-medium flex items-center gap-1.5 group" style={{ color: '#6F93C4' }}>
            View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trips.map((trip, i) => <TripCard key={trip.id} trip={trip} i={i} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

function TripCard({ trip, i, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-3xl overflow-hidden cursor-pointer relative"
      style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${i * 120}ms`,
        boxShadow: hovered ? '0 24px 60px rgba(31,41,55,0.14)' : '0 8px 30px rgba(31,41,55,0.07)',
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="relative" style={{ height: '220px' }}>
        <img src={trip.image} alt={trip.dest} className="w-full h-full object-cover" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.55) 0%, transparent 60%)' }} />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ background: trip.status === 'Active' ? 'rgba(111,147,196,0.9)' : 'rgba(217,209,190,0.7)', color: trip.status === 'Active' ? '#fff' : '#1F2937' }}>
          {trip.status}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-medium" style={{ fontFamily: 'Playfair Display,serif' }}>{trip.dest}</h3>
          <p className="text-white/60 text-xs font-light mt-0.5">{trip.country} · {trip.dates}</p>
        </div>
      </div>
      <div className="p-5" style={{ background: 'rgba(234,230,223,0.95)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span className="text-xs font-light" style={{ color: '#6B7280' }}>{trip.weather}</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(111,147,196,0.1)', color: '#6F93C4' }}>{trip.aiStatus}</span>
        </div>
        {trip.progress > 0 && (
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(183,198,214,0.3)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${trip.progress}%`, background: '#6F93C4' }} />
          </div>
        )}
      </div>
    </div>
  );
}
