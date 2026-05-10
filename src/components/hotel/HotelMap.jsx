export default function HotelMap({ stay }) {
  if (!stay) return null;

  return (
    <section className="mb-16">
      <h3 className="text-xl text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display,serif' }}>Location</h3>
      <div className="relative h-80 rounded-[2rem] overflow-hidden bg-gray-100">
        <img src={stay.image} alt="Map Area" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale blur-sm" />
        <div className="absolute inset-0 bg-[#EAE6DF]/40" />
        
        {/* Map Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-[#6F93C4]/20 flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 rounded-full bg-[#6F93C4]" />
          </div>
        </div>

        {/* Floating Info */}
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-gray-100">
          <h4 className="font-medium text-sm text-gray-900 mb-1">{stay.location}</h4>
          <p className="text-xs text-gray-500 font-light mb-3">Quiet and premium stay located in the heart of the region.</p>
          <div className="flex flex-col gap-1 mb-3">
            {stay.nearby?.slice(0, 2).map((place, i) => (
              <span key={i} className="text-xs text-gray-600 font-light">📍 {place}</span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs font-medium text-[#6F93C4] border-t border-gray-100 pt-2">
            <span>Get Directions</span>
            <span>Explore Map</span>
          </div>
        </div>
      </div>
    </section>
  );
}
