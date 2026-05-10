import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Explore', path: '/explore' },
  { name: 'Stays', path: '/stays' },
  { name: 'Rentals', path: '/rentals' },
  { name: 'AI Planner', path: '/ai-planner' },
  { name: 'Reel Catcher', path: '/reel-catcher' },
  { name: 'Community', path: '/community' },
  { name: 'Safety', path: '/safety' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isInternal = ['/dashboard', '/ai-planner', '/planner', '/itinerary', '/explore', '/stays', '/hotel', '/rentals', '/community', '/safety', '/profile'].some(path => location.pathname.startsWith(path));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname === '/auth') return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 shadow-[0_8px_30px_rgba(31,41,55,0.04)]' : 'py-6'}`}
      style={{
        background: scrolled ? 'rgba(234,230,223,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(217,209,190,0.5)' : '1px solid transparent',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="TriPOV Logo" className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button 
                key={link.name} 
                onClick={() => navigate(link.path)}
                className="text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 relative group"
                style={{ color: isActive ? '#6F93C4' : '#6B7280' }}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#6F93C4] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            );
          })}
        </div>

        {/* User / Auth Actions */}
        <div className="flex items-center gap-4">
          {isInternal ? (
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
              <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/40 text-[#6B7280]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
              <button onClick={() => navigate('/profile')} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-white/40 transition-all">
                <span className="text-xs font-semibold text-[#1F2937]">Aditya K.</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: 'linear-gradient(135deg,#6F93C4,#B7C6D6)' }}>
                  AK
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/auth', { state: { tab: 'login' } })}
                className="px-6 py-2.5 rounded-2xl text-xs font-bold tracking-wider uppercase text-[#1F2937] border border-transparent hover:border-[#D9D1BE] transition-all"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/auth', { state: { tab: 'signup' } })}
                className="px-6 py-2.5 rounded-2xl text-xs font-bold tracking-wider uppercase text-white shadow-xl hover:shadow-[#6F93C4]/30 hover:-translate-y-1 transition-all"
                style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)' }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
