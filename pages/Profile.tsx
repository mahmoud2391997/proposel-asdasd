import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INFLUENCERS } from '../constants';
import { Button } from '../components/Button';
import { MapPin, Users, Star, ArrowLeft, MessageSquare, Instagram, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const influencer = MOCK_INFLUENCERS.find(i => i.id === id);

  if (!influencer) return <div>Influencer not found</div>;

  const mockAnalytics = [
    { name: 'Mon', engagement: 4000 },
    { name: 'Tue', engagement: 3000 },
    { name: 'Wed', engagement: 2000 },
    { name: 'Thu', engagement: 2780 },
    { name: 'Fri', engagement: 1890 },
    { name: 'Sat', engagement: 2390 },
    { name: 'Sun', engagement: 3490 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100 px-4 py-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-3">
           <Button variant="outline" onClick={() => navigate('/messages')}>
             <MessageSquare size={16} className="mr-2" />
             Message
           </Button>
           <Button>Hire for Campaign</Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
            <img src={influencer.avatar} alt={influencer.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pt-2">
             <div className="flex items-center gap-3 mb-2">
               <h1 className="text-3xl font-bold text-slate-900">{influencer.name}</h1>
               {influencer.verified && <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">Verified Pro</span>}
             </div>
             <a href="#" className="text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4 w-fit">
               {influencer.handle} <ExternalLink size={12}/>
             </a>
             <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-6">{influencer.bio}</p>
             
             <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} /> {influencer.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} /> {influencer.followers.toLocaleString()} Followers
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Instagram size={18} /> {influencer.engagementRate}% Engagement
                </div>
             </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {/* Left Column: Stats & Pricing */}
           <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-slate-900 mb-4">Pricing Packages</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <span className="text-sm font-medium">Instagram Story</span>
                    <span className="text-sm font-bold">${(influencer.startingRate * 0.4).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <span className="text-sm font-medium">Reel / TikTok</span>
                    <span className="text-sm font-bold">${influencer.startingRate}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <span className="text-sm font-medium">Youtube Integration</span>
                    <span className="text-sm font-bold">${(influencer.startingRate * 2.5).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Audience Engagement</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAnalytics}>
                      <XAxis dataKey="name" tick={{fontSize: 10}} stroke="#9ca3af" axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="engagement" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
           </div>

           {/* Main Column: Portfolio & Reviews */}
           <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Work</h2>
                <div className="grid grid-cols-2 gap-4">
                   {influencer.portfolioImages.map((img, idx) => (
                     <div key={idx} className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 relative group">
                        <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Portfolio" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                     </div>
                   ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Client Reviews ({influencer.reviews.length})</h2>
                {influencer.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {influencer.reviews.map(review => (
                      <div key={review.id} className="bg-gray-50 p-6 rounded-xl">
                         <div className="flex justify-between items-center mb-2">
                           <span className="font-semibold text-slate-900">{review.authorName}</span>
                           <span className="text-xs text-gray-500">{review.date}</span>
                         </div>
                         <div className="flex text-yellow-400 mb-2">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} stroke={i < review.rating ? "none" : "currentColor"} />
                           ))}
                         </div>
                         <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                   <div className="text-gray-400 italic">No reviews yet.</div>
                )}
              </section>
           </div>
        </div>
      </div>
    </div>
  );
};
