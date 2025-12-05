import React, { useState, useEffect } from 'react';
import { MOCK_INFLUENCERS } from '../constants';
import { Influencer, Niche, FilterState } from '../types';
import { InfluencerCard } from '../components/InfluencerCard';
import { Button } from '../components/Button';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { parseSearchQuery } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

export const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState<Influencer[]>(MOCK_INFLUENCERS);
  const [filters, setFilters] = useState<FilterState>({
    minFollowers: 0,
    maxFollowers: 1000000,
    minRate: 0,
    maxRate: 5000,
    niche: '' as Niche,
    location: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Apply filters
  useEffect(() => {
    let filtered = MOCK_INFLUENCERS.filter(inf => {
      const matchFollowers = inf.followers >= filters.minFollowers && inf.followers <= filters.maxFollowers;
      const matchRate = inf.startingRate >= filters.minRate && inf.startingRate <= filters.maxRate;
      const matchNiche = filters.niche ? inf.niche.includes(filters.niche as Niche) : true;
      const matchLocation = filters.location ? inf.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
      const matchText = searchQuery && !isAiSearching ? 
        (inf.name.toLowerCase().includes(searchQuery.toLowerCase()) || inf.bio.toLowerCase().includes(searchQuery.toLowerCase())) : true;
      
      return matchFollowers && matchRate && matchNiche && matchLocation && matchText;
    });
    setInfluencers(filtered);
  }, [filters, searchQuery, isAiSearching]);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiSearching(true);
    
    // Call Gemini to parse
    const extractedFilters = await parseSearchQuery(searchQuery);
    
    setFilters(prev => ({
      ...prev,
      ...extractedFilters,
      // If AI didn't return a specific field, keep default or previous?
      // Let's merge carefully.
      niche: extractedFilters.niche ? extractedFilters.niche as Niche : prev.niche,
      location: extractedFilters.location || prev.location
    }));
    
    setIsAiSearching(false);
  };

  const clearFilters = () => {
    setFilters({
      minFollowers: 0,
      maxFollowers: 1000000,
      minRate: 0,
      maxRate: 5000,
      niche: '' as Niche,
      location: '',
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header / Search Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                placeholder="Search by name, or ask AI (e.g. 'Vegan foodies in NY under $500')"
                className="w-full pl-10 pr-12 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <button 
                onClick={handleAiSearch}
                className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                title="Smart AI Search"
              >
                {isAiSearching ? <span className="animate-spin block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span> : <Sparkles size={16} />}
              </button>
            </div>
            
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 lg:hidden text-slate-700"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
          
          {/* Active Filters Pills */}
          {(filters.niche || filters.location || filters.maxRate < 5000) && (
             <div className="flex flex-wrap gap-2 mt-3">
               {filters.niche && (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                   {filters.niche}
                   <button onClick={() => setFilters(f => ({...f, niche: '' as Niche}))} className="ml-1.5 text-indigo-600 hover:text-indigo-800"><X size={12}/></button>
                 </span>
               )}
               {filters.location && (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                   📍 {filters.location}
                   <button onClick={() => setFilters(f => ({...f, location: ''}))} className="ml-1.5 text-indigo-600 hover:text-indigo-800"><X size={12}/></button>
                 </span>
               )}
                {filters.maxRate < 5000 && (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                   Max ${filters.maxRate}
                   <button onClick={() => setFilters(f => ({...f, maxRate: 5000}))} className="ml-1.5 text-green-600 hover:text-green-800"><X size={12}/></button>
                 </span>
               )}
               <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-800 underline ml-2">Clear all</button>
             </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-start gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 sticky top-32 shrink-0 space-y-8">
           <div>
             <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Niche</h3>
             <div className="space-y-2">
               {Object.values(Niche).map((n) => (
                 <label key={n} className="flex items-center cursor-pointer group">
                   <input 
                    type="radio" 
                    name="niche" 
                    checked={filters.niche === n}
                    onChange={() => setFilters({...filters, niche: n})}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                   />
                   <span className="ml-3 text-sm text-gray-600 group-hover:text-slate-900">{n}</span>
                 </label>
               ))}
             </div>
           </div>

           <div>
             <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Budget Range</h3>
             <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
               <span>$0</span>
               <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                value={filters.maxRate}
                onChange={(e) => setFilters({...filters, maxRate: Number(e.target.value)})}
                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
               />
               <span>${filters.maxRate}+</span>
             </div>
           </div>
           
           <div>
             <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Followers</h3>
             <div className="space-y-2">
               <button onClick={() => setFilters({...filters, minFollowers: 0, maxFollowers: 10000})} className={`block text-sm ${filters.maxFollowers === 10000 ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>Nano (&lt;10k)</button>
               <button onClick={() => setFilters({...filters, minFollowers: 10000, maxFollowers: 100000})} className={`block text-sm ${filters.maxFollowers === 100000 ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>Micro (10k-100k)</button>
               <button onClick={() => setFilters({...filters, minFollowers: 100000, maxFollowers: 500000})} className={`block text-sm ${filters.maxFollowers === 500000 ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>Macro (100k+)</button>
             </div>
           </div>
        </aside>

        {/* Results Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {influencers.length} {influencers.length === 1 ? 'Creator' : 'Creators'} found
            </h2>
            <select className="text-sm border-none bg-transparent text-gray-500 font-medium focus:ring-0 cursor-pointer">
              <option>Recommended</option>
              <option>Lowest Price</option>
              <option>Highest Engagement</option>
            </select>
          </div>

          {influencers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
               <div className="text-gray-400 mb-2">No creators found matching your criteria.</div>
               <Button variant="outline" onClick={clearFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {influencers.map(inf => (
                <InfluencerCard 
                  key={inf.id} 
                  data={inf} 
                  onClick={() => navigate(`/profile/${inf.id}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Sheet (Simplified for prototype) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-white p-6 lg:hidden overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setShowMobileFilters(false)}><X size={24}/></button>
          </div>
          {/* Mobile filter controls would go here (duplication of sidebar) */}
          <div className="space-y-6">
             <div className="space-y-2">
                <label className="text-sm font-semibold">Location</label>
                <input 
                  type="text" 
                  value={filters.location} 
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full border-gray-300 rounded-lg"
                  placeholder="e.g. London"
                />
             </div>
             <Button className="w-full" onClick={() => setShowMobileFilters(false)}>Show Results</Button>
          </div>
        </div>
      )}
    </div>
  );
};
