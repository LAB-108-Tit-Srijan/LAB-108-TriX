import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { subscribeToHostRentals, deleteRental } from '../../services/rentalService';
import HostSidebar from './HostSidebar';
import AddRentalModal from './AddRentalModal';

export default function HostRentalsPage() {
  const { currentUser } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToHostRentals(currentUser.uid || 'host-123', (data) => {
      setRentals(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rental item?')) {
      try {
        await deleteRental(id);
      } catch (e) {
        alert('Failed to delete rental: ' + e.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EAE6DF]">
      <HostSidebar />

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-end mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-serif text-[#1F2937] mb-2"
            >
              Rental Management
            </motion.h1>
            <p className="text-gray-500">Manage your bikes, gear, and travel equipment inventory.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-8 py-3 bg-[#1F2937] text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-[#374151] transition-all flex items-center gap-2"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
            Add New Item
          </button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#6F93C4] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : rentals.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 p-20 text-center">
            <div className="text-6xl mb-6">🚲</div>
            <h3 className="text-2xl font-serif text-[#1F2937] mb-2">No rentals yet</h3>
            <p className="text-gray-500 mb-8">Start by adding your first bike, tent, or gear kit.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-8 py-3 bg-[#6F93C4] text-white rounded-2xl font-bold text-sm shadow-lg"
            >
              Add First Rental
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {rentals.map((item, idx) => (
                <motion.div
                  key={item.rentalId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/60 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1F2937]">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#1F2937] mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter">{item.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-serif text-[#1F2937]">₹{item.price}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">per day</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.specs?.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-1 bg-[#D9D1BE]/30 text-[#1F2937] text-[10px] rounded-lg font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1F2937] hover:bg-gray-50 transition-colors">
                        Edit Item
                      </button>
                      <button 
                        onClick={() => handleDelete(item.rentalId)}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence>
          {showAddModal && (
            <AddRentalModal 
              onClose={() => setShowAddModal(false)} 
              onSuccess={() => {
                // Refresh is handled by subscription
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
