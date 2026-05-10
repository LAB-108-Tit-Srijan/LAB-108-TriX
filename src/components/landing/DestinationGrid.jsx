import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const destinations = [
  {
    id: 1,
    name: 'Kasol Riverside',
    country: 'Himachal',
    price: '₹2,500/night',
    tag: 'Mountains',
    image: '/kasol.png',
    description: 'Bohemian cafes and tranquil Parvati river escapes',
  },
  {
    id: 2,
    name: 'Udaipur Palace',
    country: 'Rajasthan',
    price: '₹8,500/night',
    tag: 'Heritage',
    image: '/udaipur.png',
    description: 'Cinematic luxury stays overlooking the Lake Pichola',
  },
  {
    id: 3,
    name: 'Munnar Mist',
    country: 'Kerala',
    price: '₹4,200/night',
    tag: 'Forest',
    image: '/munnar.png',
    description: 'Rolling tea gardens and emerald valley retreats',
  },
];

function DestinationCard({ dest, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => navigate('/explore')}
    >
      <div
        className="relative overflow-hidden mb-6 rounded-[32px] aspect-[3/4] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_70px_rgba(31,41,55,0.15)] shadow-[0_10px_40px_rgba(31,41,55,0.08)]"
      >
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/20 shadow-sm">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#1F2937]">{dest.tag}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white/90 text-sm font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {dest.description}
          </p>
          <div className="flex items-center gap-2 text-white text-xs font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            Explore Destination
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
      
      <div className="px-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-medium text-[#1F2937] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{dest.name}</h3>
            <p className="text-sm font-light text-[#6B7280]">
              {dest.country} · From <span className="font-semibold text-[#1F2937]">{dest.price}</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#D9D1BE] flex items-center justify-center group-hover:bg-[#6F93C4] group-hover:border-[#6F93C4] transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B7280] group-hover:text-white group-hover:rotate-45 transition-all"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-32" style={{ background: '#EAE6DF' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#6F93C4]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6F93C4]">Curated Escapes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Hand-picked Sanctuary
            </h2>
            <p className="mt-4 text-base font-light text-[#6B7280] max-w-md">
              Discover locations designed for profound tranquility and aesthetic perfection.
            </p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/explore')}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-[#D9D1BE] text-sm font-semibold text-[#1F2937] hover:bg-white hover:shadow-xl transition-all group"
          >
            View All Escapes
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.id} dest={dest} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
