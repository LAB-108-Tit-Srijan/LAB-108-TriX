import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="max-w-[1440px] mx-auto px-12 pb-24 text-center">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}>
          <img src="https://i.pravatar.cc/300?img=12" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display,serif', opacity: visible ? 1 : 0, transition: 'opacity 1s ease 200ms' }}>
          Aditya K.
        </h1>
        <p className="text-gray-500 mb-12 font-light" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 300ms' }}>
          Cinematic Explorer · Member since 2026
        </p>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-left" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 400ms' }}>
          <h3 className="text-xl text-gray-900 mb-6 font-medium" style={{ fontFamily: 'Playfair Display,serif' }}>Account Settings</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
              <div className="font-medium text-gray-900">Personal Information</div>
              <div className="text-sm text-gray-500 font-light mt-1">Update your name, email, and phone number</div>
            </div>
            <div className="p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
              <div className="font-medium text-gray-900">Travel Preferences</div>
              <div className="text-sm text-gray-500 font-light mt-1">Manage your AI travel mood and style</div>
            </div>
            <div className="p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
              <div className="font-medium text-gray-900">Payment Methods</div>
              <div className="text-sm text-gray-500 font-light mt-1">Manage your cards and billing</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
