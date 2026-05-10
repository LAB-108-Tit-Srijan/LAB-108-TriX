import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '🧭',
    title: 'Offbeat Routing',
    description: 'AI-guided routes through hidden Himalayan villages and secret coastal trails, avoiding tourist crowds.',
    path: '/ai-planner'
  },
  {
    icon: '🌍',
    title: 'Local Immersion',
    description: 'Instant translation for local dialects and cultural etiquette for authentic village interactions.',
    path: '/explore'
  },
  {
    icon: '🛡️',
    title: 'Monsoon-Safe',
    description: 'Proactive alerts for landslide-prone zones and safe-passage routing during the Indian monsoon.',
    path: '/safety'
  },
  {
    icon: '🛌',
    title: 'Heritage Stays',
    description: 'Hand-picked riverside camps, heritage havelis, and forest cabins that mirror the soul of India.',
    path: '/stays'
  }
];

export default function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-32" style={{ background: '#EAE6DF' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#6F93C4]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6F93C4]">The Intelligence</span>
              <div className="w-8 h-px bg-[#6F93C4]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1F2937] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Intelligence Meets Serenity
            </h2>
            <p className="text-base font-light text-[#6B7280] max-w-xl mx-auto">
              Cutting-edge AI woven into every moment of your journey, so seamlessly you'll only notice the calm.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => navigate(f.path)}
              className="p-10 rounded-[40px] bg-white/40 backdrop-blur-xl border border-white/40 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#6F93C4]/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-medium text-[#1F2937] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{f.title}</h3>
              <p className="text-sm font-light text-[#6B7280] leading-relaxed mb-8">
                {f.description}
              </p>
              <div className="flex items-center gap-2 text-[#6F93C4] text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                Explore Feature
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Feature CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 relative rounded-[48px] overflow-hidden aspect-[21/9] flex items-center justify-center group cursor-pointer"
          onClick={() => navigate('/ai-planner')}
        >
          <img src="/hero.png" alt="Slow Travel" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          
          <div className="relative z-10 text-center px-10">
            <h3 className="text-white text-3xl md:text-5xl font-medium mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>The Art of Slow Travel</h3>
            <p className="text-white/80 text-base font-light max-w-lg mx-auto mb-10">
              Let our AI craft an intentional journey where every moment is designed for depth, not speed. Experience travel as an immersive story.
            </p>
            <button className="px-12 py-5 rounded-2xl bg-white text-[#1F2937] text-sm font-bold shadow-2xl hover:bg-[#6F93C4] hover:text-white transition-all transform group-hover:scale-105">
              Begin Your Journey
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
