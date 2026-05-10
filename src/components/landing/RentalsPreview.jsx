import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const rentals = [
  {
    id: 1,
    name: 'Royal Enfield Himalayan',
    type: 'Off-road',
    price: '₹1,800/day',
    icon: '🏍️',
    desc: 'The ultimate beast for Spiti and Leh coastal or mountain expeditions.'
  },
  {
    id: 2,
    name: 'Mountain Trek Gear',
    type: 'Equipment',
    price: '₹450/day',
    icon: '🏔️',
    desc: 'Professional grade gear for the most demanding Himalayan ascents.'
  },
  {
    id: 3,
    name: 'Coastal Scooty',
    type: 'Biking',
    price: '₹500/day',
    icon: '🛵',
    desc: 'The most immersive way to explore Goa and Gokarna hidden beaches.'
  }
];

export default function RentalsPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-32" style={{ background: '#EAE6DF' }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#6F93C4]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6F93C4]">Rentals & Gear</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[#1F2937] leading-[1.1] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Equipped for <br /> Every Terrain
            </h2>
            <p className="text-base font-light text-[#6B7280] leading-relaxed mb-8">
              From luxury off-roaders to professional trekking gear, we ensure you have everything needed to immerse yourself in nature.
            </p>
            <button 
              onClick={() => navigate('/rentals')}
              className="px-8 py-4 rounded-2xl bg-[#6F93C4] text-white text-sm font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Browse Rentals
            </button>
          </motion.div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {rentals.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => navigate('/rentals')}
                className="group p-8 rounded-[40px] bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-3xl bg-[#6F93C4]/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#6F93C4] mb-2 block">{item.type}</span>
                <h3 className="text-xl font-medium text-[#1F2937] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{item.name}</h3>
                <p className="text-sm font-light text-[#6B7280] leading-relaxed mb-6">{item.desc}</p>
                <div className="text-lg font-bold text-[#1F2937]">{item.price}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
