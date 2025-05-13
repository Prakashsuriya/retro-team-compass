
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRetro } from '@/context/RetroContext';
import { BarChart3, Home, Settings, Calendar, Users, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateRetroForm from './CreateRetroForm';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Navigation = ({ activeView, setActiveView }: NavigationProps) => {
  const { currentTeam } = useRetro();
  
  return (
    <header className="bg-retro-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold cursor-pointer" onClick={() => setActiveView('dashboard')}>RetroCompass</span>
            {currentTeam && (
              <span className="text-xs opacity-80">{currentTeam.name}</span>
            )}
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem 
            icon={<Home size={18} />} 
            label="Dashboard" 
            active={activeView === 'dashboard'}
            onClick={() => setActiveView('dashboard')}
          />
          <NavItem 
            icon={<Calendar size={18} />} 
            label="Retros" 
            active={activeView === 'retro'}
            onClick={() => setActiveView('retro')}
          />
          <NavItem 
            icon={<BarChart3 size={18} />} 
            label="Analytics" 
            active={activeView === 'analytics'}
            onClick={() => setActiveView('analytics')}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Teams" 
            active={activeView === 'teams'}
            onClick={() => setActiveView('teams')}
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            active={activeView === 'settings'}
            onClick={() => setActiveView('settings')}
          />
        </nav>

        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-retro-coral hover:bg-retro-coral/90 text-white">
                <Plus size={16} className="mr-1" /> New Retro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Retrospective</DialogTitle>
              </DialogHeader>
              <CreateRetroForm onSuccess={() => setActiveView('retro')} />
            </DialogContent>
          </Dialog>
          <div className="bg-white text-retro-blue h-8 w-8 rounded-full flex items-center justify-center font-medium">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all",
      active ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
    )}
  >
    {icon}
    {label}
  </button>
);

export default Navigation;
