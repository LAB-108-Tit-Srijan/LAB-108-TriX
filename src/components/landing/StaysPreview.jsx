import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const stays = [
  {
    id: 1,
    name: 'Himalayan Glass Villa',
    location: 'Jibhi, Himachal',
    price: '₹12,500',
    image: '/stays-1.png',
    rating: '4.9',
    type: 'Luxury Cabin'
  },
  {
    id: 2,
    name: 'Heritage Haveli',
    location: 'Jaipur, Rajasthan',
    price: '₹15,200',
    image: '/stays-2.png',
    rating: '4.8',
    type: 'Heritage Stay'
  },
  {
    id: 3,
    name: 'Backwater Retreat',
    location: 'Alleppey, Kerala',
    price: '₹9,800',
    image: '/stays-3.png',
    rating: '5.0',
    type: 'Forest Lodge'
  }
];

export default function StaysPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-32" style={{ background: '#EAE6DF' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#6F93C4]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6F93C4]">Premium Stays</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1F2937]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Exceptional Hospitality
            </h2>
          </motion.div>
          
          <button 
            onClick={() => navigate('/stays')}
            className="text-sm font-semibold text-[#6F93C4] flex items-center gap-2 hover:underline transition-all"
          >
            Explore all stays <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stays.map((stay, index) => (
            <motion.div
              key={stay.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate('/hotel')}
              className="group cursor-pointer relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl"
            >
              <img 
                src={stay.image || '/nordfjord.png'} 
                alt={stay.name} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              
              {/* Glass Overlay Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <div 
                  className="p-8 rounded-[32px] bg-white/10 backdrop-blur-2xl border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/60 mb-1 block">{stay.type}</span>
                      <h3 className="text-2xl font-medium text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{stay.name}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6F93C4] text-white text-xs font-bold">
                      ⭐ {stay.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-white">
                      <span className="text-lg font-bold">{stay.price}</span>
                      <span className="text-xs font-light text-white/60"> / night</span>
                    </div>
                    <button className="w-12 h-12 rounded-2xl bg-white text-[#1F2937] flex items-center justify-center group-hover:bg-[#6F93C4] group-hover:text-white transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
