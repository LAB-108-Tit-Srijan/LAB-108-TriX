import { motion } from 'framer-motion';

export default function CommunityHero() {
  return (
    <section className="relative pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative rounded-[2rem] overflow-hidden group" style={{ height: '45vh', minHeight: '350px' }}>
          <img 
            src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80" 
            alt="Travel Community" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.8) 0%, rgba(31,41,55,0.2) 60%)' }} />
          
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white mb-4" 
              style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(36px,4vw,64px)', lineHeight: 1.1 }}
            >
              Travel Stories Live Here.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80 font-light text-lg max-w-2xl" 
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            >
              Connect with explorers, backpackers, creators, and travelers discovering cinematic India together.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
