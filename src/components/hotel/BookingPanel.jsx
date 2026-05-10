import { useState } from 'react';
import StayBookingDrawer from './StayBookingDrawer';

export default function BookingPanel({ stay, selectedRoom, setSelectedRoom }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const price = selectedRoom?.price || stay?.pricePerNight || 0;

  return (
    <>
      <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100 relative">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6F93C4]/10 blur-[40px] rounded-full pointer-events-none" />

        <div className="mb-6">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-semibold text-gray-900">₹{price}</span>
            <span className="text-sm font-light text-gray-500 mb-1">/ night</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
            ⭐ {stay?.rating} <span className="text-gray-400 font-light underline ml-1 cursor-pointer">{stay?.reviews} reviews</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <div className="flex-1 p-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Check-in</div>
              <div className="text-sm font-medium text-gray-900">Add date</div>
            </div>
            <div className="flex-1 p-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Check-out</div>
              <div className="text-sm font-medium text-gray-900">Add date</div>
            </div>
          </div>
          <div className="p-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Guests</div>
            <div className="text-sm font-medium text-gray-900">2 guests</div>
          </div>
        </div>

        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-full py-4 rounded-xl text-white font-medium text-base mb-4 transition-all hover:-translate-y-px hover:shadow-xl" 
          style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)' }}
        >
          Reserve Your Escape
        </button>

        <div className="text-center text-xs text-gray-500 font-light mb-6">
          You won't be charged yet
        </div>

        <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between text-sm font-light text-gray-600">
            <span className="underline cursor-pointer">₹{price} x 3 nights</span>
            <span>₹{price * 3}</span>
          </div>
          <div className="flex justify-between text-sm font-light text-gray-600">
            <span className="underline cursor-pointer">Service fee</span>
            <span>₹2,200</span>
          </div>
        </div>

        <div className="flex justify-between text-lg font-medium text-gray-900">
          <span>Total before taxes</span>
          <span>₹{(price * 3) + 2200}</span>
        </div>

        {/* AI Assurance Badge */}
        <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
          <span className="text-[#6F93C4] text-lg">✨</span>
          <div>
            <div className="text-xs font-semibold text-gray-900 mb-1">AI Price Assurance</div>
            <div className="text-xs text-gray-500 font-light">This stay offers exceptional value compared to similar luxury properties in {stay?.location.split(',')[0]}.</div>
          </div>
        </div>
      </div>

      <StayBookingDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        stay={stay} 
        initialRoom={selectedRoom} 
      />
    </>
  );
}
