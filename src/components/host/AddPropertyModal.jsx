import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { addProperty, uploadPropertyImage } from '../../services/propertyService';

const PROPERTY_TYPES = ['Hotel', 'Hostel', 'Homestay', 'Villa', 'Camp', 'Treehouse', 'Cabin', 'Resort'];
const AMENITIES_LIST = [
  { id: 'wifi', label: 'WiFi', emoji: '📶' },
  { id: 'cafe', label: 'Café', emoji: '☕' },
  { id: 'bonfire', label: 'Bonfire', emoji: '🔥' },
  { id: 'parking', label: 'Parking', emoji: '🚗' },
  { id: 'coworking', label: 'Coworking', emoji: '💻' },
  { id: 'breakfast', label: 'Breakfast', emoji: '🍳' },
  { id: 'pool', label: 'Pool', emoji: '🏊' },
  { id: 'yoga', label: 'Yoga', emoji: '🧘' },
  { id: 'trekking', label: 'Trekking', emoji: '🥾' },
  { id: 'cycling', label: 'Cycling', emoji: '🚴' },
  { id: 'petFriendly', label: 'Pet Friendly', emoji: '🐾' },
  { id: 'ac', label: 'Air Conditioning', emoji: '❄️' },
];

const ROOM_TYPES = ['Dorm Bed', 'Private Room', 'Deluxe Room', 'Suite', 'Tent', 'Cabin'];

const defaultForm = {
  // Step 1
  name: '', type: 'Hotel', description: '', location: '', state: '', country: 'India',
  // Step 2
  images: [],
  // Step 3
  amenities: [],
  // Step 4
  rooms: [],
  // Step 5
  nearbyPlaces: [],
  // Step 6
  pricePerNight: '', weekendPrice: '', minNights: 1,
  blockedDates: [],
  // Step 7 (auto)
};

export default function AddPropertyModal({ onClose, onSuccess }) {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newRoom, setNewRoom] = useState({ type: 'Private Room', name: '', pricePerNight: '', capacity: 2, quantity: 1 });
  const [newPlace, setNewPlace] = useState({ name: '', category: 'Café', distance: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();
  const TOTAL_STEPS = 7;

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = ev => setImagePreviews(p => [...p, ev.target.result]);
      reader.readAsDataURL(f);
    });
  };

  const removeImage = (idx) => {
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const toggleAmenity = (id) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(id) ? f.amenities.filter(a => a !== id) : [...f.amenities, id]
    }));
  };

  const addRoom = () => {
    if (!newRoom.name || !newRoom.pricePerNight) return;
    setForm(f => ({ ...f, rooms: [...f.rooms, { ...newRoom, id: Date.now().toString() }] }));
    setNewRoom({ type: 'Private Room', name: '', pricePerNight: '', capacity: 2, quantity: 1 });
  };

  const removeRoom = (id) => setForm(f => ({ ...f, rooms: f.rooms.filter(r => r.id !== id) }));

  const addNearby = () => {
    if (!newPlace.name) return;
    setForm(f => ({ ...f, nearbyPlaces: [...f.nearbyPlaces, { ...newPlace, id: Date.now().toString() }] }));
    setNewPlace({ name: '', category: 'Café', distance: '' });
  };

  const removeNearby = (id) => setForm(f => ({ ...f, nearbyPlaces: f.nearbyPlaces.filter(p => p.id !== id) }));

  const handlePublish = async () => {
    setSaving(true);
    setError('');
    try {
      const tempId = `prop_${Date.now()}`;
      // Upload images
      const uploadedUrls = [];
      for (const file of imageFiles) {
        const url = await uploadPropertyImage(file, tempId);
        if (url) uploadedUrls.push(url);
      }
      // Fallback images if no upload
      const finalImages = uploadedUrls.length > 0 ? uploadedUrls : [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'
      ];

      await addProperty({
        ...form,
        hostId: currentUser?.uid || 'demo_host_001',
        hostName: currentUser?.displayName || 'Host',
        images: finalImages,
        coverImage: finalImages[0],
        pricePerNight: Number(form.pricePerNight),
        weekendPrice: Number(form.weekendPrice) || Number(form.pricePerNight),
        minNights: Number(form.minNights),
        tags: form.amenities,
      });
      onSuccess?.();
      onClose();
    } catch (e) {
      setError('Failed to publish: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return form.name && form.location;
    if (step === 6) return form.pricePerNight;
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{ background: 'rgba(234,230,223,0.98)', borderRadius: '28px', boxShadow: '0 40px 100px rgba(31,41,55,0.2)', backdropFilter: 'blur(20px)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4 border-b border-[#D9D1BE]/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {step === 7 ? '🚀 Publish Property' : `Step ${step} of ${TOTAL_STEPS}`}
            </h2>
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#D9D1BE]/50 transition-colors text-[#6B7280]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          {/* Progress */}
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
                style={{ background: i < step ? '#6F93C4' : '#D9D1BE' }} />
            ))}
          </div>
          <div className="mt-2 text-xs font-medium text-[#6B7280]">
            {['Property Basics', 'Upload Images', 'Amenities', 'Room Setup', 'Nearby Places', 'Pricing & Availability', 'Ready to Publish'][step - 1]}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

              {/* STEP 1: Basics */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <FieldGroup label="Property Name *">
                    <input className="input-field" placeholder="e.g. The Himalayan Nest" value={form.name} onChange={e => update('name', e.target.value)} />
                  </FieldGroup>
                  <FieldGroup label="Property Type">
                    <div className="grid grid-cols-4 gap-2">
                      {PROPERTY_TYPES.map(t => (
                        <button key={t} onClick={() => update('type', t)}
                          className="py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200"
                          style={{ background: form.type === t ? '#6F93C4' : 'rgba(217,209,190,0.4)', color: form.type === t ? 'white' : '#6B7280', border: form.type === t ? 'none' : '1px solid rgba(183,198,214,0.4)' }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </FieldGroup>
                  <FieldGroup label="Description">
                    <textarea className="input-field resize-none" rows={3} placeholder="Tell travelers what makes your property special..." value={form.description} onChange={e => update('description', e.target.value)} />
                  </FieldGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup label="Location / Area *">
                      <input className="input-field" placeholder="e.g. Kasol, Himachal Pradesh" value={form.location} onChange={e => update('location', e.target.value)} />
                    </FieldGroup>
                    <FieldGroup label="State">
                      <input className="input-field" placeholder="e.g. Himachal Pradesh" value={form.state} onChange={e => update('state', e.target.value)} />
                    </FieldGroup>
                  </div>
                </div>
              )}

              {/* STEP 2: Images */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <div
                    className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-[#6F93C4] transition-colors"
                    style={{ borderColor: '#D9D1BE', background: 'rgba(217,209,190,0.15)' }}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); handleImages({ target: { files: e.dataTransfer.files } }); }}
                  >
                    <div className="text-4xl mb-3">📷</div>
                    <p className="text-sm font-semibold text-[#1F2937]">Drag & drop or click to upload images</p>
                    <p className="text-xs text-[#6B7280] mt-1">JPG, PNG — multiple files allowed</p>
                    <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {imagePreviews.map((src, idx) => (
                        <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden">
                          <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                          <button onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">✕</button>
                          {idx === 0 && <div className="absolute bottom-2 left-2 bg-[#6F93C4] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">Cover</div>}
                        </div>
                      ))}
                    </div>
                  )}
                  {imagePreviews.length === 0 && (
                    <p className="text-xs text-center text-[#6B7280]">No images uploaded — a default image will be used</p>
                  )}
                </div>
              )}

              {/* STEP 3: Amenities */}
              {step === 3 && (
                <div>
                  <p className="text-sm text-[#6B7280] mb-4">Select all amenities your property offers:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {AMENITIES_LIST.map(a => {
                      const active = form.amenities.includes(a.id);
                      return (
                        <button key={a.id} onClick={() => toggleAmenity(a.id)}
                          className="flex items-center gap-2.5 px-3 py-3 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5"
                          style={{ background: active ? 'rgba(111,147,196,0.12)' : 'rgba(217,209,190,0.3)', border: active ? '1.5px solid #6F93C4' : '1.5px solid transparent' }}>
                          <span className="text-xl">{a.emoji}</span>
                          <span className="text-xs font-semibold" style={{ color: active ? '#6F93C4' : '#6B7280' }}>{a.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Rooms */}
              {step === 4 && (
                <div className="flex flex-col gap-5">
                  {/* Existing Rooms */}
                  {form.rooms.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {form.rooms.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-3 rounded-2xl" style={{ background: 'rgba(217,209,190,0.3)' }}>
                          <div>
                            <div className="text-sm font-semibold text-[#1F2937]">{r.name} <span className="text-[#6B7280] font-normal">({r.type})</span></div>
                            <div className="text-xs text-[#6B7280]">₹{r.pricePerNight}/night · {r.capacity} guests · {r.quantity} rooms</div>
                          </div>
                          <button onClick={() => removeRoom(r.id)} className="text-red-400 hover:text-red-600 text-xs font-semibold">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Add Room */}
                  <div className="p-4 rounded-2xl border border-dashed border-[#6F93C4]/40" style={{ background: 'rgba(111,147,196,0.04)' }}>
                    <p className="text-sm font-semibold text-[#1F2937] mb-3">+ Add Room Type</p>
                    <div className="grid grid-cols-2 gap-3">
                      <FieldGroup label="Room Name">
                        <input className="input-field" placeholder="e.g. Himalayan Suite" value={newRoom.name} onChange={e => setNewRoom(r => ({ ...r, name: e.target.value }))} />
                      </FieldGroup>
                      <FieldGroup label="Room Type">
                        <select className="input-field" value={newRoom.type} onChange={e => setNewRoom(r => ({ ...r, type: e.target.value }))}>
                          {ROOM_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </FieldGroup>
                      <FieldGroup label="Price/Night (₹)">
                        <input className="input-field" type="number" placeholder="1500" value={newRoom.pricePerNight} onChange={e => setNewRoom(r => ({ ...r, pricePerNight: e.target.value }))} />
                      </FieldGroup>
                      <FieldGroup label="Capacity (guests)">
                        <input className="input-field" type="number" min="1" value={newRoom.capacity} onChange={e => setNewRoom(r => ({ ...r, capacity: Number(e.target.value) }))} />
                      </FieldGroup>
                      <FieldGroup label="Quantity">
                        <input className="input-field" type="number" min="1" value={newRoom.quantity} onChange={e => setNewRoom(r => ({ ...r, quantity: Number(e.target.value) }))} />
                      </FieldGroup>
                    </div>
                    <button onClick={addRoom}
                      className="mt-3 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)' }}>
                      Add Room Type
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Nearby Places */}
              {step === 5 && (
                <div className="flex flex-col gap-5">
                  {form.nearbyPlaces.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {form.nearbyPlaces.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl" style={{ background: 'rgba(217,209,190,0.3)' }}>
                          <div>
                            <span className="text-sm font-semibold text-[#1F2937]">{p.name}</span>
                            <span className="text-xs text-[#6B7280] ml-2">{p.category} · {p.distance}</span>
                          </div>
                          <button onClick={() => removeNearby(p.id)} className="text-red-400 text-xs font-semibold">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-4 rounded-2xl border border-dashed border-[#6F93C4]/40" style={{ background: 'rgba(111,147,196,0.04)' }}>
                    <p className="text-sm font-semibold text-[#1F2937] mb-3">+ Add Nearby Place</p>
                    <div className="grid grid-cols-2 gap-3">
                      <FieldGroup label="Place Name">
                        <input className="input-field" placeholder="e.g. Kheerganga Waterfall" value={newPlace.name} onChange={e => setNewPlace(p => ({ ...p, name: e.target.value }))} />
                      </FieldGroup>
                      <FieldGroup label="Category">
                        <select className="input-field" value={newPlace.category} onChange={e => setNewPlace(p => ({ ...p, category: e.target.value }))}>
                          {['Café', 'Waterfall', 'Hidden Gem', 'Coworking', 'Scenic Spot', 'Trek Point', 'Market'].map(c => <option key={c}>{c}</option>)}
                        </select>
                      </FieldGroup>
                      <FieldGroup label="Distance">
                        <input className="input-field" placeholder="e.g. 2 km" value={newPlace.distance} onChange={e => setNewPlace(p => ({ ...p, distance: e.target.value }))} />
                      </FieldGroup>
                    </div>
                    <button onClick={addNearby}
                      className="mt-3 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)' }}>
                      Add Place
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: Pricing */}
              {step === 6 && (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup label="Base Price / Night (₹) *">
                      <input className="input-field" type="number" placeholder="2500" value={form.pricePerNight} onChange={e => update('pricePerNight', e.target.value)} />
                    </FieldGroup>
                    <FieldGroup label="Weekend Price (₹)">
                      <input className="input-field" type="number" placeholder="3000" value={form.weekendPrice} onChange={e => update('weekendPrice', e.target.value)} />
                    </FieldGroup>
                    <FieldGroup label="Min. Nights">
                      <input className="input-field" type="number" min="1" value={form.minNights} onChange={e => update('minNights', Number(e.target.value))} />
                    </FieldGroup>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(111,147,196,0.08)', border: '1px solid rgba(111,147,196,0.2)' }}>
                    <p className="text-sm font-semibold text-[#6F93C4] mb-1">💡 AI Pricing Insight</p>
                    <p className="text-xs text-[#6B7280]">Properties in this category with bonfires and café access charge 15–20% more and see higher occupancy on weekends.</p>
                  </div>
                </div>
              )}

              {/* STEP 7: Publish */}
              {step === 7 && (
                <div className="flex flex-col gap-6 text-center">
                  <div className="text-6xl">🎉</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Ready to Go Live!</h3>
                    <p className="text-sm text-[#6B7280]">Your property will be instantly visible to travelers on the TriPOV Stays page.</p>
                  </div>
                  <div className="text-left p-5 rounded-2xl" style={{ background: 'rgba(217,209,190,0.4)' }}>
                    <div className="text-sm font-semibold text-[#1F2937] mb-3">Summary</div>
                    <div className="grid grid-cols-2 gap-y-2 text-xs text-[#6B7280]">
                      <span>Name</span><span className="text-[#1F2937] font-medium">{form.name}</span>
                      <span>Type</span><span className="text-[#1F2937] font-medium">{form.type}</span>
                      <span>Location</span><span className="text-[#1F2937] font-medium">{form.location}</span>
                      <span>Price</span><span className="text-[#1F2937] font-medium">₹{form.pricePerNight}/night</span>
                      <span>Rooms</span><span className="text-[#1F2937] font-medium">{form.rooms.length} room types</span>
                      <span>Images</span><span className="text-[#1F2937] font-medium">{imageFiles.length || 'Default'}</span>
                      <span>Amenities</span><span className="text-[#1F2937] font-medium">{form.amenities.length} selected</span>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-[#D9D1BE]/50 flex justify-between items-center">
          <button
            onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#6B7280] hover:text-[#1F2937] transition-colors">
            {step > 1 ? '← Back' : 'Cancel'}
          </button>
          {step < TOTAL_STEPS ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="px-8 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)', boxShadow: '0 4px 16px rgba(111,147,196,0.3)' }}>
              Continue →
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={saving}
              className="px-8 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)', boxShadow: '0 4px 16px rgba(111,147,196,0.3)' }}>
              {saving ? '⏳ Publishing...' : '🚀 Publish Property'}
            </button>
          )}
        </div>
      </motion.div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 10px 14px;
          border-radius: 14px;
          border: 1px solid rgba(183,198,214,0.4);
          background: rgba(255,255,255,0.7);
          font-size: 13px;
          color: #1F2937;
          outline: none;
          transition: box-shadow 0.2s;
        }
        .input-field:focus { box-shadow: 0 0 0 2px rgba(111,147,196,0.3); }
        select.input-field { cursor: pointer; }
      `}</style>
    </div>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#6B7280]">{label}</label>
      {children}
    </div>
  );
}
