export default function AIExperienceSummary({ stay }) {
  if (!stay) return null;

  return (
    <section className="mb-16">
      <div className="p-8 rounded-[2rem] relative overflow-hidden" 
        style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 10px 40px rgba(31,41,55,0.05)', backdropFilter: 'blur(20px)' }}>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#6F93C4]/10 blur-[30px]" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#D9D1BE]/20 blur-[30px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#6F93C4]/10">
              <span className="text-[#6F93C4] text-xl">✨</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#1F2937]" style={{ fontFamily: 'Playfair Display,serif' }}>AI Experience Match</h3>
              <div className="text-xs font-light text-gray-500 uppercase tracking-widest">Personalized Insight</div>
            </div>
            <div className="ml-auto text-3xl font-light text-[#6F93C4]" style={{ fontFamily: 'Playfair Display,serif' }}>
              {stay.crowdLevel === 'Low' ? '98%' : '92%'}
            </div>
          </div>

          <p className="text-gray-700 font-light leading-relaxed mb-6 text-sm md:text-base italic">
            "{stay.aiSummary} Based on your preferences, {stay.name} offers the exact blend of atmosphere and luxury you seek."
          </p>

          <div className="flex flex-wrap gap-2">
            {[stay.crowdLevel + ' Crowd', ...stay.features.slice(0,3)].map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium text-[#6F93C4] bg-white shadow-sm border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
