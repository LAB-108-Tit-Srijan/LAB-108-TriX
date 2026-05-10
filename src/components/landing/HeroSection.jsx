import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PlannerCard from './PlannerCard';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden" style={{ background: '#EAE6DF' }}>
      {/* Background soft gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full opacity-20 blur-[120px]" style={{ background: '#6F93C4' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full opacity-10 blur-[120px]" style={{ background: '#D9D1BE' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-16 lg:gap-12 items-center">

          {/* ── LEFT SIDE: Typography + Planner ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-10"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#6F93C4' }}>
                AI-Powered Travel Ecosystem
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-[48px] md:text-[68px] lg:text-[76px] leading-[1.05] font-medium tracking-tight mb-6" style={{ color: '#1F2937', fontFamily: 'Playfair Display, serif' }}>
                Travel Smarter. <br />
                <span style={{ color: '#6F93C4' }}>Explore Deeper.</span>
              </h1>
              <p className="text-lg font-light leading-relaxed max-w-md" style={{ color: '#6B7280' }}>
                Curate your perfect journey with our cinematic AI planner. Discover the world's most serene landscapes and luxurious stays tailored to your soul.
              </p>
            </div>

            <PlannerCard />
          </motion.div>

          {/* ── RIGHT SIDE: Cinematic Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:pl-10"
          >
            <div className="relative z-10 rounded-[48px] overflow-hidden aspect-[4/5] shadow-[0_40px_100px_rgba(31,41,55,0.15)] group">
              <img src="/hero.png" alt="Luxury Travel" className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Location Badge */}
              <div className="absolute bottom-8 left-8 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#6F93C4] animate-pulse" />
                <span className="text-xs font-semibold tracking-wide text-[#1F2937]">Spiti Valley, Himachal</span>
              </div>
            </div>

            {/* Floating Experience Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 top-1/4 z-20 p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6F93C4]/10 flex items-center justify-center text-xl">🏔️</div>
                <div>
                  <div className="text-2xl font-bold text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>4.9</div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#6B7280]">Guest Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Destinations Card */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-1/4 z-20 p-7 rounded-[32px] bg-[#6F93C4] text-white shadow-2xl hidden lg:block"
            >
              <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>1,200+</div>
              <div className="text-[10px] font-bold tracking-widest uppercase opacity-80">Boutique Stays</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
