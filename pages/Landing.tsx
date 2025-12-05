import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
             <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
               New: AI-Powered Matching
             </div>
             <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8">
               Authentic stories. <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Measurable impact.</span>
             </h1>
             <p className="text-xl text-gray-600 mb-10 leading-relaxed">
               The curated marketplace connecting premium micro-influencers with forward-thinking brands. No noise, just results.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Button size="lg" onClick={() => navigate('/onboarding')}>
                 Get Started
               </Button>
               <Button size="lg" variant="outline" onClick={() => navigate('/marketplace')}>
                 Browse Creators
               </Button>
             </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-bold text-xl">1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Search</h3>
                <p className="text-gray-600">Don't scroll for hours. Tell our AI exactly what you need, and find the perfect match in seconds.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 font-bold text-xl">2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Vetted Creators</h3>
                <p className="text-gray-600">Every profile is manually reviewed. We verify engagement rates and audience authenticity.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 font-bold text-xl">3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Payments</h3>
                <p className="text-gray-600">Funds are held in escrow until deliverables are approved. Zero risk for both parties.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
