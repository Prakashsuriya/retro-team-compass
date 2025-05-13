
import { RetroProvider } from '@/context/RetroContext';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import RetroBoard from '@/components/RetroBoard';
import { useState } from 'react';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  
  return (
    <RetroProvider>
      <div className="min-h-screen flex flex-col bg-retro-light">
        <Navigation />
        <main className="flex-1">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'retro' && <RetroBoard retroId="1" />}
        </main>
      </div>
    </RetroProvider>
  );
};

export default Index;
