import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImmersiveShowcase() {
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
        <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
          style={{ 
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', 
            transition: 'all 1s ease' 
          }}>
          
          {/* Left: Image */}
          <div className="lg:w-3/5 h-[500px] lg:h-auto relative">
            <img src="/kyoto.png" alt="Immersive Stay" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-8 left-8">
              <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
                Property of the Month
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-2/5 p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="absolute top-12 right-12 text-sm font-medium px-3 py-1.5 rounded-md bg-gray-100 text-gray-800">
              ⭐ 5.0
            </div>
            
            <h2 className="text-4xl mb-4" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937', lineHeight: 1.2 }}>
              The Himalayan Glasshouse
            </h2>
            <div className="flex items-center gap-1.5 text-sm font-light text-gray-500 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Jibhi, Himachal Pradesh
            </div>

            <p className="text-gray-600 font-light leading-relaxed mb-8">
              Suspended above the Tirthan river, this architectural marvel offers unobstructed 360-degree views of the Great Himalayan National Park. Fall asleep to the sound of rushing water and wake up to sunlight filtering through ancient pine trees.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏔️</span>
                <span className="text-sm font-medium text-gray-700">Mountain Views</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🔥</span>
                <span className="text-sm font-medium text-gray-700">Private Bonfire</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🛁</span>
                <span className="text-sm font-medium text-gray-700">Open Air Bath</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🌿</span>
                <span className="text-sm font-medium text-gray-700">Eco-Luxury</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div>
                <div className="text-2xl font-medium text-gray-900">₹18,000</div>
                <div className="text-xs font-light text-gray-500">per night</div>
              </div>
              <button onClick={() => navigate('/hotel')} className="px-8 py-3.5 rounded-xl text-sm font-medium text-white transition-all hover:shadow-lg hover:-translate-y-px" style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)' }}>
                View Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
