import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateProperty, deleteProperty } from '../../services/propertyService';

const PROPERTY_IMAGES = {
  Hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  Hostel: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
  Homestay: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=600&q=80',
  Villa: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  Camp: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
  Treehouse: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
  Cabin: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80',
  Resort: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600&q=80',
};

const STATUS_CONFIG = {
  active: { label: 'Active', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  paused: { label: 'Paused', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  draft: { label: 'Draft', color: '#6B7280', bg: 'rgba(107,114,128,0.1)' },
};

export default function PropertyCard({ property, onManageRooms, onEdit, onViewLive }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const img = property.coverImage || property.images?.[0] || PROPERTY_IMAGES[property.type] || PROPERTY_IMAGES.Hotel;
  const status = STATUS_CONFIG[property.status] || STATUS_CONFIG.active;

  const toggleStatus = async () => {
    setToggling(true);
    try {
      const newStatus = property.status === 'active' ? 'paused' : 'active';
      await updateProperty(property.propertyId, { status: newStatus });
    } catch (e) { console.warn(e); }
    finally { setToggling(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteProperty(property.propertyId); }
    catch (e) { console.warn(e); }
    finally { setDeleting(false); setShowConfirmDelete(false); }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-3xl border border-white/50"
        style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(31,41,55,0.08)' }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={img}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.6) 0%, transparent 60%)' }} />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{ background: status.bg, color: status.color, backdropFilter: 'blur(8px)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
            {status.label}
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(234,230,223,0.9)', color: '#1F2937', backdropFilter: 'blur(8px)' }}>
            {property.type}
          </div>

          {/* Bottom info overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-base leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {property.name}
            </h3>
            <p className="text-white/75 text-xs mt-0.5">📍 {property.location}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <StatPill label="Price" value={`₹${(property.pricePerNight || 0).toLocaleString()}`} sub="/night" />
            <StatPill label="Occupancy" value={`${property.occupancyRate || 0}%`} sub="avg" />
            <StatPill label="Rating" value={property.rating ? `${property.rating}★` : 'New'} sub={property.reviewCount ? `${property.reviewCount} reviews` : ''} />
          </div>

          {/* Amenities Pills */}
          {property.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {property.amenities.slice(0, 4).map(a => (
                <span key={a} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(111,147,196,0.1)', color: '#6F93C4' }}>
                  {a}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium text-[#6B7280]" style={{ background: 'rgba(217,209,190,0.4)' }}>
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => onEdit?.(property)}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(111,147,196,0.1)', color: '#6F93C4', border: '1px solid rgba(111,147,196,0.2)' }}>
              ✏️ Edit
            </button>
            <button onClick={() => onManageRooms?.(property)}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(217,209,190,0.4)', color: '#1F2937', border: '1px solid rgba(183,198,214,0.3)' }}>
              🛏️ Rooms
            </button>
            <button onClick={toggleStatus} disabled={toggling}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: property.status === 'active' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)', color: property.status === 'active' ? '#f59e0b' : '#22c55e' }}>
              {toggling ? '...' : property.status === 'active' ? '⏸ Pause' : '▶️ Activate'}
            </button>
            <button onClick={() => setShowConfirmDelete(true)}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
              🗑️ Delete
            </button>
          </div>

          {/* View Live */}
          <button onClick={() => onViewLive?.(property)}
            className="w-full mt-2 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)' }}>
            👁️ View Live on TriPOV
          </button>
        </div>
      </motion.div>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {showConfirmDelete && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowConfirmDelete(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 w-full max-w-sm p-8 rounded-3xl text-center"
              style={{ background: 'rgba(234,230,223,0.98)', boxShadow: '0 30px 80px rgba(31,41,55,0.2)' }}>
              <div className="text-5xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Delete Property?</h3>
              <p className="text-sm text-[#6B7280] mb-6">"{property.name}" will be permanently removed from TriPOV and will no longer appear for travelers.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirmDelete(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#6B7280]" style={{ background: 'rgba(217,209,190,0.5)' }}>
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#ef4444' }}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function StatPill({ label, value, sub }) {
  return (
    <div className="p-2.5 rounded-2xl text-center" style={{ background: 'rgba(217,209,190,0.3)' }}>
      <div className="text-xs text-[#6B7280] font-medium mb-0.5">{label}</div>
      <div className="text-sm font-bold text-[#1F2937]">{value}</div>
      {sub && <div className="text-[10px] text-[#6B7280]">{sub}</div>}
    </div>
  );
}
