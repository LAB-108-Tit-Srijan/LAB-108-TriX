import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const experiences = [
  { title: 'Artisan Shawl Weaving', type: 'Culture', location: 'Kullu Village', image: '/kyoto.png' },
  { title: 'Wild Herb Foraging', type: 'Food', location: 'Tirthan Forests', image: '/nordfjord.png' },
  { title: 'Monastery Morning Chants', type: 'Spiritual', location: 'Dhankar', image: '/amanzi.png' },
  { title: 'Farm-to-Table Feast', type: 'Dining', location: 'Naggar', image: '/discover.png' },
];

export default function LocalExperiences() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-[1440px] mx-auto px-12">
        <div className="mb-14 flex justify-between items-end" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>Authentic</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,3vw,48px)', color: '#1F2937', fontWeight: 400 }}>Local Experiences</h2>
          </div>
          <button onClick={() => navigate('/explore')} className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all hover:underline" style={{ color: '#6F93C4' }}>
            View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, i) => (
            <div key={i} onClick={() => navigate('/itinerary')} className="group cursor-pointer hover:scale-[1.02] transition-transform"
              style={{ 
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', 
                transition: `all 0.6s ease ${i * 100}ms, transform 0.3s ease` 
              }}>
              <div className="relative rounded-[1.5rem] overflow-hidden mb-4" style={{ height: '320px' }}>
                <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.4) 0%, transparent 60%)' }} />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.85)', color: '#1F2937' }}>
                  {exp.type}
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1 transition-colors group-hover:text-blue-500" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>{exp.title}</h3>
              <div className="flex items-center gap-1.5 text-xs font-light" style={{ color: '#6B7280' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {exp.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
