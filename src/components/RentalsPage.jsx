import { useState, useMemo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import RentalHero from './rentals/RentalHero';
import RentalGrid from './rentals/RentalGrid';
import BookingDrawer from './rentals/BookingDrawer';
import { rentals, RENTAL_CATEGORIES } from '../data/rentalsData';

export default function RentalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookingRental, setBookingRental] = useState(null);

  // Filter rentals based on search and category
  const filteredRentals = useMemo(() => {
    return rentals.filter(r => {
      const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
      const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-[#f9f8f6] min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <RentalHero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={RENTAL_CATEGORIES}
      />

      {/* Category Pills (Optional secondary nav) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4">
          {RENTAL_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === c 
                  ? 'bg-[#1F2937] text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <RentalGrid 
        rentals={filteredRentals} 
        onBook={(rental) => setBookingRental(rental)} 
      />

      {/* AI Location Suggestions Footer block */}
      <section className="py-24 bg-[#EAE6DF] mt-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 mb-6">
            <span className="text-xl">🤖</span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#1F2937]">TriPOV AI Rental Assistant</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-[#1F2937] mb-8" style={{ fontFamily: 'Playfair Display,serif' }}>
            Where are you heading?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { loc: 'Spiti Valley', gear: 'Adventure Bikes & Oxygen Kits' },
              { loc: 'Rishikesh', gear: 'Camping Tents & Rafting Gear' },
              { loc: 'Goa', gear: 'Scooties & Beach Kits' }
            ].map(l => (
              <div key={l.loc} onClick={() => setSearchQuery(l.loc)} className="bg-white/60 hover:bg-white cursor-pointer transition-colors p-6 rounded-3xl w-72 text-left border border-white/30 shadow-sm">
                <div className="text-lg font-medium text-[#1F2937] mb-1">{l.loc}</div>
                <div className="text-sm font-light text-gray-500">Suggests: {l.gear}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Flow Drawer */}
      {bookingRental && (
        <BookingDrawer 
          rental={bookingRental} 
          onClose={() => setBookingRental(null)} 
        />
      )}
    </div>
  );
}
