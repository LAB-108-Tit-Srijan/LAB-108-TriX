export default function HotelReviews({ stay }) {
  if (!stay) return null;

  const reviews = [
    { name: 'Sarah M.', date: 'October 2025', text: `An incredibly emotional and peaceful stay. Architecture blends perfectly with nature.`, rating: 5, avatar: 'https://i.pravatar.cc/150?img=32' },
    { name: 'David K.', date: 'September 2025', text: `Highly recommend the private experiences here. Completely worth the price.`, rating: 5, avatar: 'https://i.pravatar.cc/150?img=11' }
  ];

  return (
    <section className="mb-8">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-xl text-[#1F2937]" style={{ fontFamily: 'Playfair Display,serif' }}>Guest Stories</h3>
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
          ⭐ {stay.rating} <span className="font-light text-gray-500 ml-1">({stay.reviews} reviews)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="text-sm font-medium text-gray-900">{rev.name}</div>
                <div className="text-xs font-light text-gray-500">{rev.date}</div>
              </div>
            </div>
            <p className="text-sm font-light text-gray-600 leading-relaxed">"{rev.text}"</p>
          </div>
        ))}
      </div>
      <button className="mt-6 px-6 py-3 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Read all {stay.reviews} reviews
      </button>
    </section>
  );
}
