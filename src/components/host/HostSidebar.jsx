import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems = [
  { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', path: '/host/dashboard' },
  { name: 'Properties', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/host/properties' },
  { name: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', path: '/host/bookings' },
  { name: 'Guests', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', path: '/host/guests' },
  { name: 'Rentals', icon: 'M13 10V3L4 14h7v7l9-11h-7z', path: '/host/rentals' },
  { name: 'Community', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', path: '/host/community' },
  { name: 'Earnings', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', path: '/host/earnings' }
];

export default function HostSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 fixed left-0 top-0 h-screen p-6 flex flex-col z-40">
      <div 
        className="w-full h-full rounded-3xl border border-white/40 flex flex-col p-6 shadow-xl"
        style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(24px)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="TriPOV Host" className="h-8 w-auto object-contain" />
          <span className="font-serif font-bold text-lg text-[#1F2937]">Host</span>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2 flex-1">
          {sidebarItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive ? 'bg-[#6F93C4] text-white shadow-md' : 'text-gray-600 hover:bg-white/50 hover:text-[#1F2937]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
                <span className="text-sm font-semibold">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Settings & Help */}
        <div className="flex flex-col gap-2 mt-auto pt-6 border-t border-gray-300/50">
          <button className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-600 hover:bg-white/50 transition-all text-sm font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
          </button>
          <button className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-600 hover:bg-white/50 transition-all text-sm font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
