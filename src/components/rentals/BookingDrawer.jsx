import { useState, Component } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div className="fixed inset-0 z-[200] bg-white text-red-500 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Drawer Rendering Error</h1>
        <pre className="text-sm bg-red-50 p-4 rounded">{this.state.error.toString()}</pre>
        <pre className="text-xs bg-red-100 p-4 rounded mt-4">{this.state.error.stack}</pre>
      </div>;
    }
    return this.props.children; 
  }
}

function BookingDrawerContent({ rental, onClose }) {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState([]);
  const [pickup, setPickup] = useState('Manali');
  const [deliveryType, setDeliveryType] = useState('Pickup');
  const [size, setSize] = useState('L');
  const [licenseUploaded, setLicenseUploaded] = useState(false);

  if (!rental) return null;

  const isBike = rental.category === 'Bikes & Scooties';
  const isTent = rental.category === 'Camping & Tent Gear';
  const isTrek = rental.category === 'Trekking & Hiking Gear';
  const isPhoto = rental.category === 'Travel Photography Gear';
  const isBackpack = rental.category === 'Backpacking Essentials';

  const availableAddons = isBike ? [
    { name: 'Comprehensive Insurance', price: 200 },
    { name: 'Extra Helmet', price: 100 },
    { name: 'Riding Jacket', price: 300 }
  ] : isTent ? [
    { name: 'Sleeping Bag (-10°C)', price: 150 },
    { name: 'Portable Bonfire Kit', price: 400 },
    { name: 'Camping Stove', price: 200 }
  ] : isTrek ? [
    { name: 'Headlamp', price: 50 },
    { name: 'Hydration Pack', price: 100 },
    { name: 'Oxygen Canister', price: 500 }
  ] : isPhoto ? [
    { name: 'Extra Battery Kit', price: 300 },
    { name: 'Carbon Fiber Tripod', price: 200 },
    { name: '128GB Memory Card', price: 100 }
  ] : [
    { name: 'Solar Power Bank', price: 150 },
    { name: 'First Aid Kit', price: 50 }
  ];

  const calculateTotal = () => {
    const baseCost = rental.price * duration * quantity;
    const addonCost = addons.reduce((sum, a) => sum + (availableAddons.find(x => x.name === a)?.price || 0) * duration, 0);
    const insuranceCost = isBike ? 200 * duration : 0;
    const deposit = isPhoto ? 5000 : rental.price * 2;
    const taxes = Math.round((baseCost + addonCost + insuranceCost) * 0.18);
    
    return {
      baseCost, addonCost, insuranceCost, deposit, taxes,
      total: baseCost + addonCost + insuranceCost + taxes + deposit
    };
  };

  const costs = calculateTotal();

  const toggleAddon = (name) => {
    setAddons(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  };

  // Use a portal to render at the top level of document body, escaping CSS filters/transforms
  const drawerContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-y-auto"
        >
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-medium" style={{ fontFamily: 'Playfair Display,serif', color: '#1F2937' }}>
              {step === 4 ? 'Booking Confirmed' : 'Complete Booking'}
            </h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            {step < 4 && (
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                  <img src={rental.image} alt={rental.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#6F93C4] uppercase tracking-wider">{rental.category.split(' ')[0]}</div>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight">{rental.title}</h3>
                  <div className="text-xs text-gray-500">₹{rental.price}/day</div>
                </div>
              </div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Duration (Days)</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg hover:bg-gray-200">-</button>
                    <span className="text-xl font-medium w-8 text-center">{duration}</span>
                    <button onClick={() => setDuration(duration + 1)} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg hover:bg-gray-200">+</button>
                  </div>
                </div>

                {(isTent || isTrek || isBackpack) && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Quantity</label>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg hover:bg-gray-200">-</button>
                      <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg hover:bg-gray-200">+</button>
                    </div>
                  </div>
                )}

                {isBike && (
                  <>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Pickup Location</label>
                      <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 outline-none">
                        {['Delhi', 'Chandigarh', 'Manali', 'Goa', 'Bangalore', 'Rishikesh'].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Driving License</label>
                      <div 
                        onClick={() => setLicenseUploaded(true)}
                        className={`w-full p-4 rounded-xl border-2 border-dashed cursor-pointer text-center transition-all ${licenseUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-[#6F93C4] bg-gray-50'}`}
                      >
                        <span className={`text-sm font-medium ${licenseUploaded ? 'text-green-600' : 'text-gray-500'}`}>
                          {licenseUploaded ? '✓ License Uploaded' : 'Tap to Upload DL Image'}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {isTent && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Delivery Option</label>
                    <div className="flex gap-2">
                      {['Pickup', 'Hotel Delivery'].map(type => (
                        <button key={type} onClick={() => setDeliveryType(type)} className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-colors ${deliveryType === type ? 'border-[#6F93C4] bg-[#6F93C4]/10 text-[#1F2937]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isTrek && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Size Selection</label>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map(s => (
                        <button key={s} onClick={() => setSize(s)} className={`w-12 h-12 rounded-xl border text-sm font-medium transition-colors ${size === s ? 'border-[#6F93C4] bg-[#6F93C4]/10 text-[#1F2937]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Enhance Your Adventure</label>
                {availableAddons.map(addon => (
                  <label key={addon.name} onClick={() => toggleAddon(addon.name)} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${addons.includes(addon.name) ? 'border-[#6F93C4] bg-[#6F93C4]/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${addons.includes(addon.name) ? 'bg-[#6F93C4] border-[#6F93C4]' : 'border-gray-300'}`}>
                        {addons.includes(addon.name) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{addon.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">+₹{addon.price}/day</span>
                  </label>
                ))}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                <div className="bg-gradient-to-br from-[#EAE6DF]/50 to-white p-6 rounded-2xl border border-[#D9D1BE]/50">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Payment Summary</h3>
                  
                  <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span>Rental ({duration} days {quantity > 1 ? `x ${quantity}` : ''})</span>
                      <span className="font-medium text-gray-900">₹{costs.baseCost}</span>
                    </div>
                    {addons.length > 0 && (
                      <div className="flex justify-between">
                        <span>Add-ons ({addons.length})</span>
                        <span className="font-medium text-gray-900">₹{costs.addonCost}</span>
                      </div>
                    )}
                    {isBike && (
                      <div className="flex justify-between">
                        <span>Insurance</span>
                        <span className="font-medium text-gray-900">₹{costs.insuranceCost}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Taxes & Fees (18%)</span>
                      <span className="font-medium text-gray-900">₹{costs.taxes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refundable Deposit</span>
                      <span className="font-medium text-gray-900">₹{costs.deposit}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-[#6F93C4]">₹{costs.total}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['UPI', 'Credit/Debit', 'Net Banking'].map(m => (
                    <div key={m} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                      {m} Supported
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display,serif' }}>Booking Confirmed</h3>
                <p className="text-sm text-gray-500 mb-6">Your booking ID is <span className="font-bold text-gray-900">#TRP-{Math.floor(Math.random() * 10000)}</span>. Details sent to email.</p>
                
                <div className="bg-gray-50 p-5 rounded-xl w-full text-left border border-gray-100">
                  {isBike && (
                    <>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pickup Instructions</div>
                      <div className="text-sm font-medium text-gray-900 mb-4">Report to {pickup} Hub. Show DL.</div>
                    </>
                  )}
                  {isTent && (
                    <>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Delivery Tracking</div>
                      <div className="text-sm font-medium text-gray-900 mb-4">{deliveryType === 'Pickup' ? 'Collect from Hub' : 'Will be delivered to hotel.'}</div>
                    </>
                  )}
                  {isPhoto && (
                    <>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Security Notice</div>
                      <div className="text-sm font-medium text-gray-900 mb-4">Refundable deposit ₹{costs.deposit} held.</div>
                    </>
                  )}
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Paid</div>
                  <div className="text-sm font-bold text-[#6F93C4]">₹{costs.total}</div>
                </div>
              </motion.div>
            )}

            <div className="mt-auto pt-6 flex gap-3 border-t border-gray-100">
              {step > 1 && step < 4 && (
                <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50">
                  Back
                </button>
              )}
              {step < 4 ? (
                <button 
                  onClick={() => {
                    if (step === 1 && isBike && !licenseUploaded) {
                      alert("Please upload your Driving License first.");
                      return;
                    }
                    setStep(step + 1);
                  }} 
                  className="flex-1 px-6 py-3 rounded-xl bg-[#1F2937] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#6F93C4] transition-colors shadow-lg hover:shadow-[#6F93C4]/30"
                >
                  {step === 3 ? 'Pay Securely' : 'Next Step'}
                </button>
              ) : (
                <button 
                  onClick={onClose} 
                  className="flex-1 px-6 py-3 rounded-xl border border-[#D9D1BE] text-sm font-bold uppercase tracking-wider text-gray-800 hover:bg-gray-50"
                >
                  View in Dashboard
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
}

export default function BookingDrawer(props) {
  return <ErrorBoundary><BookingDrawerContent {...props} /></ErrorBoundary>;
}
