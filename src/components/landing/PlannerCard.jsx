import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlannerCard() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!destination) return;
    
    setIsGenerating(true);
    setTimeout(() => { 
      setIsGenerating(false);
      navigate('/ai-planner');
    }, 1500);
  };

  return (
    <div
      className="rounded-[32px] p-8 flex flex-col gap-6 relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 20px 50px rgba(31, 41, 55, 0.05)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[10px] font-bold tracking-wider uppercase opacity-60 px-1" style={{ color: '#1F2937' }}>
            Where to
          </label>
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#6F93C4]/20 focus-within:bg-white"
            style={{ background: 'rgba(234, 230, 223, 0.6)', border: '1px solid rgba(183, 198, 214, 0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input
              type="text"
              placeholder="e.g. Manali, Udaipur, Munnar..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder-gray-400"
              style={{ color: '#1F2937' }}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-wider uppercase opacity-60 px-1" style={{ color: '#1F2937' }}>
            Dates
          </label>
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#6F93C4]/20 focus-within:bg-white"
            style={{ background: 'rgba(234, 230, 223, 0.6)', border: '1px solid rgba(183, 198, 214, 0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            <input
              type="text"
              placeholder="Select dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder-gray-400"
              style={{ color: '#1F2937' }}
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-wider uppercase opacity-60 px-1" style={{ color: '#1F2937' }}>
            Travelers
          </label>
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#6F93C4]/20 focus-within:bg-white"
            style={{ background: 'rgba(234, 230, 223, 0.6)', border: '1px solid rgba(183, 198, 214, 0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
            <input
              type="text"
              placeholder="2 People"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder-gray-400"
              style={{ color: '#1F2937' }}
            />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !destination}
        className="w-full flex items-center justify-center gap-3 rounded-2xl py-5 text-sm font-semibold tracking-wider text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
        style={{
          background: 'linear-gradient(135deg, #6F93C4 0%, #5a7db0 100%)',
          boxShadow: '0 8px 24px rgba(111, 147, 196, 0.3)',
        }}
      >
        {isGenerating ? (
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Designing Your Escape...</span>
          </div>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>Generate Cinematic Itinerary</span>
          </>
        )}
      </button>
    </div>
  );
}
