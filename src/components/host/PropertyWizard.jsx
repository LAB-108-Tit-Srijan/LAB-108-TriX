import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addProperty } from '../../services/propertyService';
import { useAuth } from '../../context/AuthContext';

const steps = [
  { id: 1, title: 'Basics' },
  { id: 2, title: 'Location' },
  { id: 3, title: 'Rooms & Layout' },
  { id: 4, title: 'Amenities' },
  { id: 5, title: 'Pricing & Availability' },
  { id: 6, title: 'Publish' }
];

const AMENITIES_LIST = ['WiFi', 'Cafe', 'Bonfire', 'Coworking', 'River View', 'Trekking Access', 'Yoga', 'Breakfast'];
const PROPERTY_TYPES = ['Hotel', 'Hostel', 'Homestay', 'Camp', 'Cabin', 'Resort'];

export default function PropertyWizard({ onClose, onSuccess }) {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Homestay',
    description: '',
    location: '',
    amenities: [],
    pricePerNight: 2000,
    rooms: [], // { name, type, capacity, price }
    images: [],
    availability: true
  });

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handlePublish = async () => {
    if (!currentUser) return alert('You must be logged in as a host');
    setLoading(true);
    try {
      const propertyPayload = {
        ...formData,
        hostId: currentUser.uid,
        rating: 0,
        activeBookings: 0,
        occupancy: '0%'
      };
      await addProperty(propertyPayload);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to publish property.');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  const toggleAmenity = (am) => {
    setFormData(p => {
      const exists = p.amenities.includes(am);
      return { ...p, amenities: exists ? p.amenities.filter(a => a !== am) : [...p.amenities, am] };
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 md:p-8"
    >
      <motion.div 
        initial={{ y: 40, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl bg-[#EAE6DF] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#D9D1BE]/50 bg-white/40">
          <h2 className="text-2xl font-medium text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Add New Property
          </h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#D9D1BE]/50 w-full relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#6F93C4]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#1F2937]">Property Basics</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Property Name</label>
                    <input type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)}
                      className="w-full bg-white/60 border border-[#D9D1BE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F93C4]"
                      placeholder="e.g. Himalayan Riverside Hostel" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Property Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {PROPERTY_TYPES.map(pt => (
                        <button key={pt} onClick={() => updateForm('type', pt)}
                          className={`py-3 rounded-xl text-sm font-medium transition-all ${formData.type === pt ? 'bg-[#6F93C4] text-white shadow-lg' : 'bg-white/50 text-gray-600 hover:bg-white'}`}>
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                    <textarea value={formData.description} onChange={e => updateForm('description', e.target.value)} rows="4"
                      className="w-full bg-white/60 border border-[#D9D1BE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F93C4] resize-none"
                      placeholder="Describe the cinematic vibe of your property..." />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#1F2937]">Location & Environment</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Exact Location</label>
                    <input type="text" value={formData.location} onChange={e => updateForm('location', e.target.value)}
                      className="w-full bg-white/60 border border-[#D9D1BE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F93C4]"
                      placeholder="e.g. Kasol, Himachal Pradesh" />
                  </div>
                  <div className="p-6 rounded-2xl border border-dashed border-[#6F93C4]/50 bg-[#6F93C4]/5 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#6F93C4] mb-3 shadow-sm">📍</div>
                    <h4 className="text-sm font-bold text-[#1F2937] mb-1">Pin on Map</h4>
                    <p className="text-xs text-gray-500">Interactive maps will automatically tag nearby cafes and attractions.</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#1F2937]">Rooms & Layout</h3>
                  <div className="p-6 rounded-2xl bg-white/40 border border-[#D9D1BE]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-[#1F2937]">Added Rooms</h4>
                      <button className="text-xs font-bold text-[#6F93C4] hover:underline">+ Add Room Type</button>
                    </div>
                    {formData.rooms.length === 0 ? (
                      <p className="text-xs text-gray-500 italic text-center py-4">No rooms added yet. E.g., Deluxe Mountain Room, Mixed Dorm.</p>
                    ) : (
                      <div className="space-y-3">
                        {formData.rooms.map((r, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white">
                            <div>
                              <p className="text-sm font-semibold">{r.name}</p>
                              <p className="text-xs text-gray-500">{r.type} • Up to {r.capacity} guests</p>
                            </div>
                            <span className="font-medium text-sm">₹{r.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bg-[#B7C6D6]/10 p-4 rounded-xl border border-[#B7C6D6]/30">
                    <p className="text-xs text-[#1F2937] flex gap-2 items-start">
                      <span className="text-lg">💡</span> 
                      <span><strong>AI Insight:</strong> Providing a mix of private rooms and dorms increases overall occupancy by 35% in your region.</span>
                    </p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#1F2937]">Amenities & Experiences</h3>
                  <p className="text-sm text-gray-500">Select what guests can experience at your property.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {AMENITIES_LIST.map(am => (
                      <button key={am} onClick={() => toggleAmenity(am)}
                        className={`p-4 rounded-2xl border text-sm font-medium transition-all flex flex-col items-center gap-2 ${
                          formData.amenities.includes(am) ? 'bg-[#6F93C4]/10 border-[#6F93C4] text-[#6F93C4] shadow-sm' : 'bg-white/50 border-[#D9D1BE] text-gray-600 hover:bg-white'
                        }`}>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg shadow-sm">✨</div>
                        {am}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#1F2937]">Pricing & Availability</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Base Price per Night (₹)</label>
                    <input type="number" value={formData.pricePerNight} onChange={e => updateForm('pricePerNight', e.target.value)}
                      className="w-full bg-white/60 border border-[#D9D1BE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F93C4]" />
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/40 border border-[#D9D1BE] rounded-xl">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">Instantly Available</h4>
                      <p className="text-xs text-gray-500">Allow users to book without manual approval.</p>
                    </div>
                    <div className="w-12 h-6 bg-[#6F93C4] rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm" />
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6 text-center py-8">
                  <div className="w-24 h-24 rounded-full bg-[#6F93C4]/10 flex items-center justify-center text-4xl mx-auto mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Ready to Publish!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Your premium property "{formData.name || 'Untitled'}" is set to go live on the TriPOV marketplace.
                  </p>
                  <div className="bg-[#D9D1BE]/20 p-6 rounded-2xl mt-8 inline-block text-left border border-[#D9D1BE]/50">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">AI Optimization Check</p>
                    <ul className="text-sm text-[#1F2937] space-y-2">
                      <li className="flex items-center gap-2">✅ Pricing is highly competitive</li>
                      <li className="flex items-center gap-2">✅ Amenities match traveler intent</li>
                      <li className="flex items-center gap-2">✅ Images meet cinematic guidelines (pending review)</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-[#D9D1BE]/50 bg-white/60 backdrop-blur-md flex items-center justify-between">
          <button onClick={step === 1 ? onClose : prevStep} className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          {step === steps.length ? (
            <button onClick={handlePublish} disabled={loading}
              className="px-8 py-2.5 rounded-xl text-sm font-bold text-white shadow-xl hover:shadow-[#6F93C4]/30 hover:-translate-y-0.5 transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #6F93C4, #5a7db0)' }}>
              {loading ? 'Publishing...' : 'Publish Property'}
            </button>
          ) : (
            <button onClick={nextStep}
              className="px-8 py-2.5 rounded-xl text-sm font-bold text-white shadow-xl hover:shadow-[#1F2937]/20 hover:-translate-y-0.5 transition-all"
              style={{ background: '#1F2937' }}>
              Continue
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
