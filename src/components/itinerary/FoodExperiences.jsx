import { useState, useEffect, useRef } from 'react';

const foods = [
  { title: 'Riverside Masala Chai', place: 'Beas River Café', desc: 'Handpicked Kangra tea, cardamom, wild honey. Best served at sunset.', type: 'Café', image: '/kyoto.png' },
  { title: 'Siddu & Madra', place: 'Village Kitchen, Naggar', desc: 'Traditional Himachali steamed bread with lentil-chickpea curry. A 300-year-old recipe.', type: 'Local Dish', image: '/discover.png' },
  { title: 'Alpine Berry Pancakes', place: 'Cloud Nine Café', desc: 'Wild Himalayan berries, mountain butter, organic flour from Kullu farms.', type: 'Breakfast', image: '/nordfjord.png' },
  { title: 'Bonfire Thali Experience', place: 'Community Kitchen', desc: 'Seven-dish Himachali thali served under the stars. Live folk music.', type: 'Dinner', image: '/amanzi.png' },
];

export default function FoodExperiences() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="food" className="py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>Culinary Journey</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,44px)', color: '#1F2937', fontWeight: 400 }}>Taste the Mountains</h2>
          <p className="mt-2 text-sm font-light" style={{ color: '#6B7280' }}>Authentic experiences curated for your palate and soul.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {foods.map((f, i) => (
            <div key={i} className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.4)',
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}>
              <div className="relative" style={{ height: '150px' }}>
                <img src={f.image} alt={f.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.3) 0%, transparent 50%)' }} />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(234,230,223,0.9)', color: '#1F2937' }}>{f.type}</div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium mb-1" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>{f.title}</h3>
                <div className="text-xs font-light mb-2" style={{ color: '#6F93C4' }}>{f.place}</div>
                <p className="text-xs font-light leading-relaxed" style={{ color: '#6B7280' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
