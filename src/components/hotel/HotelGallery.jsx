export default function HotelGallery({ stay }) {
  if (!stay) return null;

  const images = stay.gallery?.length > 0 ? [stay.image, ...stay.gallery] : [stay.image];
  // Pad with duplicates if we need more images for the grid
  const displayImages = [
    images[0],
    images[1] || images[0],
    images[2] || images[0],
    images[3] || images[0],
    images[4] || images[0],
  ];

  return (
    <section className="pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium text-[#6F93C4] bg-white shadow-sm">⭐ {stay.rating} Rating</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-700 bg-white shadow-sm">✨ {stay.crowdLevel === 'Low' ? '98' : '92'}% AI Match</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display,serif', lineHeight: 1.1 }}>
              {stay.name}
            </h1>
            <div className="flex items-center gap-1.5 text-sm font-light text-gray-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {stay.location}
            </div>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="1.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden">
          <div className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer">
            <img src={displayImages[0]} alt="Hero View" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="col-span-2 md:col-span-1 row-span-1 relative group cursor-pointer hidden md:block">
            <img src={displayImages[1]} alt="Interior" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-2 md:col-span-1 row-span-1 relative group cursor-pointer hidden md:block">
            <img src={displayImages[2]} alt="Balcony" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-2 md:col-span-1 row-span-1 relative group cursor-pointer hidden md:block">
            <img src={displayImages[3]} alt="Bathroom" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-2 md:col-span-1 row-span-1 relative group cursor-pointer hidden md:block">
            <img src={displayImages[4]} alt="Fireplace" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/20">
              <span className="text-white font-medium">Show all photos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
