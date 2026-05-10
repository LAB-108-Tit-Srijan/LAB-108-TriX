import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinations } from '../data/exploreData';
import Footer from './Footer';
import AIAssistant from './dashboard/AIAssistant';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dest, setDest] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const found = destinations.find(d => d.id === id);
    if (found) {
      setDest(found);
      setTimeout(() => setVisible(true), 100);
    } else {
      // Fallback
      setDest(destinations[0]);
      setTimeout(() => setVisible(true), 100);
    }
  }, [id]);

  if (!dest) return null;

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <img src={dest.image} alt={dest.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #EAE6DF 0%, transparent 60%)' }} />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-[1440px] mx-auto w-full"
             style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <button onClick={() => navigate(-1)} className="absolute top-24 left-8 md:left-16 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md text-white border border-white/30">{dest.location}</span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#6F93C4] text-white">AI Match: {dest.aiScore}%</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-medium mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>{dest.title}</h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl">{dest.desc}</p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50">
              <h3 className="text-2xl font-medium text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display,serif' }}>AI Travel Intelligence</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#6B7280] mb-1">Vibe</div>
                  <div className="text-sm font-medium text-[#1F2937]">{dest.mood}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#6B7280] mb-1">Crowd Level</div>
                  <div className="text-sm font-medium text-[#1F2937]">{dest.crowdLevel}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#6B7280] mb-1">Best Season</div>
                  <div className="text-sm font-medium text-[#1F2937]">Sep - March</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#6B7280] mb-1">Average Temp</div>
                  <div className="text-sm font-medium text-[#1F2937]">15°C - 22°C</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-medium text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display,serif' }}>Local Experiences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Sunrise Trekking', 'Village Homestay', 'Café Hopping', 'Hidden Waterfall'].map((exp, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 hover:bg-white/80 transition-colors cursor-pointer border border-white/40">
                    <div className="w-12 h-12 rounded-xl bg-[#6F93C4]/10 flex items-center justify-center text-xl">🏔️</div>
                    <div className="font-medium text-sm text-[#1F2937]">{exp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-medium text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display,serif' }}>Plan Your Journey</h3>
              <p className="text-sm font-light text-[#6B7280] mb-6">Let TriPOV AI generate a full cinematic itinerary for {dest.title}.</p>
              <button onClick={() => navigate('/ai-planner')} className="w-full py-4 rounded-xl text-white text-sm font-bold bg-[#6F93C4] hover:bg-[#5a7db0] transition-colors mb-3">
                Generate AI Itinerary
              </button>
              <button onClick={() => navigate('/stays')} className="w-full py-4 rounded-xl text-[#1F2937] text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-colors">
                View Nearby Stays
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
}
