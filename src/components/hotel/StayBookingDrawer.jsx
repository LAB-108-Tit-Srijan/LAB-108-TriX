import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createBooking } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';

export default function StayBookingDrawer({ isOpen, onClose, stay, initialRoom }) {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(initialRoom || (stay?.rooms ? stay.rooms[0] : null));
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [addons, setAddons] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Reset step when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialRoom) setSelectedRoom(initialRoom);
      else if (stay?.rooms?.length) setSelectedRoom(stay.rooms[0]);
    }
  }, [isOpen, stay, initialRoom]);

  if (!isOpen || !stay) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Pricing Calculation
  const pricePerNight = selectedRoom?.price || stay.pricePerNight;
  
  // Basic duration calc (mock 3 nights if dates empty)
  let nights = 3; 
  if (checkIn && checkOut) {
    const diff = new Date(checkOut) - new Date(checkIn);
    nights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  const basePrice = pricePerNight * nights * roomsCount;
  
  // Addons calc
  const availableAddons = [
    { id: 'breakfast', name: 'Breakfast Included', price: 800 * guests * nights },
    { id: 'bonfire', name: 'Private Bonfire', price: 1500 },
    { id: 'pickup', name: 'Airport/Station Pickup', price: 2500 }
  ];

  const addonsTotal = addons.reduce((sum, addonId) => {
    const ad = availableAddons.find(a => a.id === addonId);
    return sum + (ad ? ad.price : 0);
  }, 0);

  const taxes = Math.round((basePrice + addonsTotal) * 0.18);
  const serviceFee = 500;
  const grandTotal = basePrice + addonsTotal + taxes + serviceFee;

  const toggleAddon = (id) => {
    if (addons.includes(id)) setAddons(addons.filter(a => a !== id));
    else setAddons([...addons, id]);
  };

  const handleFinalBooking = async () => {
    setIsSubmitting(true);
    try {
      const bookingData = {
        userId: currentUser?.uid || 'anonymous',
        guestName: guestName || currentUser?.displayName || 'Anonymous Guest',
        guestEmail: guestEmail || currentUser?.email || '',
        guestPhone,
        propertyId: stay.propertyId || stay.id,
        propertyName: stay.name,
        roomType: selectedRoom?.type || 'Standard',
        checkIn,
        checkOut,
        guests,
        nights,
        totalPrice: grandTotal,
        type: 'STAY',
        addons,
        bookingStatus: 'PENDING'
      };
      
      await createBooking(bookingData);
      setStep(7);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to process booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3 } }
  };

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/40 backdrop-blur-sm" onClick={handleBackdropClick}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="w-full md:w-[500px] h-full bg-[#FAFAFA] shadow-2xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
              <div>
                <h2 className="text-xl font-serif text-[#1F2937]">{stay.name}</h2>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{stay.location}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center px-6 py-4 bg-white border-b border-gray-100">
              {[1,2,3,4,5,6].map(s => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-[#6F93C4]' : 'bg-gray-100'}`} />
                  {s < 6 && <div className="w-1" />}
                </div>
              ))}
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-gray-900">Select Room Type</h3>
                  <div className="space-y-4">
                    {stay.rooms?.map(room => (
                      <div 
                        key={room.id} 
                        onClick={() => setSelectedRoom(room)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-4 ${selectedRoom?.id === room.id ? 'border-[#6F93C4] bg-blue-50/30' : 'border-gray-100 hover:border-gray-300 bg-white'}`}
                      >
                        <img src={room.image} alt={room.type} className="w-24 h-24 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{room.type}</h4>
                          <p className="text-sm text-[#6F93C4] font-semibold mt-1">₹{room.price} / night</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {room.features.map(f => (
                              <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">{f}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-medium text-gray-900 mb-3">Room Quantity</h4>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">-</button>
                      <span className="font-semibold text-lg">{roomsCount}</span>
                      <button onClick={() => setRoomsCount(roomsCount + 1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">+</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-gray-900">Select Dates</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-In</label>
                      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#6F93C4] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out</label>
                      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#6F93C4] outline-none" />
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium text-gray-900 mb-3">Guests</h4>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">-</button>
                      <span className="font-semibold text-lg">{guests}</span>
                      <button onClick={() => setGuests(guests + 1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">+</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-gray-900">Guest Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Enter full name" className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#6F93C4] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="Email for booking confirmation" className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#6F93C4] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+91" className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#6F93C4] outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-gray-900">Add-ons & Experiences</h3>
                  <div className="space-y-4">
                    {availableAddons.map(addon => (
                      <div 
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${addons.includes(addon.id) ? 'border-[#6F93C4] bg-blue-50/30' : 'border-gray-100 bg-white'}`}
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{addon.name}</h4>
                          <p className="text-sm text-gray-500">+₹{addon.price}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${addons.includes(addon.id) ? 'border-[#6F93C4] bg-[#6F93C4]' : 'border-gray-300'}`}>
                          {addons.includes(addon.id) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-gray-900">Price Breakdown</h3>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>{selectedRoom?.type} x {roomsCount} ({nights} nights)</span>
                      <span className="font-medium">₹{basePrice}</span>
                    </div>
                    {addonsTotal > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Add-ons</span>
                        <span className="font-medium">₹{addonsTotal}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes & GST (18%)</span>
                      <span className="font-medium">₹{taxes}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service Fee</span>
                      <span className="font-medium">₹{serviceFee}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total (INR)</span>
                      <span className="text-2xl font-bold text-[#6F93C4]">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-gray-900">Secure Payment</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-[#6F93C4] bg-blue-50 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <span className="text-xl">💳</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Amount to Pay</h4>
                        <p className="text-lg font-bold text-[#6F93C4]">₹{grandTotal}</p>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mt-6">Select Payment Method</h4>
                    <div className="space-y-3">
                      {['UPI (GPay, PhonePe, Paytm)', 'Credit / Debit Card', 'Net Banking'].map((method, i) => (
                        <div key={i} className="p-4 rounded-xl border border-gray-200 bg-white hover:border-[#6F93C4] cursor-pointer flex items-center justify-between transition-colors">
                          <span className="font-medium text-gray-700">{method}</span>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-6 text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="text-3xl font-serif text-gray-900 mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">Your stay at {stay.name} has been confirmed. A detailed itinerary has been sent to {guestEmail || 'your email'}.</p>
                  
                  <div className="mt-8 p-6 bg-white rounded-xl border border-gray-100 text-left">
                    <div className="text-sm text-gray-500 mb-1">Booking ID</div>
                    <div className="font-mono font-bold text-gray-900 mb-4">TRPV-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                    
                    <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">Check-in</div>
                        <div className="font-medium">{checkIn || 'Not set'}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">Check-out</div>
                        <div className="font-medium">{checkOut || 'Not set'}</div>
                      </div>
                    </div>
                    
                    <button onClick={onClose} className="w-full py-3 rounded-xl bg-gray-100 font-medium text-gray-900 hover:bg-gray-200 transition-colors">
                      View My Trips
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Navigation */}
            {step < 7 && (
              <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
                {step > 1 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={step === 6 ? handleFinalBooking : () => setStep(step + 1)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-md disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)' }}
                >
                  {isSubmitting ? 'Processing...' : step === 1 ? 'Select Dates' : step === 6 ? 'Pay Securely' : 'Continue'}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
