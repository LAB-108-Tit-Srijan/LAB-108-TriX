import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const budgetMap = ['₹15k-30k', '₹30k-80k', '₹80k-2L', '₹2L+'];
const moodMap = { peaceful: '🧘 Peaceful', adventurous: '🏔️ Adventurous', luxury: '💎 Luxury', nature: '🌿 Nature', nightlife: '🌃 Nightlife', spiritual: '🕯️ Spiritual', cinematic: '🎬 Cinematic' };

const generatedItinerary = [
  { day: 1, title: 'Arrival & Valley Immersion', desc: 'Settle into your luxury riverside cottage in Jibhi. Evening bonfire.', image: '/kasol.png' },
  { day: 2, title: 'Hidden Waterfall Trek', desc: 'AI-guided trek to a secret cascade in Tirthan. Picnic lunch.', image: '/munnar.png' },
  { day: 3, title: 'Local Culture & Café Hopping', desc: 'Visit ancient Naggar Castle. Explore hidden mountain cafés.', image: '/udaipur.png' },
  { day: 4, title: 'Spiritual Retreat', desc: 'Morning meditation at a local monastery. Stargazing session.', image: '/manali.png' },
];

const hiddenGems = [
  { name: 'Sethan Village', type: 'Igloo Stay', score: 97 },
  { name: 'Kutla Glacier', type: 'Trek', score: 94 },
  { name: 'Artisan Wood Café', type: 'Café', score: 91 },
];

export default function AIPreviewPanel({ data, generating, generated }) {
  const [animStep, setAnimStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (generating) {
      setAnimStep(0);
      const t1 = setTimeout(() => setAnimStep(1), 600);
      const t2 = setTimeout(() => setAnimStep(2), 1400);
      const t3 = setTimeout(() => setAnimStep(3), 2200);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [generating]);

  return (
    <div className="lg:sticky lg:top-28 flex flex-col gap-5">
      {/* Status header */}
      <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 20px rgba(31,41,55,0.04)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6F93C4,#B7C6D6)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <div>
            <div className="text-sm font-medium" style={{ color: '#1F2937' }}>AI Journey Preview</div>
            <div className="text-xs font-light" style={{ color: generating ? '#6F93C4' : '#9CA3AF' }}>
              {generating ? 'Generating your cinematic journey...' : generated ? 'Journey ready to explore' : 'Configure your preferences to begin'}
            </div>
          </div>
          {(generating || generated) && <div className="ml-auto w-2.5 h-2.5 rounded-full" style={{ background: generating ? '#D9AF64' : '#6F93C4', animation: generating ? 'pulse 1.5s infinite' : 'none' }}/>}
        </div>

        {/* Live config summary */}
        <div className="flex flex-wrap gap-2">
          {data.destination && <Tag label={data.destination} />}
          <Tag label={budgetMap[data.budget]} />
          <Tag label={moodMap[data.mood] || data.mood} />
          <Tag label={data.travelerType} />
        </div>
      </div>

      {/* Loading animation */}
      {generating && (
        <div className="rounded-3xl p-8 flex flex-col items-center justify-center" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', minHeight: '300px' }}>
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(111,147,196,0.2)', borderTopColor: '#6F93C4' }}/>
            <div className="absolute inset-2 rounded-full border-2 border-b-transparent animate-spin" style={{ borderColor: 'rgba(183,198,214,0.2)', borderBottomColor: '#B7C6D6', animationDirection: 'reverse', animationDuration: '1.5s' }}/>
            <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl">🧠</span></div>
          </div>
          <div className="text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
            {animStep === 0 && 'Analyzing destinations...'}
            {animStep === 1 && 'Curating hidden gems...'}
            {animStep === 2 && 'Building itinerary...'}
            {animStep === 3 && 'Finalizing your journey...'}
          </div>
          <div className="w-48 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(183,198,214,0.2)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${((animStep+1)/4)*100}%`, background: 'linear-gradient(90deg,#6F93C4,#B7C6D6)' }}/>
          </div>
        </div>
      )}

      {/* Generated itinerary */}
      {generated && !generating && (
        <>
          {/* Itinerary cards */}
          <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
            <h3 className="text-sm font-medium mb-4" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>Generated Itinerary</h3>
            <div className="flex flex-col gap-3">
              {generatedItinerary.map((d, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-2xl transition-all duration-200 hover:shadow-sm cursor-pointer group" style={{ background: 'rgba(234,230,223,0.5)', border: '1px solid rgba(217,209,190,0.3)' }}>
                  <img src={d.image} alt={d.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-105"/>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium" style={{ color: '#6F93C4' }}>Day {d.day}</div>
                    <div className="text-sm font-medium" style={{ color: '#1F2937' }}>{d.title}</div>
                    <div className="text-xs font-light mt-0.5 truncate" style={{ color: '#6B7280' }}>{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Gems */}
          <div className="rounded-3xl p-6" style={{ background: 'rgba(111,147,196,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(111,147,196,0.15)' }}>
            <h3 className="text-sm font-medium mb-4" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>🔮 AI-Discovered Hidden Gems</h3>
            <div className="flex flex-col gap-2.5">
              {hiddenGems.map((g, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.4)' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#1F2937' }}>{g.name}</div>
                    <div className="text-xs font-light" style={{ color: '#6B7280' }}>{g.type}</div>
                  </div>
                  <div className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(111,147,196,0.12)', color: '#6F93C4' }}>{g.score}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget + Weather */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)' }}>
              <div className="text-xs font-light mb-1" style={{ color: '#6B7280' }}>Est. Budget</div>
              <div className="text-xl font-semibold" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>{budgetMap[data.budget]}</div>
              <div className="text-xs font-light mt-1" style={{ color: '#9CA3AF' }}>4 nights · all inclusive</div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(111,147,196,0.08)', border: '1px solid rgba(111,147,196,0.15)' }}>
              <div className="text-xs font-light mb-1" style={{ color: '#6B7280' }}>Weather</div>
              <div className="text-xl font-semibold" style={{ color: '#6F93C4', fontFamily: 'Playfair Display,serif' }}>22°C</div>
              <div className="text-xs font-light mt-1" style={{ color: '#9CA3AF' }}>Partly cloudy · Ideal</div>
            </div>
          </div>

          {/* CTA */}
          <button onClick={() => navigate('/itinerary')} className="w-full py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-md flex items-center justify-center gap-2"
            style={{ background: '#fff', border: '1px solid rgba(217,209,190,0.6)', color: '#1F2937' }}>
            View Full Itinerary
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </>
      )}

      {/* Empty state */}
      {!generating && !generated && (
        <div className="rounded-3xl p-10 flex flex-col items-center justify-center text-center" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', minHeight: '400px' }}>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6" style={{ background: 'rgba(111,147,196,0.1)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h3 className="text-lg font-medium mb-2" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>Your Journey Awaits</h3>
          <p className="text-sm font-light max-w-xs" style={{ color: '#6B7280' }}>
            Configure your travel preferences and let our AI craft a cinematic itinerary tailored just for you.
          </p>
          <div className="flex gap-2 mt-6">
            {['🏔️', '🌅', '🌿', '✨'].map((e, i) => (
              <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(234,230,223,0.6)', animationDelay: `${i*200}ms` }}>{e}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Tag({ label }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-light" style={{ background: 'rgba(111,147,196,0.08)', color: '#6F93C4', border: '1px solid rgba(111,147,196,0.15)' }}>
      {label}
    </span>
  );
}
