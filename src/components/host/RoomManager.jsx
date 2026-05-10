import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToPropertyRooms, addRoom, updateRoom, deleteRoom } from '../../services/propertyService';

const ROOM_TYPES = ['Dorm Bed', 'Private Room', 'Deluxe Room', 'Suite', 'Tent', 'Cabin'];

export default function RoomManager({ property, onClose }) {
  const [rooms, setRooms] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newRoom, setNewRoom] = useState({ name: '', type: 'Private Room', pricePerNight: '', capacity: 2, quantity: 1, description: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Use rooms from property if Firestore rooms collection empty
    const unsubscribe = subscribeToPropertyRooms(property.propertyId, (data) => {
      if (data.length > 0) setRooms(data);
      else setRooms(property.rooms || []);
    });
    return () => unsubscribe();
  }, [property.propertyId]);

  const handleAddRoom = async () => {
    if (!newRoom.name || !newRoom.pricePerNight) return;
    setSaving(true);
    try {
      await addRoom(property.propertyId, {
        ...newRoom,
        pricePerNight: Number(newRoom.pricePerNight),
        capacity: Number(newRoom.capacity),
        quantity: Number(newRoom.quantity),
      });
      setNewRoom({ name: '', type: 'Private Room', pricePerNight: '', capacity: 2, quantity: 1, description: '' });
      setAdding(false);
    } catch (e) {
      // Fallback for demo: just add locally
      setRooms(prev => [...prev, { roomId: Date.now().toString(), ...newRoom }]);
      setAdding(false);
    } finally { setSaving(false); }
  };

  const handleDeleteRoom = async (roomId) => {
    try { await deleteRoom(roomId); }
    catch (e) { setRooms(prev => prev.filter(r => r.roomId !== roomId)); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        style={{ background: 'rgba(234,230,223,0.98)', borderRadius: '28px', boxShadow: '0 40px 100px rgba(31,41,55,0.2)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-8 pt-8 pb-4 border-b border-[#D9D1BE]/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>🛏️ Room Management</h2>
            <p className="text-sm text-[#6B7280] mt-1">{property.name}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#D9D1BE]/50 text-[#6B7280]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
          {rooms.length === 0 && !adding && (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🛏️</div>
              <p className="text-sm text-[#6B7280]">No rooms yet. Add your first room type below.</p>
            </div>
          )}

          <AnimatePresence>
            {rooms.map(room => (
              <motion.div key={room.roomId || room.id}
                layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="p-4 rounded-2xl border border-white/50 flex items-center justify-between gap-4"
                style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-[#1F2937]">{room.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(111,147,196,0.1)', color: '#6F93C4' }}>{room.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                    <span>₹{Number(room.pricePerNight).toLocaleString()}/night</span>
                    <span>{room.capacity} guests</span>
                    <span>{room.quantity} rooms</span>
                  </div>
                  {room.description && <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">{room.description}</p>}
                </div>
                <button onClick={() => handleDeleteRoom(room.roomId || room.id)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-red-50 text-red-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Room Form */}
          <AnimatePresence>
            {adding && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden">
                <div className="p-5 rounded-2xl border border-dashed border-[#6F93C4]/50" style={{ background: 'rgba(111,147,196,0.04)' }}>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <Field label="Room Name *">
                      <input className="room-input" placeholder="e.g. Mountain View Deluxe" value={newRoom.name} onChange={e => setNewRoom(r => ({ ...r, name: e.target.value }))} />
                    </Field>
                    <Field label="Room Type">
                      <select className="room-input" value={newRoom.type} onChange={e => setNewRoom(r => ({ ...r, type: e.target.value }))}>
                        {ROOM_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Price / Night (₹) *">
                      <input className="room-input" type="number" placeholder="2000" value={newRoom.pricePerNight} onChange={e => setNewRoom(r => ({ ...r, pricePerNight: e.target.value }))} />
                    </Field>
                    <Field label="Max Guests">
                      <input className="room-input" type="number" min="1" value={newRoom.capacity} onChange={e => setNewRoom(r => ({ ...r, capacity: e.target.value }))} />
                    </Field>
                    <Field label="Number of Rooms">
                      <input className="room-input" type="number" min="1" value={newRoom.quantity} onChange={e => setNewRoom(r => ({ ...r, quantity: e.target.value }))} />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea className="room-input resize-none" rows={2} placeholder="Brief room description..." value={newRoom.description} onChange={e => setNewRoom(r => ({ ...r, description: e.target.value }))} />
                  </Field>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setAdding(false)} className="flex-1 py-2 rounded-xl text-xs font-semibold text-[#6B7280]" style={{ background: 'rgba(217,209,190,0.4)' }}>Cancel</button>
                    <button onClick={handleAddRoom} disabled={saving}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)' }}>
                      {saving ? 'Saving...' : 'Add Room'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-[#D9D1BE]/50">
          {!adding && (
            <button onClick={() => setAdding(true)}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)', boxShadow: '0 4px 16px rgba(111,147,196,0.3)' }}>
              + Add New Room Type
            </button>
          )}
        </div>
      </motion.div>

      <style>{`
        .room-input {
          width: 100%;
          padding: 9px 12px;
          border-radius: 12px;
          border: 1px solid rgba(183,198,214,0.4);
          background: rgba(255,255,255,0.7);
          font-size: 13px;
          color: #1F2937;
          outline: none;
        }
        .room-input:focus { box-shadow: 0 0 0 2px rgba(111,147,196,0.25); }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-[#6B7280]">{label}</label>
      {children}
    </div>
  );
}
