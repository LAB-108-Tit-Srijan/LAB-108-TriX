import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stays } from '../data/staysData';
import HotelGallery from './hotel/HotelGallery';
import PropertyOverview from './hotel/PropertyOverview';
import HostInformation from './hotel/HostInformation';
import AIExperienceSummary from './hotel/AIExperienceSummary';
import HotelInsights from './hotel/HotelInsights';
import RoomOptions from './hotel/RoomOptions';
import HotelExperiences from './hotel/HotelExperiences';
import NearbyExperiences from './hotel/NearbyExperiences';
import HotelMap from './hotel/HotelMap';
import HotelReviews from './hotel/HotelReviews';
import BookingPanel from './hotel/BookingPanel';
import AIAssistant from './dashboard/AIAssistant';
import Footer from './Footer';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const stay = stays.find(s => s.id === id) || stays[0]; // fallback to first stay if not found
  
  const [visible, setVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => { 
    setTimeout(() => setVisible(true), 80); 
    window.scrollTo(0,0);
  }, [id]);

  if (!stay) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#EAE6DF]">
        <h1 className="text-2xl font-serif text-[#1F2937]">Stay Not Found</h1>
        <button onClick={() => navigate('/stays')} className="mt-4 px-6 py-2 bg-[#6F93C4] text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      <HotelGallery stay={stay} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Main Content (Left) */}
          <div className="lg:w-2/3">
            <PropertyOverview stay={stay} />
            <HostInformation stay={stay} />
            <AIExperienceSummary stay={stay} />
            <HotelInsights stay={stay} />
            <RoomOptions stay={stay} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
            <HotelExperiences stay={stay} />
            <NearbyExperiences stay={stay} />
            <HotelMap stay={stay} />
            <HotelReviews stay={stay} />
          </div>

          {/* Sticky Booking Panel (Right) */}
          <div className="lg:w-1/3 relative z-20">
            <div className="sticky top-32">
              <BookingPanel stay={stay} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
}
