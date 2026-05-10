import { useState, useEffect, useRef } from 'react';

const days = [
  {
    day: 1, title: 'Arrival & Riverside Serenity',
    subtitle: 'Settle into the mountains. Let the rivers guide your first breath.',
    time: 'Morning — Evening', image: '/nordfjord.png',
    activities: [
      { time: '10:00 AM', title: 'Arrive at Bhuntar Airport', desc: 'Private transfer through Kullu Valley. First views of snow-capped peaks.', icon: '✈️' },
      { time: '12:30 PM', title: 'Check-in: The Himalayan Lodge', desc: 'Boutique riverside stay with cedar interiors and panoramic mountain views.', icon: '🏨' },
      { time: '3:00 PM', title: 'Riverside Café Experience', desc: 'Sip masala chai at a hidden riverbank café. Journal your first impressions.', icon: '☕' },
      { time: '6:00 PM', title: 'Golden Hour Valley Walk', desc: 'Guided walk along the Beas River as sunset paints the mountains gold.', icon: '🌅' },
    ],
    aiNote: 'AI suggests arriving before noon for the best mountain light. The café by the river has a 97% match to your "peaceful" mood.',
  },
  {
    day: 2, title: 'Mountain Trails & Hidden Villages',
    subtitle: 'Discover the untold stories hidden within ancient valleys.',
    time: 'Full Day', image: '/kyoto.png',
    activities: [
      { time: '6:30 AM', title: 'Sunrise at Naggar Castle', desc: 'Witness the Himalayas painted in amber from a 500-year-old castle.', icon: '🏰' },
      { time: '9:00 AM', title: 'Trek to Jana Waterfall', desc: '3-hour moderate hike through deodar forests to a hidden waterfall.', icon: '🥾' },
      { time: '1:00 PM', title: 'Village Lunch: Malana', desc: 'Authentic Himachali thali in one of the oldest democracies on earth.', icon: '🍽️' },
      { time: '5:00 PM', title: 'Hot Spring Relaxation', desc: 'Soak in natural sulfur springs at Manikaran, sacred since ancient times.', icon: '♨️' },
    ],
    aiNote: 'The Jana trail has low foot traffic on weekdays — perfect for your "low crowd" preference. Pack light layers.',
  },
  {
    day: 3, title: 'Sunrise Camping & Stargazing',
    subtitle: 'Sleep under the clearest skies. Wake to the sound of the wind.',
    time: 'Full Day + Night', image: '/amanzi.png',
    activities: [
      { time: '5:30 AM', title: 'Mountain Sunrise Meditation', desc: 'Guided breathing session at 3,000m with 360° Himalayan views.', icon: '🧘' },
      { time: '9:00 AM', title: 'Alpine Meadow Exploration', desc: 'Walk through wildflower meadows. AI-mapped route through Solang.', icon: '🌸' },
      { time: '2:00 PM', title: 'Camp Setup at Hampta Pass Base', desc: 'Luxury glamping with heated tents and gourmet mountain cuisine.', icon: '⛺' },
      { time: '9:00 PM', title: 'Stargazing Experience', desc: 'Private astronomer guides you through the clearest night sky in India.', icon: '🌌' },
    ],
    aiNote: 'June offers the clearest skies in Hampta. AI recommends the west-facing tent for the best sunrise view.',
  },
  {
    day: 4, title: 'Cultural Immersion & Local Flavors',
    subtitle: 'Taste the mountains. Connect with centuries of tradition.',
    time: 'Morning — Evening', image: '/discover.png',
    activities: [
      { time: '8:00 AM', title: 'Farm-to-Table Breakfast', desc: 'Fresh parantha with honey from local Himalayan beekeepers.', icon: '🍯' },
      { time: '11:00 AM', title: 'Artisan Workshop: Wool Weaving', desc: 'Learn the ancient Kullu shawl technique from master weavers.', icon: '🧶' },
      { time: '2:00 PM', title: 'Spice Trail Walk', desc: 'Forage for wild herbs. Understand Himachali spice culture.', icon: '🌿' },
      { time: '6:00 PM', title: 'Community Bonfire Dinner', desc: 'Local music, storytelling, and Himachali siddu under the stars.', icon: '🔥' },
    ],
    aiNote: 'This day scores 98% alignment with your "spiritual" and "local food" preferences. A once-in-a-lifetime cultural day.',
  },
  {
    day: 5, title: 'Farewell & Reflections',
    subtitle: 'Every journey ends, but the mountains stay with you forever.',
    time: 'Morning', image: '/nordfjord.png',
    activities: [
      { time: '7:00 AM', title: 'Farewell Sunrise', desc: 'Last sunrise from your lodge balcony. Let it all sink in.', icon: '🌄' },
      { time: '9:00 AM', title: 'Memory Journaling Session', desc: 'AI-generated photo journal and trip reflection prompts.', icon: '📖' },
      { time: '11:00 AM', title: 'Departure', desc: 'Private transfer to airport. Until next time, mountains.', icon: '🚗' },
    ],
    aiNote: 'AI has prepared a cinematic photo summary and travel memory PDF for you. Check your dashboard after departure.',
  },
];

export default function Timeline() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="itinerary" className="py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-14" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.6s ease' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>Day-By-Day</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,44px)', color: '#1F2937', fontWeight: 400 }}>Your Cinematic Timeline</h2>
          <p className="mt-2 text-sm font-light max-w-lg" style={{ color: '#6B7280' }}>Each day is a chapter in your personal travel documentary, curated by AI.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, #B7C6D6, transparent)' }} />

          <div className="flex flex-col gap-12">
            {days.map((d, i) => <DayCard key={d.day} day={d} i={i} visible={visible} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function DayCard({ day, i, visible }) {
  const [expanded, setExpanded] = useState(i === 0);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative lg:pl-20"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s ease ${i * 150}ms` }}>
      {/* Timeline dot */}
      <div className="absolute left-6 top-8 w-5 h-5 rounded-full hidden lg:flex items-center justify-center z-10" style={{ background: '#EAE6DF', border: '2px solid #6F93C4' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: '#6F93C4' }} />
      </div>

      <div className="rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: hovered ? '0 20px 60px rgba(31,41,55,0.1)' : '0 4px 20px rgba(31,41,55,0.04)',
        }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Header with image */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%]">
          <div className="relative" style={{ minHeight: '200px' }}>
            <img src={day.image} alt={day.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(31,41,55,0.5) 0%, rgba(31,41,55,0.2) 100%)' }} />
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{ background: 'rgba(111,147,196,0.85)', backdropFilter: 'blur(8px)' }}>Day {day.day}</div>
          </div>

          <div className="p-7">
            <div className="text-xs font-light mb-1" style={{ color: '#6B7280' }}>{day.time}</div>
            <h3 className="text-xl mb-1.5" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937', fontWeight: 500 }}>{day.title}</h3>
            <p className="text-sm font-light mb-4" style={{ color: '#6B7280' }}>{day.subtitle}</p>

            <button onClick={() => setExpanded(!expanded)} className="text-xs font-medium flex items-center gap-1.5 transition-colors" style={{ color: '#6F93C4' }}>
              {expanded ? 'Collapse' : 'View Activities'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Activities */}
        {expanded && (
          <div className="px-7 pb-7 pt-2" style={{ borderTop: '1px solid rgba(217,209,190,0.3)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {day.activities.map((a, j) => (
                <div key={j} className="flex gap-3 p-4 rounded-2xl transition-all duration-200 hover:shadow-sm"
                  style={{ background: 'rgba(234,230,223,0.5)', border: '1px solid rgba(217,209,190,0.3)' }}>
                  <span className="text-xl flex-shrink-0 mt-0.5">{a.icon}</span>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: '#6F93C4' }}>{a.time}</div>
                    <div className="text-sm font-medium" style={{ color: '#1F2937' }}>{a.title}</div>
                    <div className="text-xs font-light mt-1 leading-relaxed" style={{ color: '#6B7280' }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* AI Note */}
            <div className="flex gap-3 p-4 rounded-2xl" style={{ background: 'rgba(111,147,196,0.06)', border: '1px solid rgba(111,147,196,0.12)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(111,147,196,0.12)' }}>
                <span className="text-sm">🤖</span>
              </div>
              <div>
                <div className="text-xs font-medium mb-0.5" style={{ color: '#6F93C4' }}>AI Insight</div>
                <div className="text-xs font-light leading-relaxed" style={{ color: '#6B7280' }}>{day.aiNote}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
