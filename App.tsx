import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Marketplace } from './pages/Marketplace';
import { Profile } from './pages/Profile';
import { Onboarding } from './pages/Onboarding';
import { Messages } from './pages/Messages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
