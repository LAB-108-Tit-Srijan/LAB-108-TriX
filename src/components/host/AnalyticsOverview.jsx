import { motion } from 'framer-motion';
import { hostAnalytics } from '../../data/hostData';

export default function AnalyticsOverview() {
  const metrics = [
    { label: 'Total Bookings', value: hostAnalytics.totalBookings, trend: '+12%', color: 'text-[#6F93C4]' },
    { label: 'Monthly Revenue', value: hostAnalytics.monthlyRevenue, trend: '+5.4%', color: 'text-[#8B9D83]' },
    { label: 'Occupancy Rate', value: hostAnalytics.occupancyRate, trend: '+2.1%', color: 'text-gray-900' },
    { label: 'Average Rating', value: `${hostAnalytics.averageRating} ★`, trend: 'Top 5%', color: 'text-yellow-600' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {metrics.map((m, idx) => (
        <motion.div 
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="p-6 rounded-3xl border border-white/40 flex flex-col justify-between"
          style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(24px)' }}
        >
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{m.label}</span>
          <div className="flex items-end justify-between">
            <h3 className={`text-2xl font-bold ${m.color}`}>{m.value}</h3>
            <span className="text-xs font-medium bg-white/50 px-2 py-1 rounded-md text-gray-700">{m.trend}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
