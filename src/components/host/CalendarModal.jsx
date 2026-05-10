import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CalendarModal({ isOpen, onClose, bookings, properties }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Helper to find bookings on a specific day
  const getBookingsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => {
      // Very simple string check for now (Real logic would compare Date objects)
      return b.checkIn <= dateStr && b.checkOut >= dateStr;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-[#EAE6DF] rounded-[3rem] shadow-2xl overflow-hidden border border-white/40"
          >
            <div className="flex h-[700px]">
              {/* Left Side: Calendar Control */}
              <div className="w-1/3 bg-white/40 backdrop-blur-md p-10 border-r border-white/40 flex flex-col">
                <div className="mb-10">
                  <h2 className="text-3xl font-serif text-[#1F2937] mb-2">Availability</h2>
                  <p className="text-sm text-gray-500">Manage property availability and blocked dates.</p>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="bg-white/60 p-6 rounded-3xl border border-white/60">
                    <div className="text-[10px] font-bold text-[#6F93C4] uppercase tracking-widest mb-4">Legend</div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#6F93C4]" />
                        <span className="text-gray-700">Confirmed Booking</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#D9D1BE]" />
                        <span className="text-gray-700">Pending Request</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#1F2937]" />
                        <span className="text-gray-700">Blocked by Host</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1F2937] text-white p-6 rounded-3xl shadow-lg shadow-[#1F2937]/20">
                    <h4 className="font-bold mb-2">Smart Suggestion</h4>
                    <p className="text-xs text-gray-400">Demand for your area is up by 25% for the upcoming weekend. Consider opening up blocked slots.</p>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="mt-auto py-4 bg-white border border-gray-200 rounded-2xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Close Calendar
                </button>
              </div>

              {/* Right Side: The Grid */}
              <div className="flex-1 p-10 flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-serif text-[#1F2937]">{monthNames[month]} {year}</h3>
                  <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-3 bg-white/60 rounded-xl hover:bg-white transition-all">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={nextMonth} className="p-3 bg-white/60 rounded-xl hover:bg-white transition-all">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-7 gap-2 overflow-y-auto pr-2 custom-scrollbar">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest py-2">
                      {day}
                    </div>
                  ))}

                  {/* Empty slots for first day */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square bg-transparent" />
                  ))}

                  {/* Day slots */}
                  {Array.from({ length: days }).map((_, i) => {
                    const day = i + 1;
                    const dayBookings = getBookingsForDay(day);
                    return (
                      <div 
                        key={day} 
                        className="aspect-square bg-white/40 border border-white/60 rounded-2xl p-2 relative group hover:bg-white hover:shadow-xl transition-all cursor-pointer"
                      >
                        <span className="text-xs font-bold text-gray-400 group-hover:text-[#1F2937]">{day}</span>
                        
                        <div className="mt-1 flex flex-col gap-1 overflow-hidden">
                          {dayBookings.map((b, idx) => (
                            <div 
                              key={b.bookingId}
                              className={`h-1 rounded-full ${
                                b.bookingStatus === 'CONFIRMED' ? 'bg-[#6F93C4]' : 'bg-[#D9D1BE]'
                              }`}
                              title={b.guestName}
                            />
                          ))}
                        </div>

                        {/* Hover Tooltip/Detail */}
                        {dayBookings.length > 0 && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-2xl rounded-xl p-3 border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none z-20 transition-opacity">
                            <div className="text-[10px] font-bold text-[#6F93C4] mb-2 uppercase tracking-tighter">{dayBookings.length} Bookings</div>
                            {dayBookings.map(b => (
                              <div key={b.bookingId} className="text-[10px] text-gray-700 font-medium border-l-2 border-[#6F93C4] pl-2 mb-1">
                                {b.guestName}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
