import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SafetyPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-32" style={{ background: '#EAE6DF' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div 
          className="rounded-[48px] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16"
          style={{
            background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.02) 0%, rgba(31, 41, 55, 0.05) 100%)',
            border: '1px solid rgba(31, 41, 55, 0.08)',
          }}
        >
          {/* Subtle safety pulse background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#6F93C4]/5 rounded-full blur-[100px] animate-pulse" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative z-10"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central Safety Shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-[48px] bg-white shadow-2xl flex items-center justify-center relative z-20">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6F93C4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                {/* Orbiting Elements */}
                <div className="absolute w-full h-full border border-[#6F93C4]/10 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-xl">🛡️</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-xl">🗺️</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-xl">🆘</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-xl">📱</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative z-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#6F93C4]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6F93C4]">Security & Peace</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1F2937] leading-[1.1] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Safety is Our <br /> Silent Promise
            </h2>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#6F93C4]/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6F93C4]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1F2937] mb-1">Mountain & Monsoon Alerts</h4>
                  <p className="text-xs font-light text-[#6B7280]">AI-monitored alerts for Himalayan road blocks and monsoon flood zones.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#6F93C4]/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6F93C4]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1F2937] mb-1">24/7 Local Guardian</h4>
                  <p className="text-xs font-light text-[#6B7280]">Instant connection to local tourist police and Indian emergency dispatch.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/safety')}
              className="px-10 py-4 rounded-2xl bg-[#1F2937] text-white text-sm font-semibold shadow-2xl hover:bg-[#6F93C4] transition-all"
            >
              Access Safety Hub
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
