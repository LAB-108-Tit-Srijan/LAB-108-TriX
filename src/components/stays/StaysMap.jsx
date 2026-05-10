import { useState, useEffect, useRef } from 'react';

export default function StaysMap() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24" style={{ background: 'rgba(234,230,223,0.3)' }}>
      <div className="max-w-[1440px] mx-auto px-12">
        <div className="mb-14 text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(32px,3vw,48px)', color: '#1F2937', fontWeight: 400 }}>Map Your Escape</h2>
          <p className="mt-3 text-sm font-light text-gray-500 max-w-xl mx-auto">Explore stay locations, nearby hidden gems, and AI-verified low-crowd zones.</p>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl" 
          style={{ 
            height: '600px',
            opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.98)', 
            transition: 'all 1s ease 200ms' 
          }}>
          {/* Mock Map Image */}
          <div className="absolute inset-0" style={{ background: '#EAE6DF' }}>
             <img src="/kyoto.png" alt="Map Base" className="w-full h-full object-cover opacity-30 grayscale blur-[2px]" />
          </div>

          {/* Map Overlay Gradients */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(234,230,223,0.8) 100%)' }} />

          {/* Interactive Stay Pins */}
          <div className="absolute top-[40%] left-[50%] group">
            <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer transition-transform group-hover:scale-105" style={{ background: 'rgba(111,147,196,0.95)', boxShadow: '0 5px 15px rgba(111,147,196,0.4)' }}>
              <span className="text-white text-xs font-medium">₹18,000</span>
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="/nordfjord.png" alt="Stay preview" className="w-full h-24 object-cover rounded-lg mb-2" />
              <h4 className="font-medium text-sm text-gray-900 px-1">The Glasshouse</h4>
              <p className="text-xs text-gray-500 font-light px-1">98% Match</p>
            </div>
          </div>

          <div className="absolute top-[65%] left-[35%] group">
            <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer bg-white shadow-md transition-transform group-hover:scale-105">
              <span className="text-gray-900 text-xs font-medium">₹8,200</span>
            </div>
          </div>

          <div className="absolute top-[25%] left-[70%] group">
            <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer bg-white shadow-md transition-transform group-hover:scale-105">
              <span className="text-gray-900 text-xs font-medium">₹15,000</span>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/80 backdrop-blur-md shadow-lg text-gray-700 hover:bg-white transition-colors">
              +
            </button>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/80 backdrop-blur-md shadow-lg text-gray-700 hover:bg-white transition-colors">
              -
            </button>
          </div>

          {/* Map Filters */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="px-4 py-2 rounded-full flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-sm cursor-pointer hover:bg-white">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-medium text-gray-700">Show Hidden Gems</span>
            </div>
            <div className="px-4 py-2 rounded-full flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-sm cursor-pointer hover:bg-white">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-medium text-gray-700">Show Safe Zones</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
