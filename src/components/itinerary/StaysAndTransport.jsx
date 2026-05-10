import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const stays = [
  { name: 'The Himalayan Lodge', type: 'Boutique Hotel', price: '₹6,500/night', rating: '4.9', desc: 'Cedar interiors, river views, farm-to-table dining. AI top pick.', image: '/nordfjord.png', aiPick: true },
  { name: 'Solang Valley Glamping', type: 'Luxury Camp', price: '₹4,200/night', rating: '4.7', desc: 'Heated tents at 3,000m with private stargazing telescope.', image: '/amanzi.png', aiPick: false },
  { name: 'Kullu Heritage Homestay', type: 'Homestay', price: '₹2,800/night', rating: '4.8', desc: 'Traditional wooden home. Home-cooked Himachali meals included.', image: '/kyoto.png', aiPick: false },
];

const transport = [
  { title: 'Mountain Bike Rental', price: '₹800/day', icon: '🚲', desc: 'Hero Impulse for valley exploration. Helmet included.' },
  { title: 'Private Cab Transfer', price: '₹3,500', icon: '🚗', desc: 'Airport to lodge. AC Innova with experienced hill driver.' },
  { title: 'Trek Gear Kit', price: '₹1,200/trip', icon: '🥾', desc: 'Poles, backpack, rain cover, first-aid. Premium quality.' },
  { title: 'Camping Equipment', price: '₹2,000/night', icon: '⛺', desc: 'All-weather tent, sleeping bag, portable stove.' },
];

export default function StaysAndTransport() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Stays */}
      <section ref={ref} id="stays" className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="mb-12" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>AI Curated</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,44px)', color: '#1F2937', fontWeight: 400 }}>Recommended Stays</h2>
            <p className="mt-2 text-sm font-light" style={{ color: '#6B7280' }}>Handpicked accommodations that match your travel soul.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stays.map((s, i) => (
              <div key={i} className="rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease ${i * 120}ms`,
                }}>
                <div className="relative" style={{ height: '180px' }}>
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.4) 0%, transparent 50%)' }} />
                  {s.aiPick && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1" style={{ background: 'rgba(111,147,196,0.9)', backdropFilter: 'blur(8px)' }}>
                      🤖 AI Top Pick
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(234,230,223,0.9)', color: '#1F2937' }}>
                    ⭐ {s.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-light mb-1" style={{ color: '#6F93C4' }}>{s.type}</div>
                  <h3 className="text-base font-medium mb-1" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>{s.name}</h3>
                  <p className="text-xs font-light leading-relaxed mb-4" style={{ color: '#6B7280' }}>{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold" style={{ color: '#1F2937' }}>{s.price}</div>
                    <button onClick={(e) => { e.stopPropagation(); navigate('/hotel'); }} className="px-4 py-2 rounded-xl text-xs font-medium text-white transition-all duration-200 hover:shadow-md" style={{ background: '#6F93C4' }}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transport */}
      <section id="transport" className="pb-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,44px)', color: '#1F2937', fontWeight: 400 }}>Transport & Rentals</h2>
            <p className="mt-2 text-sm font-light" style={{ color: '#6B7280' }}>Everything you need to move through the mountains.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {transport.map((t, i) => (
              <div key={i} onClick={() => navigate('/rentals')} className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)',
                  transition: `all 0.6s ease ${i * 100}ms`,
                }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: 'rgba(111,147,196,0.08)' }}>{t.icon}</div>
                <h3 className="text-sm font-medium mb-1" style={{ color: '#1F2937' }}>{t.title}</h3>
                <p className="text-xs font-light leading-relaxed mb-3" style={{ color: '#6B7280' }}>{t.desc}</p>
                <div className="text-sm font-semibold" style={{ color: '#6F93C4', fontFamily: 'Playfair Display,serif' }}>{t.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
