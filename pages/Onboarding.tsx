import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Niche } from '../types';
import { optimizeBio } from '../services/geminiService';
import { Sparkles, ArrowRight, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'brand' | 'creator' | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const toggleNiche = (n: string) => {
    if (selectedNiches.includes(n)) {
      setSelectedNiches(selectedNiches.filter(i => i !== n));
    } else {
      if (selectedNiches.length < 3) setSelectedNiches([...selectedNiches, n]);
    }
  };

  const handleAiEnhance = async () => {
    if (!bio) return;
    setIsEnhancing(true);
    const enhanced = await optimizeBio(bio, selectedNiches.join(', '));
    setBio(enhanced);
    setIsEnhancing(false);
  };

  const nextStep = () => setStep(step + 1);

  const renderStep1 = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900">How do you want to use Lume?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button 
          onClick={() => setRole('brand')}
          className={`p-8 rounded-2xl border-2 transition-all text-left group ${role === 'brand' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
        >
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 text-xl">🏢</div>
          <h3 className="font-bold text-lg mb-1">I'm a Brand</h3>
          <p className="text-sm text-gray-500">I want to hire creators for campaigns.</p>
        </button>
        <button 
          onClick={() => setRole('creator')}
          className={`p-8 rounded-2xl border-2 transition-all text-left group ${role === 'creator' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
        >
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 text-xl">✨</div>
          <h3 className="font-bold text-lg mb-1">I'm a Creator</h3>
          <p className="text-sm text-gray-500">I want to showcase my work and get hired.</p>
        </button>
      </div>
      <div className="mt-8">
        <Button size="lg" disabled={!role} onClick={nextStep} className="w-full md:w-auto min-w-[200px]">
          Continue <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Tell us about yourself</h2>
        <p className="text-gray-500 mt-2">This helps us match you with the right opportunities.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Sarah Jenkins"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Select your Niches (Max 3)</label>
           <div className="flex flex-wrap gap-2">
             {Object.values(Niche).map(n => (
               <button 
                 key={n}
                 onClick={() => toggleNiche(n)}
                 className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                   selectedNiches.includes(n) 
                     ? 'bg-slate-900 text-white border-slate-900' 
                     : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                 }`}
               >
                 {n}
               </button>
             ))}
           </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <button 
              onClick={handleAiEnhance}
              disabled={!bio || isEnhancing}
              className="text-xs text-indigo-600 font-medium flex items-center hover:text-indigo-800 disabled:opacity-50"
            >
              {isEnhancing ? 'Enhancing...' : <><Sparkles size={12} className="mr-1"/> AI Enhance</>}
            </button>
          </div>
          <div className="relative">
             <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-32 resize-none"
              placeholder="Tell brands what makes you unique..."
            />
            {isEnhancing && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <Sparkles className="animate-pulse text-indigo-600" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">Tip: Use the AI tool to make your bio more professional.</p>
        </div>
      </div>

      <Button size="lg" onClick={() => navigate('/marketplace')} className="w-full">
        Complete Profile
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {step === 1 ? renderStep1() : renderStep2()}
    </div>
  );
};
