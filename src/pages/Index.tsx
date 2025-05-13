
import { RetroProvider } from '@/context/RetroContext';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import RetroBoard from '@/components/RetroBoard';
import Analytics from '@/components/Analytics';
import Teams from '@/components/Teams';
import Settings from '@/components/Settings';
import { useState } from 'react';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  
  return (
    <RetroProvider>
      <div className="min-h-screen flex flex-col bg-retro-light">
        <Navigation activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1">
          {activeView === 'dashboard' && <Dashboard onRetroSelect={(retroId) => {
            setActiveView('retro');
          }} />}
          {activeView === 'retro' && <RetroBoard retroId="1" onBack={() => setActiveView('dashboard')} />}
          {activeView === 'analytics' && <Analytics />}
          {activeView === 'teams' && <Teams />}
          {activeView === 'settings' && <Settings />}
        </main>
      </div>
    </RetroProvider>
  );
};

export default Index;
