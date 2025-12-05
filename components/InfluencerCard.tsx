import React from 'react';
import { Influencer } from '../types';
import { MapPin, Users, DollarSign, Star, CheckCircle } from 'lucide-react';

interface InfluencerCardProps {
  data: Influencer;
  onClick: () => void;
}

export const InfluencerCard: React.FC<InfluencerCardProps> = ({ data, onClick }) => {
  const avgRating = data.reviews.length > 0 
    ? (data.reviews.reduce((acc, r) => acc + r.rating, 0) / data.reviews.length).toFixed(1) 
    : 'New';

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={data.portfolioImages[0] || data.avatar} 
          alt={data.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-sm">
           <Star size={14} className="text-yellow-400 fill-current mr-1" />
           <span className="text-xs font-bold text-slate-800">{avgRating}</span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-slate-900 truncate">{data.name}</h3>
              {data.verified && <CheckCircle size={14} className="text-indigo-500 fill-current" />}
            </div>
            <p className="text-sm text-gray-500">{data.handle}</p>
          </div>
          <div className="text-right">
             <span className="block font-bold text-slate-900">${data.startingRate}</span>
             <span className="text-xs text-gray-400">min.</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{data.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.niche.slice(0, 2).map((n) => (
            <span key={n} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
              {n}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{(data.followers / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="truncate max-w-[100px]">{data.location}</span>
          </div>
          <div className="font-medium text-indigo-600">
            {data.engagementRate}% ER
          </div>
        </div>
      </div>
    </div>
  );
};
