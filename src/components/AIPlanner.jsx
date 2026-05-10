import { useState, useEffect } from 'react';
import PlannerForm from './planner/PlannerForm';
import AIPreviewPanel from './planner/AIPreviewPanel';

export default function AIPlanner() {
  const [visible, setVisible] = useState(false);
  const [plannerData, setPlannerData] = useState({
    destination: '', departDate: '', returnDate: '', flexible: false,
    budget: 2, travelerType: 'solo', mood: 'peaceful',
    experiences: ['mountains'], safety: ['verified'],
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2800);
  };

  const update = (key, val) => setPlannerData(p => ({ ...p, [key]: val }));
  const toggleArr = (key, val) => {
    setPlannerData(p => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter(v => v !== val) : [...p[key], val],
    }));
  };

  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      {/* Ambient blurs */}
      <div className="fixed top-20 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#B7C6D6' }} />
      <div className="fixed bottom-20 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: '#6F93C4' }} />

      {/* Hero */}
      <section className="pt-28 pb-10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: '#6F93C4' }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6F93C4' }}>AI Journey Intelligence</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-end">
            <div>
              <h1 className="mb-4" style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(40px,5vw,72px)', lineHeight: '1.05', color: '#1F2937', fontWeight: 500 }}>
                Craft Journeys<br /><span style={{ color: '#6F93C4' }}>Beyond Maps.</span>
              </h1>
              <p className="text-base font-light max-w-lg" style={{ color: '#6B7280' }}>
                Let AI curate immersive cinematic experiences tailored to your emotions, budget, pace, and travel personality.
              </p>
            </div>
            <div className="flex gap-4 justify-end">
              <div className="rounded-2xl p-5 text-center" style={{ background: 'rgba(111,147,196,0.1)', border: '1px solid rgba(111,147,196,0.2)' }}>
                <div className="text-2xl font-semibold" style={{ color: '#6F93C4', fontFamily: 'Playfair Display,serif' }}>24K+</div>
                <div className="text-xs font-light mt-1" style={{ color: '#6B7280' }}>Routes Generated</div>
              </div>
              <div className="rounded-2xl p-5 text-center" style={{ background: 'rgba(217,209,190,0.35)', border: '1px solid rgba(217,209,190,0.5)' }}>
                <div className="text-2xl font-semibold" style={{ color: '#1F2937', fontFamily: 'Playfair Display,serif' }}>98%</div>
                <div className="text-xs font-light mt-1" style={{ color: '#6B7280' }}>Satisfaction</div>
              </div>
              <div className="rounded-2xl p-5 text-center" style={{ background: 'rgba(111,147,196,0.1)', border: '1px solid rgba(111,147,196,0.2)' }}>
                <div className="text-2xl font-semibold" style={{ color: '#6F93C4', fontFamily: 'Playfair Display,serif' }}>4.9</div>
                <div className="text-xs font-light mt-1" style={{ color: '#6B7280' }}>AI Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-col layout */}
      <section className="pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-start">
            <PlannerForm data={plannerData} update={update} toggleArr={toggleArr} onGenerate={handleGenerate} generating={generating} />
            <AIPreviewPanel data={plannerData} generating={generating} generated={generated} />
          </div>
        </div>
      </section>
    </div>
  );
}
