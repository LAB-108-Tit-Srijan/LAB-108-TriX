import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SafetyPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="max-w-[1440px] mx-auto px-12 pb-24">
        <h1 className="text-5xl text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display,serif', opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}>
          Traveler Safety & Insights
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl font-light mb-12" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 200ms' }}>
          AI-powered risk analysis, emergency contacts, and real-time safe zone mapping for complete peace of mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 400ms' }}>
          <div className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100">
            <h3 className="text-xl text-gray-900 mb-4 font-medium" style={{ fontFamily: 'Playfair Display,serif' }}>Verified Safe Zones</h3>
            <p className="text-gray-600 font-light mb-6">Our AI continuously monitors local reports to ensure the regions you visit are verified safe for solo and family travelers.</p>
            <div className="h-48 rounded-xl bg-gray-100 relative overflow-hidden flex items-center justify-center">
               <span className="text-green-500 font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Scanning Active</span>
            </div>
          </div>
          
          <div className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100">
            <h3 className="text-xl text-gray-900 mb-4 font-medium" style={{ fontFamily: 'Playfair Display,serif' }}>Emergency Protocols</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-700 font-medium">Local Police</span>
                <span className="text-[#6F93C4] font-medium">100</span>
              </li>
              <li className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-700 font-medium">Medical Emergency</span>
                <span className="text-[#6F93C4] font-medium">108</span>
              </li>
              <li className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-700 font-medium">Tourist Helpline</span>
                <span className="text-[#6F93C4] font-medium">1363</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
