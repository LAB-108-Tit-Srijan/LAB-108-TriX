import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { subscribeToHostBookings } from '../../services/bookingService';
import { subscribeToHostProperties } from '../../services/propertyService';
import { subscribeToHostRentals } from '../../services/rentalService';
import HostSidebar from './HostSidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6F93C4', '#D9D1BE', '#B7C6D6', '#EAE6DF'];

export default function HostEarningsPage() {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const unsubProps = subscribeToHostProperties(currentUser.uid || 'host-123', setProperties);
    const unsubRentals = subscribeToHostRentals(currentUser.uid || 'host-123', setRentals);
    return () => { unsubProps(); unsubRentals(); };
  }, [currentUser]);

  useEffect(() => {
    const propertyIds = properties.map(p => p.propertyId);
    const rentalIds = rentals.map(r => r.rentalId);
    const allIds = [...propertyIds, ...rentalIds];

    if (allIds.length === 0) {
      if (loading) setLoading(false);
      return;
    }

    const unsubscribe = subscribeToHostBookings(allIds, (data) => {
      setBookings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [properties, rentals]);

  const totalEarnings = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const propertyEarnings = bookings.filter(b => b.propertyType === 'STAY').reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const rentalEarnings = bookings.filter(b => b.propertyType === 'RENTAL').reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const pendingEarnings = bookings.filter(b => b.bookingStatus === 'PENDING').reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  
  const typeData = [
    { name: 'Properties', value: propertyEarnings },
    { name: 'Rentals', value: rentalEarnings }
  ];

  const chartData = [
    { name: 'Jan', amount: totalEarnings * 0.7 },
    { name: 'Feb', amount: totalEarnings * 0.8 },
    { name: 'Mar', amount: totalEarnings * 0.95 },
    { name: 'Apr', amount: totalEarnings * 1.1 },
    { name: 'May', amount: totalEarnings * 1.05 },
    { name: 'Jun', amount: totalEarnings },
  ];

  const assetPerformance = [...properties.map(p => ({
    name: p.name,
    type: 'Property',
    earnings: bookings.filter(b => b.propertyId === p.propertyId).reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  })), ...rentals.map(r => ({
    name: r.title,
    type: 'Rental',
    earnings: bookings.filter(b => b.propertyId === r.rentalId).reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  }))].sort((a, b) => b.earnings - a.earnings);

  return (
    <div className="flex min-h-screen bg-[#EAE6DF]">
      <HostSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif text-[#1F2937] mb-2"
          >
            Financial Intelligence
          </motion.h1>
          <p className="text-gray-500 font-medium">Holistic view of your hospitality portfolio performance.</p>
        </header>

        {/* Overview Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#1F2937] text-white p-6 rounded-[2rem] shadow-lg">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Gross Volume</div>
            <div className="text-3xl font-serif">₹{totalEarnings.toLocaleString()}</div>
          </div>
          <div className="bg-white/60 p-6 rounded-[2rem] border border-white/60 shadow-sm">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Net Income</div>
            <div className="text-3xl font-serif text-[#1F2937]">₹{(totalEarnings * 0.85).toLocaleString()}</div>
          </div>
          <div className="bg-[#D9D1BE] p-6 rounded-[2rem] shadow-sm">
            <div className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">Rentals Share</div>
            <div className="text-3xl font-serif text-[#1F2937]">₹{rentalEarnings.toLocaleString()}</div>
          </div>
          <div className="bg-[#B7C6D6] p-6 rounded-[2rem] shadow-sm">
            <div className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">Pending</div>
            <div className="text-3xl font-serif text-[#1F2937]">₹{pendingEarnings.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Main Chart */}
          <section className="lg:col-span-2 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-[#1F2937]">Revenue Momentum</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-[#6F93C4] rounded-full"></span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Growth Index</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6F93C4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6F93C4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#6F93C4" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Revenue Breakdown Pie */}
          <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-sm flex flex-col items-center">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4 w-full">Asset Split</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4">
              {typeData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-xs font-bold text-gray-500">{d.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Detailed Performance List */}
        <section className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-white/60">
            <h3 className="text-xl font-bold text-[#1F2937]">Asset Performance Ranking</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Asset Name</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Efficiency</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {assetPerformance.map((asset, idx) => (
                  <tr key={asset.name} className="hover:bg-white/40 transition-colors">
                    <td className="px-8 py-5">
                      <div className="text-sm font-bold text-[#1F2937]">{asset.name}</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        asset.type === 'Property' ? 'bg-[#6F93C4]/10 text-[#6F93C4] border-[#6F93C4]/20' : 'bg-[#D9D1BE]/20 text-[#8a7d5a] border-[#D9D1BE]/40'
                      }`}>
                        {asset.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="w-32 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#6F93C4] h-full" 
                          style={{ width: `${(asset.earnings / totalEarnings) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right font-serif text-[#1F2937] text-lg">
                      ₹{asset.earnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {assetPerformance.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-gray-400 italic">No revenue data available for assets.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

