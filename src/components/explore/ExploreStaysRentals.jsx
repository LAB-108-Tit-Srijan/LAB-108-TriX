import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const stays = [
  { name: 'Jibhi Riverside Cabin', type: 'Cabin', price: '₹4,200', rating: '4.8', image: '/nordfjord.png' },
  { name: 'Spiti Desert Camp', type: 'Camp', price: '₹3,500', rating: '4.9', image: '/amanzi.png' },
  { name: 'Udaipur Heritage Haveli', type: 'Heritage', price: '₹12,000', rating: '4.7', image: '/discover.png' },
];

const rentals = [
  { title: 'Royal Enfield Himalayan', type: 'Bike', price: '₹1,500/day', icon: '🏍️' },
  { title: 'Mountain Trekking Kit', type: 'Gear', price: '₹800/day', icon: '🥾' },
  { title: 'High-Altitude Tent', type: 'Camping', price: '₹1,200/day', icon: '⛺' },
];

export default function ExploreStaysRentals() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 pb-32">
      <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Stays - Takes up 2/3 */}
        <div className="lg:col-span-2" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <div className="flex items-center justify-between mb-8">
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '32px', color: '#1F2937' }}>Recommended Stays</h2>
            <button onClick={() => navigate('/stays')} className="text-sm font-medium hover:underline" style={{ color: '#6F93C4' }}>View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stays.map((s, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => navigate('/hotel')}>
                <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: '220px' }}>
                  <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800">
                    ⭐ {s.rating}
                  </div>
                </div>
                <div className="text-xs font-light text-gray-500 mb-1 uppercase tracking-wider">{s.type}</div>
                <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:text-[#6F93C4] transition-colors">{s.name}</h3>
                <div className="text-sm text-gray-600">{s.price} <span className="text-xs font-light">/ night</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Rentals - Takes up 1/3 */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 200ms' }}>
          <div className="flex items-center justify-between mb-8">
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '32px', color: '#1F2937' }}>Experience Rentals</h2>
            <button onClick={() => navigate('/rentals')} className="text-sm font-medium hover:underline" style={{ color: '#6F93C4' }}>View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {rentals.map((r, i) => (
              <div key={i} onClick={() => navigate('/rentals')} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-white/60 transition-colors hover:scale-105" style={{ border: '1px solid rgba(217,209,190,0.4)', background: 'rgba(255,255,255,0.3)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/60 shadow-sm">
                  {r.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{r.title}</h4>
                  <div className="text-xs text-gray-500">{r.type}</div>
                </div>
                <div className="text-sm font-medium" style={{ color: '#6F93C4' }}>{r.price}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
