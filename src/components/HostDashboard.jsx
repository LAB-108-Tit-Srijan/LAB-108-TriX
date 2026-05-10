import { useState, useEffect } from 'react';
import HostSidebar from './host/HostSidebar';
import HostHero from './host/HostHero';
import AnalyticsOverview from './host/AnalyticsOverview';
import PropertyPerformance from './host/PropertyPerformance';
import UpcomingBookings from './host/UpcomingBookings';
import RentalOverview from './host/RentalOverview';
import GuestCommunication from './host/GuestCommunication';
import AIAssistant from './dashboard/AIAssistant';

export default function HostDashboard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* Ambient background glows */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[120px]" style={{ background: '#D9D1BE' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[150px]" style={{ background: '#6F93C4' }} />
      </div>

      <div className="relative z-10 flex transition-opacity duration-1000" style={{ opacity: visible ? 1 : 0 }}>
        {/* Left Sidebar */}
        <HostSidebar />

        {/* Main Content Area */}
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <HostHero />
            <AnalyticsOverview />

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column (Properties & Community) */}
              <div className="lg:w-2/3">
                <PropertyPerformance />
                
                {/* Community Visibility Preview */}
                <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display,serif' }}>Community Visibility</h2>
                    <button className="text-sm font-semibold text-[#6F93C4] hover:underline">Manage Events</button>
                  </div>
                  <div className="flex items-center gap-6 p-4 rounded-2xl border border-dashed border-[#6F93C4]/50 bg-[#6F93C4]/5">
                    <div className="w-12 h-12 rounded-full bg-[#6F93C4]/20 flex items-center justify-center text-xl text-[#6F93C4]">🔥</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1F2937] text-sm">Host a Bonfire Night</h4>
                      <p className="text-xs text-gray-600">Invite local travelers to your hostel and increase your visibility by 20%.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#1F2937] text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition-colors">Create Event</button>
                  </div>
                </div>

              </div>

              {/* Right Column (Bookings, Rentals, Messages) */}
              <div className="lg:w-1/3">
                <UpcomingBookings />
                <RentalOverview />
                <GuestCommunication />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating AI Assistant - Uses existing dashboard AI Assistant */}
      <AIAssistant />
    </div>
  );
}
