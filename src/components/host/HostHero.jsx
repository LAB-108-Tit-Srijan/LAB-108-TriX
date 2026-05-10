import { motion } from 'framer-motion';
import { hostAnalytics } from '../../data/hostData';

export default function HostHero() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      {/* Left: Greeting & AI Insight */}
      <div className="lg:w-1/2 flex flex-col justify-between p-8 rounded-[2rem] border border-white/40" style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(24px)' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display,serif' }}>Welcome back, Adityansh.</h1>
          <p className="text-gray-600">Your properties in Himachal are trending this weekend.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 p-5 bg-[#6F93C4]/10 rounded-2xl border border-[#6F93C4]/20 flex items-start gap-4"
        >
          <div className="text-2xl">✨</div>
          <div>
            <h4 className="text-sm font-semibold text-[#1F2937] mb-1">AI Host Assistant</h4>
            <p className="text-xs text-gray-700">Demand for <strong>Riverside Luxury Cabin</strong> is up 40% for the upcoming long weekend. Consider adjusting prices by +10%.</p>
            <button className="mt-3 text-xs font-semibold text-[#6F93C4] hover:underline">Review Pricing</button>
          </div>
        </motion.div>
      </div>

      {/* Right: Cinematic Property Visual & Quick Stats */}
      <div className="lg:w-1/2 relative rounded-[2rem] overflow-hidden group min-h-[300px]">
        <img 
          src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80" 
          alt="Top Property" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,41,55,0.8) 0%, rgba(31,41,55,0.2) 60%)' }} />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
          <div>
            <p className="text-white/80 text-xs tracking-wider uppercase mb-1">Top Performing Property</p>
            <h3 className="text-white text-2xl font-serif">Riverside Luxury Cabin</h3>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs tracking-wider uppercase mb-1">This Month</p>
            <h4 className="text-white text-xl font-semibold">₹85,000</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
