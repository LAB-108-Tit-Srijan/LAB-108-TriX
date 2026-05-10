export default function PropertyOverview({ stay }) {
  if (!stay) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-300/30">
        <h2 className="text-2xl font-medium text-[#1F2937]" style={{ fontFamily: 'Playfair Display,serif' }}>
          Hosted by the Property Owner
        </h2>
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img src="https://i.pravatar.cc/150?img=47" alt="Host" className="w-full h-full object-cover" />
        </div>
        <div className="ml-auto text-right text-sm text-gray-500 font-light">
          <div>Verified Host · 5 years hosting</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl text-[#1F2937] mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>About this space</h3>
          <p className="text-gray-600 font-light leading-relaxed mb-6 text-sm md:text-base">
            {stay.description}
          </p>
          <button className="text-[#6F93C4] font-medium text-sm flex items-center gap-1 hover:underline">
            Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>

        <div>
          <h3 className="text-xl text-[#1F2937] mb-4" style={{ fontFamily: 'Playfair Display,serif' }}>What this place offers</h3>
          <div className="grid grid-cols-2 gap-4">
            {stay.features.map((amenity, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">✨</span>
                <span className="text-sm text-gray-700 font-light">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
