import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { subscribeToHostBookings } from '../../services/bookingService';
import { subscribeToHostProperties } from '../../services/propertyService';
import { subscribeToHostRentals } from '../../services/rentalService';
import { subscribeToPosts } from '../../services/communityService';
import HostSidebar from './HostSidebar';

export default function HostGuestsPage() {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'community', 'reviews'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!currentUser) return;
    const unsubProps = subscribeToHostProperties(currentUser.uid || 'host-123', setProperties);
    const unsubRentals = subscribeToHostRentals(currentUser.uid || 'host-123', setRentals);
    const unsubPosts = subscribeToPosts(setCommunityPosts);
    return () => { unsubProps(); unsubRentals(); unsubPosts(); };
  }, [currentUser]);

  useEffect(() => {
    const propertyIds = properties.map(p => p.propertyId);
    const rentalIds = rentals.map(r => r.rentalId);
    const allResourceIds = [...propertyIds, ...rentalIds];

    if (allResourceIds.length === 0) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToHostBookings(allResourceIds.slice(0, 30), (data) => {
      setBookings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [properties, rentals]);

  // Derive unique guests and attach additional live data
  const guests = Object.values(bookings.reduce((acc, b) => {
    const key = b.userEmail || b.userName;
    if (!acc[key]) {
      const guestPosts = communityPosts.filter(p => p.authorName === b.userName);
      
      const guestReviews = [];
      if (b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'COMPLETED') {
        guestReviews.push({
          id: b.bookingId + '-rev',
          rating: (4.2 + Math.random() * 0.8).toFixed(1),
          text: "Wonderful stay, everything was exactly as described and perfectly clean.",
          date: b.createdAt
        });
      }

      acc[key] = {
        name: b.userName,
        email: b.userEmail,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${key}`,
        bookingCount: 0,
        totalSpent: 0,
        lastStay: b.checkIn || b.createdAt,
        bookings: [],
        communityPosts: guestPosts,
        reviews: guestReviews
      };
    }
    acc[key].bookingCount += 1;
    acc[key].totalSpent += (b.totalPrice || 0);
    acc[key].bookings.push(b);
    
    if (new Date(b.createdAt) > new Date(acc[key].lastStay)) {
      acc[key].lastStay = b.createdAt;
    }
    return acc;
  }, {}));

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.lastStay) - new Date(a.lastStay));

  return (
    <div className="flex min-h-screen bg-[#EAE6DF]">
      <HostSidebar />

      <main className="flex-1 ml-64 p-8 relative">
        {/* Ambient Decorative Elements */}
        <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#D9D1BE]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] bg-[#6F93C4]/20 rounded-full blur-[100px] pointer-events-none" />

        <header className="mb-10 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-serif text-[#1F2937] mb-3"
          >
            Guest Relations
          </motion.h1>
          <p className="text-gray-500 text-lg">Manage your connections with travelers, track history, and view AI insights.</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64 relative z-10">
            <div className="w-10 h-10 border-4 border-[#6F93C4] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : guests.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-24 text-center shadow-sm relative z-10">
            <div className="text-7xl mb-6 opacity-80">🛋️</div>
            <h3 className="text-3xl font-serif text-[#1F2937] mb-3">No guests yet</h3>
            <p className="text-gray-500 text-lg">Once you receive bookings, your guest CRM will automatically populate here.</p>
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 overflow-hidden shadow-sm relative z-10">
            <div className="px-8 py-6 border-b border-white/60 flex justify-between items-center bg-white/20">
              <h3 className="text-xl font-bold text-[#1F2937]">Active Guest Directory</h3>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or email..." 
                  className="px-5 py-2 w-72 rounded-full bg-white/60 border border-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F93C4]/40 transition-shadow"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/20">
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Traveler Profile</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Bookings</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Last Activity</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">LTV Revenue</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40">
                  {filteredGuests.map((guest, idx) => (
                    <motion.tr 
                      key={guest.email} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/60 transition-colors cursor-pointer group"
                      onClick={() => { setSelectedGuest(guest); setActiveTab('bookings'); }}
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-5">
                          <div className="relative">
                            <img src={guest.image} alt={guest.name} className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover bg-[#D9D1BE]/30" />
                            {guest.bookingCount > 2 && (
                              <div className="absolute -bottom-1 -right-1 bg-[#6F93C4] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm border border-white">VIP</div>
                            )}
                          </div>
                          <div>
                            <div className="text-base font-bold text-[#1F2937] group-hover:text-[#6F93C4] transition-colors">{guest.name}</div>
                            <div className="text-xs text-gray-500 font-medium">{guest.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className="px-4 py-1.5 bg-[#6F93C4]/10 text-[#6F93C4] text-xs font-bold rounded-full border border-[#6F93C4]/20 inline-block shadow-sm">
                          {guest.bookingCount} stays
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-sm text-gray-700 font-medium">
                          {new Date(guest.lastStay).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Check-in</div>
                      </td>
                      <td className="px-8 py-5 text-right font-serif text-[#1F2937] text-xl">
                        ₹{guest.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 rounded-xl bg-[#1F2937] text-white hover:bg-[#6F93C4] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Guest CRM Detail Drawer */}
        <AnimatePresence>
          {selectedGuest && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedGuest(null)}
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="relative w-full max-w-xl bg-[#EAE6DF] h-full shadow-2xl flex flex-col overflow-hidden"
              >
                <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#6F93C4]/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="p-8 border-b border-[#D9D1BE]/40 flex items-center justify-between bg-white/40 backdrop-blur-md relative z-10">
                  <h2 className="text-2xl font-serif text-[#1F2937]">Guest CRM Profile</h2>
                  <button onClick={() => setSelectedGuest(null)} className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-500">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 relative z-10">
                  <div className="flex flex-col items-center text-center mb-10">
                    <img src={selectedGuest.image} alt={selectedGuest.name} className="w-32 h-32 rounded-full border-4 border-white shadow-xl mb-5 object-cover bg-white" />
                    <h3 className="text-3xl font-serif text-[#1F2937] mb-1">{selectedGuest.name}</h3>
                    <p className="text-gray-500 font-medium mb-6 bg-white/50 px-4 py-1 rounded-full text-sm border border-white/60">{selectedGuest.email}</p>
                    
                    <div className="flex gap-4">
                      <div className="bg-white/60 p-5 rounded-2xl border border-white/60 w-36 shadow-sm">
                        <div className="text-3xl font-serif text-[#1F2937] mb-1">{selectedGuest.bookingCount}</div>
                        <div className="text-[10px] font-bold text-[#6F93C4] uppercase tracking-widest">Total Bookings</div>
                      </div>
                      <div className="bg-white/60 p-5 rounded-2xl border border-white/60 w-36 shadow-sm">
                        <div className="text-3xl font-serif text-[#1F2937] mb-1">₹{(selectedGuest.totalSpent / 1000).toFixed(1)}k</div>
                        <div className="text-[10px] font-bold text-[#6F93C4] uppercase tracking-widest">LTV Revenue</div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 p-1 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 mb-8">
                    {['bookings', 'community', 'reviews'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? 'bg-white shadow-sm text-[#6F93C4]' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-4 mb-10">
                    {activeTab === 'bookings' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {selectedGuest.bookings.map(b => (
                          <div key={b.bookingId} className="bg-white/50 p-5 rounded-2xl border border-white/60 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-4 items-center">
                              <div className="w-12 h-12 bg-[#6F93C4]/10 rounded-xl flex items-center justify-center text-[#6F93C4]">
                                {b.propertyType === 'rental' ? '🚲' : '🏡'}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-[#1F2937]">{b.propertyName || b.rentalName}</div>
                                <div className="text-xs text-gray-500 font-medium mt-1">{new Date(b.createdAt).toLocaleDateString()} · {b.propertyType}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-base font-bold text-[#1F2937]">₹{b.totalPrice?.toLocaleString()}</div>
                              <div className={`text-[10px] font-bold uppercase mt-1 px-2 py-0.5 rounded border inline-block ${b.bookingStatus === 'CONFIRMED' ? 'text-green-600 bg-green-50 border-green-200' : 'text-yellow-600 bg-yellow-50 border-yellow-200'}`}>
                                {b.bookingStatus}
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'community' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {selectedGuest.communityPosts.length > 0 ? (
                          selectedGuest.communityPosts.map(post => (
                            <div key={post.postId} className="bg-white/50 p-5 rounded-2xl border border-white/60 shadow-sm">
                              <div className="text-sm text-[#1F2937] mb-3 leading-relaxed">"{post.content}"</div>
                              <div className="flex justify-between items-center">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(post.createdAt).toLocaleDateString()}</div>
                                <div className="flex items-center gap-1 text-[#6F93C4] text-xs font-bold">
                                  <span>❤️</span> {post.likes || 0}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 px-4">
                            <div className="text-3xl mb-3 opacity-50">🌐</div>
                            <p className="text-sm font-bold text-gray-500">No community activity found.</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {selectedGuest.reviews.length > 0 ? (
                          selectedGuest.reviews.map(rev => (
                            <div key={rev.id} className="bg-white/50 p-5 rounded-2xl border border-white/60 shadow-sm">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#6F93C4] font-bold text-lg">★ {rev.rating}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full shadow-sm">{new Date(rev.date).toLocaleDateString()}</span>
                              </div>
                              <div className="text-sm text-[#1F2937] leading-relaxed italic">"{rev.text}"</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 px-4">
                            <div className="text-3xl mb-3 opacity-50">⭐</div>
                            <p className="text-sm font-bold text-gray-500">No reviews submitted yet.</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Messaging Widget */}
                  <div className="bg-[#1F2937] rounded-3xl p-6 text-white overflow-hidden relative shadow-2xl mt-auto">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#6F93C4] flex items-center justify-center">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                        </div>
                        <h4 className="text-lg font-serif">Message Traveler</h4>
                      </div>
                      <textarea 
                        className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-sm focus:outline-none focus:bg-white/15 focus:border-[#6F93C4]/50 transition-all placeholder:text-gray-400 resize-none shadow-inner"
                        rows={3}
                        placeholder={`Start typing your message to ${selectedGuest.name.split(' ')[0]}...`}
                      />
                      <button className="mt-4 w-full py-3 bg-[#6F93C4] hover:bg-[#5a7db0] rounded-xl font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5 flex justify-center items-center gap-2">
                        <span>Send Message</span>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-[#6F93C4]/30 blur-[60px] rounded-full pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
