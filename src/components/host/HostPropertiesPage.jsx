import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { subscribeToHostProperties } from '../../services/propertyService';
import HostSidebar from './HostSidebar';
import PropertyCard from './PropertyCard';
import AddPropertyModal from './AddPropertyModal';
import RoomManager from './RoomManager';

// Cinematic Indian property hero images
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
];

const AI_INSIGHTS = [
  '🔥 Properties with bonfire experiences get 22% more weekend bookings.',
  '📸 Listings with 5+ images see 3× more views from travelers.',
  '💡 Adding café access increases average stay duration by 1.4 nights.',
  '🏔️ Himalayan homestays with trekking guides earn 35% more per booking.',
  '⭐ Responding to guests within 1 hour improves your ranking by 18%.',
];

export default function HostPropertiesPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRoomProperty, setSelectedRoomProperty] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [heroImg, setHeroImg] = useState(0);
  const [aiInsight, setAiInsight] = useState(0);
  const [successToast, setSuccessToast] = useState(false);

  const hostId = currentUser?.uid || 'demo_host_001';

  // Cycle hero images
  useEffect(() => {
    const t = setInterval(() => setHeroImg(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Cycle AI insights
  useEffect(() => {
    const t = setInterval(() => setAiInsight(i => (i + 1) % AI_INSIGHTS.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Live Firebase subscription
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToHostProperties(hostId, (data) => {
      setProperties(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [hostId]);

  const TYPES = ['All', ...new Set(properties.map(p => p.type).filter(Boolean))];

  const filtered = useMemo(() => {
    return properties.filter(p => {
      const matchFilter = filter === 'All' || p.type === filter;
      const matchSearch = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.location?.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [properties, filter, search]);

  // Analytics
  const stats = useMemo(() => {
    const active = properties.filter(p => p.status === 'active').length;
    const revenue = properties.reduce((sum, p) => sum + ((p.pricePerNight || 0) * (p.occupancyRate || 0) / 100 * 30), 0);
    const avgOccupancy = properties.length ? Math.round(properties.reduce((s, p) => s + (p.occupancyRate || 0), 0) / properties.length) : 0;
    return {
      total: properties.length,
      active,
      paused: properties.filter(p => p.status === 'paused').length,
      revenue: Math.round(revenue),
      avgOccupancy,
    };
  }, [properties]);

  const showSuccess = () => {
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* Ambient glows */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[120px]" style={{ background: '#D9D1BE' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[150px]" style={{ background: '#6F93C4' }} />
      </div>

      <div className="relative z-10 flex">
        <HostSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64 min-h-screen">

          {/* ── HERO SECTION ── */}
          <div className="relative h-72 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={heroImg}
                src={HERO_IMAGES[heroImg]}
                alt="Property hero"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(31,41,55,0.75) 0%, rgba(31,41,55,0.3) 60%, transparent 100%)' }} />
            <div className="relative h-full flex items-center px-10">
              <div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <div className="text-xs font-bold tracking-[0.15em] uppercase text-[#B7C6D6] mb-3">Property Management</div>
                  <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Manage Your Properties.
                  </h1>
                  <p className="text-white/70 text-sm max-w-md leading-relaxed">
                    Control listings, rooms, pricing, bookings, and guest experiences across the TriPOV ecosystem.
                  </p>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  onClick={() => setShowAddModal(true)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="mt-6 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)', boxShadow: '0 8px 24px rgba(111,147,196,0.4)' }}>
                  <span className="text-lg">+</span> Add New Property
                </motion.button>
              </div>
            </div>

            {/* Hero image dots */}
            <div className="absolute bottom-4 right-6 flex gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setHeroImg(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: i === heroImg ? 'white' : 'rgba(255,255,255,0.4)', width: i === heroImg ? '20px' : '6px' }} />
              ))}
            </div>
          </div>

          {/* ── STATS ── */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Properties', value: stats.total, icon: '🏨', color: '#6F93C4' },
                { label: 'Active Listings', value: stats.active, icon: '✅', color: '#22c55e' },
                { label: 'Avg Occupancy', value: `${stats.avgOccupancy}%`, icon: '📊', color: '#f59e0b' },
                { label: 'Est. Monthly Revenue', value: stats.revenue ? `₹${stats.revenue.toLocaleString()}` : '—', icon: '💰', color: '#8B5CF6' },
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                  className="p-5 rounded-3xl border border-white/50"
                  style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(31,41,55,0.05)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  </div>
                  <div className="text-2xl font-bold text-[#1F2937] mb-1">{loading ? '—' : s.value}</div>
                  <div className="text-xs text-[#6B7280] font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* ── AI INSIGHT ── */}
            <motion.div layout
              className="mb-6 p-4 rounded-2xl flex items-center gap-4 border border-[#6F93C4]/20"
              style={{ background: 'rgba(111,147,196,0.06)', backdropFilter: 'blur(12px)' }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(111,147,196,0.15)' }}>
                <span className="text-lg">🧠</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-[#6F93C4] tracking-wide mb-0.5">AI HOST INSIGHTS</div>
                <AnimatePresence mode="wait">
                  <motion.p key={aiInsight} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    className="text-sm text-[#1F2937] font-medium">
                    {AI_INSIGHTS[aiInsight]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── FILTERS & SEARCH ── */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2 p-1 rounded-2xl" style={{ background: 'rgba(217,209,190,0.4)' }}>
                {TYPES.map(t => (
                  <button key={t} onClick={() => setFilter(t)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: filter === t ? '#6F93C4' : 'transparent',
                      color: filter === t ? 'white' : '#6B7280',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/50" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)' }}>
                <svg className="w-4 h-4 text-[#B7C6D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search properties by name or location..."
                  className="flex-1 bg-transparent text-sm outline-none text-[#1F2937] placeholder:text-[#B7C6D6]" />
              </div>
            </div>

            {/* ── PROPERTY GRID ── */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-80 rounded-3xl animate-pulse" style={{ background: 'rgba(217,209,190,0.5)' }} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {properties.length === 0 ? 'No Properties Yet' : 'No results found'}
                </h3>
                <p className="text-sm text-[#6B7280] mb-6">
                  {properties.length === 0
                    ? 'Create your first property and start welcoming travelers.'
                    : 'Try adjusting your search or filters.'}
                </p>
                {properties.length === 0 && (
                  <button onClick={() => setShowAddModal(true)}
                    className="px-8 py-3 rounded-2xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)', boxShadow: '0 6px 24px rgba(111,147,196,0.3)' }}>
                    + Add Your First Property
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                <AnimatePresence>
                  {filtered.map(property => (
                    <PropertyCard
                      key={property.propertyId}
                      property={property}
                      onManageRooms={(p) => setSelectedRoomProperty(p)}
                      onEdit={(p) => setShowAddModal(true)} // For now opens add modal; edit can be wired later
                      onViewLive={(p) => navigate(`/hotel/${p.propertyId}`)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── ADD PROPERTY MODAL ── */}
      <AnimatePresence>
        {showAddModal && (
          <AddPropertyModal
            onClose={() => setShowAddModal(false)}
            onSuccess={showSuccess}
          />
        )}
      </AnimatePresence>

      {/* ── ROOM MANAGER ── */}
      <AnimatePresence>
        {selectedRoomProperty && (
          <RoomManager
            property={selectedRoomProperty}
            onClose={() => setSelectedRoomProperty(null)}
          />
        )}
      </AnimatePresence>

      {/* ── SUCCESS TOAST ── */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 24, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 24, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[70] px-6 py-3 rounded-2xl text-sm font-semibold text-white flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
            ✅ Property published! Now live on TriPOV Stays.
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING ADD BUTTON (mobile) ── */}
      <motion.button
        onClick={() => setShowAddModal(true)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full text-white text-2xl flex items-center justify-center shadow-2xl md:hidden"
        style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)', boxShadow: '0 8px 24px rgba(111,147,196,0.4)' }}>
        +
      </motion.button>
    </div>
  );
}
