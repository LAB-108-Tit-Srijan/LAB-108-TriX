export default function HotelExperiences({ stay }) {
  if (!stay) return null;

  const experiences = [
    { title: 'Local Cultural Evening', type: 'Relaxation', image: '/discover.png' },
    { title: 'Guided Surrounding Walk', type: 'Adventure', image: '/amanzi.png' },
    { title: 'Regional Culinary Class', type: 'Culinary', image: '/kyoto.png' },
  ];

  return (
    <section className="mb-16">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl text-[#1F2937]" style={{ fontFamily: 'Playfair Display,serif' }}>Stay Experiences</h3>
        <button className="text-sm font-medium text-[#6F93C4] hover:underline">View All</button>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {experiences.map((exp, i) => (
          <div key={i} className="flex-shrink-0 w-64 group cursor-pointer">
            <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
              <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-white/90 backdrop-blur text-[10px] font-semibold text-gray-800 uppercase tracking-wide">
                {exp.type}
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#6F93C4] transition-colors">{exp.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
