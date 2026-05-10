import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ROLES = [
  {
    id: 'traveler',
    title: 'Traveler',
    desc: 'Plan immersive journeys, discover hidden gems, and manage your cinematic travel experiences.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    id: 'host',
    title: 'Host',
    desc: 'Manage properties, bookings, analytics, and traveler experiences.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab = location.state?.tab || 'login';
  const [tab, setTab] = useState(initialTab);
  const [role, setRole] = useState('traveler');
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ background: '#EAE6DF' }}>
      <div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[45%_55%] overflow-hidden transition-all duration-700"
        style={{
          borderRadius: '32px',
          boxShadow: '0 40px 120px rgba(31,41,55,0.12)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
        }}
      >
        {/* LEFT — Cinematic Visual */}
        <div className="relative hidden lg:block" style={{ minHeight: '680px' }}>
          <img src="/hero.png" alt="Cinematic mountains" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.65) 0%, rgba(31,41,55,0.15) 50%, rgba(31,41,55,0.1) 100%)' }} />
          {/* Back arrow */}
          <button onClick={() => navigate('/')} className="absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105" style={{ background: 'rgba(234,230,223,0.2)', backdropFilter: 'blur(12px)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EAE6DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          {/* Bottom text */}
          <div className="absolute bottom-10 left-10 right-10 z-10">
            <h2 className="text-3xl text-white font-medium mb-3" style={{ fontFamily: 'Playfair Display,serif', lineHeight: '1.15' }}>Journey to tranquility.</h2>
            <p className="text-sm text-white/65 font-light">Experience travel curation with cinematic grace.</p>
          </div>
        </div>

        {/* RIGHT — Auth System */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-12" style={{ background: 'rgba(234,230,223,0.95)', backdropFilter: 'blur(16px)' }}>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="TriPOV Logo" className="h-10 w-auto object-contain" />
          </div>

          <p className="text-sm font-light mb-8" style={{ color: '#6B7280' }}>
            {tab === 'login' ? 'Sign in to continue your journey' : 'Create your account to begin'}
          </p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            {ROLES.map((r) => {
              const active = role === r.id;
              return (
                <button key={r.id} onClick={() => setRole(r.id)}
                  className="text-left p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: active ? 'rgba(111,147,196,0.1)' : 'rgba(217,209,190,0.3)',
                    border: active ? '1.5px solid #6F93C4' : '1.5px solid rgba(217,209,190,0.5)',
                    boxShadow: active ? '0 4px 20px rgba(111,147,196,0.15)' : 'none',
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: active ? 'rgba(111,147,196,0.15)' : 'rgba(183,198,214,0.2)', color: active ? '#6F93C4' : '#6B7280' }}>
                    {r.icon}
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: '#1F2937' }}>{r.title}</div>
                  <div className="text-xs font-light leading-relaxed" style={{ color: '#6B7280' }}>{r.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Tab Toggle */}
          <div className="flex rounded-2xl p-1 mb-7" style={{ background: 'rgba(217,209,190,0.4)' }}>
            {['login', 'signup'].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300"
                style={{
                  background: tab === t ? '#fff' : 'transparent',
                  color: tab === t ? '#1F2937' : '#6B7280',
                  boxShadow: tab === t ? '0 2px 8px rgba(31,41,55,0.06)' : 'none',
                }}>
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-md mb-5"
            style={{ background: '#fff', border: '1px solid rgba(217,209,190,0.6)', color: '#1F2937' }}>
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(217,209,190,0.6)' }}/>
            <span className="text-xs font-light" style={{ color: '#9CA3AF' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(217,209,190,0.6)' }}/>
          </div>

          {/* Form */}
          {tab === 'login' ? (
            <LoginForm showPassword={showPassword} setShowPassword={setShowPassword} />
          ) : (
            <SignupForm showPassword={showPassword} setShowPassword={setShowPassword} />
          )}

          {/* Bottom text */}
          <p className="text-center text-xs font-light mt-6" style={{ color: '#6B7280' }}>
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setTab(tab === 'login' ? 'signup' : 'login')} className="font-medium underline underline-offset-2" style={{ color: '#6F93C4' }}>
              {tab === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type = 'text', placeholder, icon, rightElement }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium" style={{ color: '#6B7280' }}>{label}</label>
        {rightElement}
      </div>
      <div className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 focus-within:shadow-md"
        style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(183,198,214,0.35)' }}>
        <span style={{ color: '#B7C6D6' }}>{icon}</span>
        <input type={type} placeholder={placeholder}
          className="w-full bg-transparent text-sm font-light outline-none" style={{ color: '#1F2937' }}/>
      </div>
    </div>
  );
}

function LoginForm({ showPassword, setShowPassword }) {
  const navigate = useNavigate();
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
      <InputField label="Email" type="email" placeholder="your@email.com"
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}/>

      <InputField label="Password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
        rightElement={<button type="button" className="text-xs font-medium" style={{ color: '#6F93C4' }}>Forgot?</button>}/>

      <div className="flex items-center gap-2 mt-1">
        <input type="checkbox" id="remember" className="w-4 h-4 rounded accent-[#6F93C4]"/>
        <label htmlFor="remember" className="text-xs font-light" style={{ color: '#6B7280' }}>Remember me</label>
      </div>

      <button type="submit"
        className="w-full py-3.5 rounded-2xl text-sm font-medium text-white transition-all duration-300 mt-2 hover:-translate-y-px hover:shadow-lg"
        style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)', boxShadow: '0 6px 24px rgba(111,147,196,0.3)' }}>
        Sign In
      </button>
    </form>
  );
}

function SignupForm({ showPassword, setShowPassword }) {
  const navigate = useNavigate();
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
      <InputField label="Full Name" placeholder="John Doe"
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}/>

      <InputField label="Email" type="email" placeholder="your@email.com"
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}/>

      <InputField label="Password" type="password" placeholder="••••••••"
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}/>

      <InputField label="Confirm Password" type="password" placeholder="••••••••"
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}/>

      <button type="submit"
        className="w-full py-3.5 rounded-2xl text-sm font-medium text-white transition-all duration-300 mt-2 hover:-translate-y-px hover:shadow-lg"
        style={{ background: 'linear-gradient(135deg,#6F93C4,#5a7db0)', boxShadow: '0 6px 24px rgba(111,147,196,0.3)' }}>
        Create Account
      </button>
    </form>
  );
}
