import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { addRental, uploadRentalImage } from '../../services/rentalService';
import { RENTAL_CATEGORIES } from '../../data/rentalsData';

const defaultForm = {
  title: '',
  category: 'Bikes & Scooties',
  type: '',
  price: '',
  desc: '',
  destinations: '',
  specs: '',
  availability: 'Available'
};

export default function AddRentalModal({ onClose, onSuccess }) {
  const { currentUser } = useAuth();
  const [form, setForm] = useState(defaultForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    if (!form.title || !form.price) {
      setError('Please fill in required fields (Title & Price)');
      return;
    }
    setSaving(true);
    setError('');
    try {
      let imageUrl = '/himalayan.png'; // Default
      if (imageFile) {
        imageUrl = await uploadRentalImage(imageFile, currentUser?.uid || 'host-123');
      }

      const finalData = {
        ...form,
        price: Number(form.price),
        destinations: form.destinations.split(',').map(d => d.trim()),
        specs: form.specs.split(',').map(s => s.trim()),
        hostId: currentUser?.uid || 'host-123',
        rating: 5.0,
        reviews: 0,
        image: imageUrl
      };

      await addRental(finalData);
      onSuccess?.();
      onClose();
    } catch (e) {
      setError('Failed to publish: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden flex flex-col"
        style={{ background: 'rgba(234,230,223,0.98)', borderRadius: '28px', boxShadow: '0 40px 100px rgba(31,41,55,0.2)', backdropFilter: 'blur(20px)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-4 border-b border-[#D9D1BE]/50 flex justify-between items-center bg-white/20">
          <div>
            <h2 className="text-2xl font-bold text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Add New Rental
            </h2>
            <p className="text-xs text-[#6B7280]">List your equipment for the adventure community.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Image Upload Area */}
          <div 
            onClick={() => fileInputRef.current.click()}
            className="w-full aspect-video rounded-2xl border-2 border-dashed border-[#6F93C4]/30 bg-[#6F93C4]/5 flex flex-col items-center justify-center cursor-pointer hover:bg-[#6F93C4]/10 transition-all overflow-hidden relative"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[#6F93C4]/20 flex items-center justify-center text-[#6F93C4] mb-2 text-2xl">📸</div>
                <p className="text-xs font-bold text-[#6F93C4] uppercase">Click to upload product photo</p>
                <p className="text-[10px] text-gray-500 mt-1">Supports JPG, PNG, WebP</p>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          </div>

          <FieldGroup label="Item Title *">
            <input className="input-field" placeholder="e.g. Royal Enfield Himalayan" value={form.title} onChange={e => update('title', e.target.value)} />
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup label="Category">
              <select className="input-field" value={form.category} onChange={e => update('category', e.target.value)}>
                {RENTAL_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </FieldGroup>
            <FieldGroup label="Price / Day (₹) *">
              <input className="input-field" type="number" placeholder="1500" value={form.price} onChange={e => update('price', e.target.value)} />
            </FieldGroup>
          </div>

          <FieldGroup label="Description">
            <textarea className="input-field resize-none" rows={3} placeholder="Describe the condition and key features..." value={form.desc} onChange={e => update('desc', e.target.value)} />
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup label="Destinations">
              <input className="input-field" placeholder="Manali, Spiti, Leh" value={form.destinations} onChange={e => update('destinations', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Status">
              <select className="input-field" value={form.availability} onChange={e => update('availability', e.target.value)}>
                <option>Available</option>
                <option>Unavailable</option>
                <option>Low Stock</option>
              </select>
            </FieldGroup>
          </div>

          {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}
        </div>

        <div className="px-8 py-6 border-t border-[#D9D1BE]/50 flex justify-end gap-4 bg-white/20">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancel</button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-[#6F93C4] hover:bg-[#5a7db0] text-white font-bold text-sm shadow-lg shadow-[#6F93C4]/30 transition-all disabled:opacity-50"
          >
            {saving ? '⏳ Publishing...' : '🚀 List Item Now'}
          </button>
        </div>
      </motion.div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border-radius: 14px;
          border: 1px solid rgba(111,147,196,0.2);
          background: rgba(255,255,255,0.7);
          font-size: 13px;
          color: #1F2937;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus { border-color: #6F93C4; box-shadow: 0 0 0 3px rgba(111,147,196,0.1); }
      `}</style>
    </div>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{label}</label>
      {children}
    </div>
  );
}
