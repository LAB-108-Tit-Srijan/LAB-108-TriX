export default function HotelInsights({ stay }) {
  if (!stay) return null;

  const insights = [
    { label: 'Weather Now', value: stay.weather.split('·')[0].trim(), sub: stay.weather.split('·')[1]?.trim() || 'Clear', icon: '🌤️' },
    { label: 'Current Crowd', value: stay.crowdLevel, sub: stay.crowdLevel === 'Low' ? 'Very Peaceful' : 'Bustling', icon: '👤' },
    { label: 'Best Season', value: 'Sep - Nov', sub: 'Peak Autumn', icon: '🍂' },
    { label: 'Scenic Score', value: stay.crowdLevel === 'Low' ? '98/100' : '92/100', sub: stay.location.split(',')[0], icon: '📸' }
  ];

  return (
    <section className="mb-16">
      <h3 className="text-xl text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display,serif' }}>Experience Insights</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {insights.map((item, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">{item.label}</div>
            <div className="text-lg font-medium text-gray-900 mb-1">{item.value}</div>
            <div className="text-xs font-light text-gray-400">{item.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
