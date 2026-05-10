import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { subscribeToHostBookings, updateBookingStatus } from '../../services/bookingService';
import { subscribeToHostProperties } from '../../services/propertyService';
import HostSidebar from './HostSidebar';
import CalendarModal from './CalendarModal';

export default function HostBookingsPage() {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 1. Subscribe to Host's Properties first to get the IDs
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToHostProperties(currentUser.uid, (props) => {
      setProperties(props);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // 2. Subscribe to Bookings for those Properties
  useEffect(() => {
    if (properties.length === 0) {
      if (loading) setLoading(false);
      return;
    }

    const propertyIds = properties.map(p => p.propertyId);
    const unsubscribe = subscribeToHostBookings(propertyIds, (data) => {
      setBookings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [properties]);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📊', color: '#6F93C4' },
    { label: 'Pending Approval', value: bookings.filter(b => b.bookingStatus === 'PENDING').length, icon: '⏳', color: '#D9D1BE' },
    { label: 'Confirmed', value: bookings.filter(b => b.bookingStatus === 'CONFIRMED').length, icon: '✅', color: '#8B9D83' },
    { label: 'Check-ins Today', value: 0, icon: '🔑', color: '#B7C6D6' }, // Mock for now
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.propertyId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || booking.bookingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-[#8B9D83]/20 text-[#8B9D83]';
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-700';
      case 'CANCELLED': return 'bg-red-500/20 text-red-700';
      case 'COMPLETED': return 'bg-blue-500/20 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EAE6DF]">
      <HostSidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-serif text-[#1F2937] mb-2"
              >
                Reservation Management
              </motion.h1>
              <p className="text-gray-500">Manage your guest stays and booking requests in real-time.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl text-sm font-semibold hover:bg-white/80 transition-all">
                Export Reports
              </button>
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="px-6 py-3 bg-[#6F93C4] text-white rounded-2xl text-sm font-semibold shadow-lg shadow-[#6F93C4]/20 hover:scale-[1.02] transition-all"
              >
                Calendar View
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-sm"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#1F2937] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </header>

        {/* Filters & Search */}
        <section className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === status 
                  ? 'bg-[#1F2937] text-white' 
                  : 'bg-white/60 text-gray-500 hover:bg-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search guest or property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F93C4]/20"
            />
            <svg className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </section>

        {/* Bookings Table/List */}
        <section className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/60">
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Guest</th>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Property / Stay</th>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Dates</th>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Total</th>
                  <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center text-gray-500">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-[#6F93C4] border-t-transparent rounded-full animate-spin mb-4"></div>
                        Syncing with Cloud Registry...
                      </div>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center text-gray-500 italic">
                      No reservations found for the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <motion.tr 
                      key={booking.bookingId}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/40 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#Mist Blue] flex items-center justify-center text-[#6F93C4] font-bold border border-white shadow-sm">
                            {booking.guestName?.charAt(0) || 'G'}
                          </div>
                          <div>
                            <div className="font-bold text-[#1F2937]">{booking.guestName || 'Anonymous Guest'}</div>
                            <div className="text-xs text-gray-500">{booking.guestEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-semibold text-sm text-[#1F2937]">
                          {properties.find(p => p.propertyId === booking.propertyId)?.name || 'Loading...'}
                        </div>
                        <div className="text-xs text-gray-500">{booking.roomType || 'Standard Room'}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium text-gray-700">
                          {booking.checkIn} — {booking.checkOut}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
                          {booking.nights} Nights • {booking.guests} Guests
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(booking.bookingStatus)}`}>
                          {booking.bookingStatus}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-[#1F2937]">₹{booking.totalPrice?.toLocaleString() || 0}</div>
                        <div className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Paid via UPI</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 hover:bg-[#6F93C4]/10 rounded-lg text-[#6F93C4] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Revenue Insights Widget */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-[#1F2937] text-white rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-[#6F93C4] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">AI Revenue Insights</span>
              <h2 className="text-3xl font-serif mb-4">You're on track to hit 120% of your quarterly target.</h2>
              <p className="text-gray-400 mb-8 max-w-lg">Based on historical trends and upcoming local events (Nature Fest, Monsoon Trek), we recommend increasing rates by 15% for the first week of next month.</p>
              <button className="px-8 py-4 bg-white text-[#1F2937] rounded-2xl font-bold text-sm hover:bg-[#6F93C4] hover:text-white transition-all">
                View Recommendations
              </button>
            </div>
            {/* Abstract Decoration */}
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#6F93C4]/20 blur-[100px] rounded-full" />
          </div>

          <div className="bg-[#D9D1BE] rounded-[2.5rem] p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2">Guest Sentiment</h3>
              <p className="text-sm text-[#1F2937]/70">Most guests mention the "cinematic forest view" as their favorite part of the stay.</p>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-serif font-bold text-[#1F2937]">4.9</span>
                <div className="flex gap-1 text-[#1F2937]">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#6F93C4] h-full w-[95%]"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block ${getStatusColor(selectedBooking.bookingStatus)}`}>
                      {selectedBooking.bookingStatus}
                    </span>
                    <h2 className="text-3xl font-serif text-[#1F2937]">{selectedBooking.guestName}</h2>
                    <p className="text-gray-500">{selectedBooking.guestEmail}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Stay Details</div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-gray-500">Property</div>
                        <div className="font-bold text-[#1F2937]">{properties.find(p => p.propertyId === selectedBooking.propertyId)?.name}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Room Type</div>
                        <div className="font-bold text-[#1F2937]">{selectedBooking.roomType || 'Standard Room'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Dates</div>
                        <div className="font-bold text-[#1F2937]">{selectedBooking.checkIn} to {selectedBooking.checkOut}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Financials</div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Nightly Rate</span>
                        <span className="font-bold">₹{selectedBooking.totalPrice / selectedBooking.nights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Taxes & Fees</span>
                        <span className="font-bold">Included</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-900">Grand Total</span>
                        <span className="text-2xl font-bold text-[#6F93C4]">₹{selectedBooking.totalPrice?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedBooking.bookingStatus === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => {
                          updateBookingStatus(selectedBooking.bookingId, 'CONFIRMED');
                          setSelectedBooking(null);
                        }}
                        className="flex-1 py-4 bg-[#6F93C4] text-white rounded-2xl font-bold hover:bg-[#5a7db0] transition-all"
                      >
                        Approve Reservation
                      </button>
                      <button 
                        onClick={() => {
                          updateBookingStatus(selectedBooking.bookingId, 'CANCELLED');
                          setSelectedBooking(null);
                        }}
                        className="flex-1 py-4 bg-white border-2 border-red-200 text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {selectedBooking.bookingStatus === 'CONFIRMED' && (
                    <button 
                      onClick={() => {
                        updateBookingStatus(selectedBooking.bookingId, 'COMPLETED');
                        setSelectedBooking(null);
                      }}
                      className="flex-1 py-4 bg-[#8B9D83] text-white rounded-2xl font-bold hover:opacity-90 transition-all"
                    >
                      Mark as Checked-Out
                    </button>
                  )}
                  <button className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                    Message Guest
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CalendarModal 
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        bookings={bookings}
        properties={properties}
      />
    </div>
  );
}
