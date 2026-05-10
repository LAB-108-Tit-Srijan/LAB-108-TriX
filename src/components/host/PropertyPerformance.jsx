import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { subscribeToHostProperties } from '../../services/propertyService';
import PropertyWizard from './PropertyWizard';

export default function PropertyPerformance() {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = subscribeToHostProperties(currentUser.uid, (data) => {
        setProperties(data);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Your Properties</h2>
        <button 
          onClick={() => setShowWizard(true)}
          className="px-4 py-2 bg-white/60 hover:bg-white text-sm font-semibold text-[#1F2937] rounded-xl shadow-sm transition-all flex items-center gap-2 border border-[#D9D1BE]"
        >
          <span>+</span> Add Property
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {properties.length === 0 ? (
          <div className="p-12 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/50">
            <div className="text-4xl mb-4">🏨</div>
            <h3 className="text-lg font-bold text-gray-800">No properties yet</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">Click 'Add Property' to start your premium hospitality journey and list your space on TriPOV.</p>
          </div>
        ) : (
          properties.map((prop, idx) => (
            <motion.div 
              key={prop.propertyId}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-6 p-4 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-md hover:bg-white/60 transition-all duration-300 group relative"
            >
              {/* Image */}
              <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-200">
                {prop.image ? (
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">📸</div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{prop.name}</h3>
                      <p className="text-sm text-gray-500">{prop.location} • {prop.type}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-lg">
                      <span className="text-yellow-600">★</span>
                      <span className="text-sm font-bold text-gray-900">{prop.rating || 'New'}</span>
                    </div>
                  </div>

                  {/* AI Insight */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-[#6F93C4]/10 to-transparent rounded-xl border-l-2 border-[#6F93C4]">
                    <p className="text-xs text-gray-700 flex items-center gap-2">
                      <span>✨</span> {prop.aiInsight || 'AI analyzing property performance...'}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-6 pt-4 border-t border-white/50">
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">Occupancy</p>
                    <p className="text-lg font-bold text-gray-900">{prop.occupancy || '0%'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">Earnings</p>
                    <p className="text-lg font-bold text-[#8B9D83]">₹0</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">Active Bookings</p>
                    <p className="text-lg font-bold text-gray-900">{prop.activeBookings || 0}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showWizard && (
          <PropertyWizard onClose={() => setShowWizard(false)} onSuccess={() => console.log('Property Added')} />
        )}
      </AnimatePresence>
    </div>
  );
}
