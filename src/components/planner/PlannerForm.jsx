import { useState } from 'react';

const budgetLabels = ['Backpacker', 'Comfort', 'Luxury', 'Ultra Luxury'];
const travelerTypes = [
  { id: 'solo', label: 'Solo', icon: '🧭' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'friends', label: 'Friends', icon: '👥' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'backpacker', label: 'Backpacker', icon: '🎒' },
  { id: 'luxury', label: 'Luxury Explorer', icon: '✨' },
  { id: 'adventure', label: 'Adventure', icon: '⛰️' },
  { id: 'spiritual', label: 'Spiritual', icon: '🕉️' },
];
const moods = [
  { id: 'peaceful', label: 'Peaceful', icon: '🧘' },
  { id: 'adventurous', label: 'Adventurous', icon: '🏔️' },
  { id: 'luxury', label: 'Luxury', icon: '💎' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { id: 'spiritual', label: 'Spiritual', icon: '🕯️' },
  { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
];
const expOptions = [
  { id: 'mountains', label: 'Mountains', icon: '🏔️' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'forests', label: 'Forests', icon: '🌲' },
  { id: 'cafes', label: 'Cafés', icon: '☕' },
  { id: 'camping', label: 'Camping', icon: '⛺' },
  { id: 'villages', label: 'Hidden Villages', icon: '🏘️' },
  { id: 'food', label: 'Local Food', icon: '🍜' },
  { id: 'stays', label: 'Luxury Stays', icon: '🏨' },
];
const safetyOpts = [
  { id: 'solo-safe', label: 'Solo-Safe', icon: '🛡️' },
  { id: 'family-safe', label: 'Family-Safe', icon: '👨‍👩‍👧' },
  { id: 'low-crowd', label: 'Low Crowd', icon: '🤫' },
  { id: 'verified', label: 'Verified Regions', icon: '✅' },
];
const trending = ['Manali, Himachal', 'Munnar, Kerala', 'Gulmarg, Kashmir', 'Udaipur, Rajasthan'];

export default function PlannerForm({ data, update, toggleArr, onGenerate, generating }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Destination */}
      <GlassSection title="Destination" subtitle="Where does your heart lead?">
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3.5 mb-3" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(183,198,214,0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B7C6D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={data.destination} onChange={e => update('destination', e.target.value)} placeholder="Search destinations..." className="w-full bg-transparent text-sm font-light outline-none" style={{ color: '#1F2937' }}/>
        </div>
        <div className="flex flex-wrap gap-2">
          {trending.map(t => (
            <button key={t} onClick={() => update('destination', t)} className="px-3 py-1.5 rounded-full text-xs font-light transition-all duration-200 hover:shadow-sm hover:-translate-y-px"
              style={{ background: 'rgba(111,147,196,0.08)', color: '#6F93C4', border: '1px solid rgba(111,147,196,0.15)' }}>{t}</button>
          ))}
        </div>
      </GlassSection>

      {/* Dates */}
      <GlassSection title="Travel Dates" subtitle="When will you wander?">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <DateInput label="Departure" value={data.departDate} onChange={v => update('departDate', v)} />
          <DateInput label="Return" value={data.returnDate} onChange={v => update('returnDate', v)} />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={data.flexible} onChange={e => update('flexible', e.target.checked)} className="w-4 h-4 rounded accent-[#6F93C4]"/>
          <span className="text-xs font-light" style={{ color: '#6B7280' }}>I'm flexible with dates</span>
        </label>
      </GlassSection>

      {/* Budget */}
      <GlassSection title="Budget Range" subtitle="Set your comfort level">
        <div className="mb-3">
          <input type="range" min="0" max="3" step="1" value={data.budget} onChange={e => update('budget', +e.target.value)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #6F93C4 ${(data.budget/3)*100}%, rgba(183,198,214,0.3) ${(data.budget/3)*100}%)`, accentColor: '#6F93C4' }}/>
        </div>
        <div className="flex justify-between">
          {budgetLabels.map((l, i) => (
            <span key={l} className="text-xs font-light" style={{ color: data.budget === i ? '#6F93C4' : '#9CA3AF', fontWeight: data.budget === i ? '500' : '300' }}>{l}</span>
          ))}
        </div>
      </GlassSection>

      {/* Traveler Type */}
      <GlassSection title="Traveler Type" subtitle="Who are you traveling as?">
        <div className="grid grid-cols-4 gap-2">
          {travelerTypes.map(t => (
            <ChipCard key={t.id} active={data.travelerType === t.id} onClick={() => update('travelerType', t.id)} icon={t.icon} label={t.label} />
          ))}
        </div>
      </GlassSection>

      {/* Mood */}
      <GlassSection title="Travel Mood" subtitle="How do you want to feel?">
        <div className="grid grid-cols-4 gap-2">
          {moods.map(m => (
            <ChipCard key={m.id} active={data.mood === m.id} onClick={() => update('mood', m.id)} icon={m.icon} label={m.label} />
          ))}
        </div>
      </GlassSection>

      {/* Experiences */}
      <GlassSection title="Experiences" subtitle="What inspires you?">
        <div className="grid grid-cols-4 gap-2">
          {expOptions.map(e => (
            <ChipCard key={e.id} active={data.experiences.includes(e.id)} onClick={() => toggleArr('experiences', e.id)} icon={e.icon} label={e.label} multi />
          ))}
        </div>
      </GlassSection>

      {/* Safety */}
      <GlassSection title="Safety Preferences" subtitle="Travel with confidence">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {safetyOpts.map(s => (
            <ChipCard key={s.id} active={data.safety.includes(s.id)} onClick={() => toggleArr('safety', s.id)} icon={s.icon} label={s.label} multi />
          ))}
        </div>
      </GlassSection>

      {/* Generate */}
      <button onClick={onGenerate} disabled={generating}
        className="w-full py-4 rounded-2xl text-sm font-medium text-white transition-all duration-400 hover:-translate-y-px hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)', boxShadow: '0 8px 32px rgba(111,147,196,0.35)' }}>
        {generating ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Generating Journey...</>
        ) : (
          <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><path d="M22 2 12 12"/></svg>Generate Cinematic Journey</>
        )}
      </button>
    </div>
  );
}

function GlassSection({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 20px rgba(31,41,55,0.04)' }}>
      <div className="mb-4">
        <h3 className="text-base font-medium" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>{title}</h3>
        <p className="text-xs font-light mt-0.5" style={{ color: '#9CA3AF' }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function DateInput({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-light mb-1 block" style={{ color: '#6B7280' }}>{label}</label>
      <div className="flex items-center gap-2 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(183,198,214,0.3)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B7C6D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <input type="date" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-transparent text-sm font-light outline-none" style={{ color: '#1F2937' }}/>
      </div>
    </div>
  );
}

function ChipCard({ active, onClick, icon, label, multi }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 hover:-translate-y-px"
      style={{
        background: active ? 'rgba(111,147,196,0.12)' : 'rgba(234,230,223,0.5)',
        border: active ? '1.5px solid #6F93C4' : '1.5px solid rgba(217,209,190,0.4)',
        boxShadow: active ? '0 2px 12px rgba(111,147,196,0.12)' : 'none',
      }}>
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-light" style={{ color: active ? '#6F93C4' : '#6B7280', fontWeight: active ? '500' : '300' }}>{label}</span>
    </button>
  );
}
