import { useState, useEffect, useRef } from 'react';

export default function FeaturedStays({ stays, onViewDetails }) {
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-14" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>AI Curated</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,3vw,48px)', color: '#1F2937', fontWeight: 400 }}>Cinematic Stays</h2>
          <p className="mt-2 text-sm font-light text-gray-500 max-w-lg">Boutique accommodations matched to your emotional travel profile.</p>
        </div>

        {stays.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium">No stays found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stays.map((stay, i) => (
              <div key={stay.id} className="group relative rounded-[2rem] overflow-hidden bg-white flex flex-col"
                style={{ 
                  opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', 
                  transition: `all 0.8s ease ${i * 150}ms`,
                  boxShadow: '0 10px 40px rgba(31,41,55,0.06)'
                }}>
                
                {/* Image Section */}
                <div className="relative h-[300px] md:h-[350px] overflow-hidden cursor-pointer" onClick={() => onViewDetails(stay)}>
                  <img src={stay.image} alt={stay.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* AI Match Badge */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-md text-[#6F93C4] flex items-center gap-1 shadow-sm">
                      ✨ {stay.crowdLevel === 'Low' ? '98' : '92'}% Match
                    </span>
                  </div>
                  
                  {/* Save Button */}
                  <div 
                    onClick={(e) => toggleSave(e, stay.id)}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center transition-colors hover:bg-white cursor-pointer z-10"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={saved[stay.id] ? "#EF4444" : "none"} stroke={saved[stay.id] ? "#EF4444" : "#1F2937"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pb-8 flex-1 flex flex-col relative z-10 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-medium mb-1 line-clamp-1" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>{stay.name}</h3>
                      <div className="flex items-center gap-1.5 text-sm font-light text-gray-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {stay.location}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="text-xl font-semibold text-[#1F2937]">₹{stay.pricePerNight}</div>
                      <div className="text-xs font-light text-gray-500">per night</div>
                    </div>
                  </div>

                  {/* Badges / Weather / Rating */}
                  <div className="flex flex-wrap items-center gap-3 mt-4 mb-4">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-xs font-medium text-green-700">
                      ⭐ {stay.rating} ({stay.reviews})
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-xs font-medium text-blue-700">
                      🌤️ {stay.weather}
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${stay.crowdLevel === 'Low' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'}`}>
                      👥 {stay.crowdLevel} Crowd
                    </div>
                  </div>

                  {/* AI Summary */}
                  <p className="text-sm text-gray-600 font-light mb-6 line-clamp-2">
                    <span className="font-medium text-[#6F93C4]">AI Note:</span> {stay.aiSummary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {stay.features.slice(0, 3).map(feature => (
                      <span key={feature} className="text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-600 bg-gray-50">
                        {feature}
                      </span>
                    ))}
                    {stay.features.length > 3 && <span className="text-xs text-gray-400">+{stay.features.length - 3} more</span>}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto pt-4 flex gap-3 border-t border-gray-100">
                    <button 
                      onClick={() => onViewDetails(stay)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => onViewDetails(stay)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#1F2937] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6F93C4] transition-colors shadow-md"
                    >
                      Book Stay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
