import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Bell, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className={`w-full border-b border-gray-100 bg-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
           <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">Lume.</Link>
           {!isLanding && (
             <div className="hidden md:flex gap-6 text-sm font-medium">
               <Link to="/marketplace" className={`${location.pathname.includes('marketplace') ? 'text-indigo-600' : 'text-gray-500 hover:text-slate-900'}`}>Explore</Link>
               <Link to="/saved" className="text-gray-500 hover:text-slate-900">Saved</Link>
               <Link to="/campaigns" className="text-gray-500 hover:text-slate-900">Campaigns</Link>
             </div>
           )}
        </div>

        <div className="flex items-center gap-4">
           {isLanding ? (
             <>
               <Link to="/onboarding" className="text-sm font-medium text-gray-600 hover:text-slate-900 hidden md:block">Log in</Link>
               <Link to="/onboarding" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">Sign Up</Link>
             </>
           ) : (
             <>
               <Link to="/messages" className="p-2 text-gray-500 hover:text-slate-900 relative">
                 <MessageSquare size={20} />
                 <span className="absolute top-2 right-1.5 w-2 h-2 bg-indigo-600 rounded-full border border-white"></span>
               </Link>
               <button className="p-2 text-gray-500 hover:text-slate-900">
                 <Bell size={20} />
               </button>
               <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-300 transition-colors">
                  <User size={16} />
               </div>
             </>
           )}
        </div>
      </div>
    </nav>
  );
};
