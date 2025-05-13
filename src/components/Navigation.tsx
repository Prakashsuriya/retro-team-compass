
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRetro } from '@/context/RetroContext';
import { BarChart3, Home, Settings, Calendar, Users, Plus, Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleNavClick = (view: string) => {
    setActiveView(view);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-retro-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold cursor-pointer" onClick={() => handleNavClick('dashboard')}>RetroCompass</span>
            {currentTeam && (
              <span className="text-xs opacity-80">{currentTeam.name}</span>
            )}
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem 
            icon={<Home size={18} />} 
            label="Dashboard" 
            active={activeView === 'dashboard'}
            onClick={() => handleNavClick('dashboard')}
          />
          <NavItem 
            icon={<Calendar size={18} />} 
            label="Retros" 
            active={activeView === 'retro'}
            onClick={() => handleNavClick('retro')}
          />
          <NavItem 
            icon={<BarChart3 size={18} />} 
            label="Analytics" 
            active={activeView === 'analytics'}
            onClick={() => handleNavClick('analytics')}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Teams" 
            active={activeView === 'teams'}
            onClick={() => handleNavClick('teams')}
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            active={activeView === 'settings'}
            onClick={() => handleNavClick('settings')}
          />
        </nav>

        <div className="hidden md:flex items-center gap-4">
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
              <CreateRetroForm onSuccess={() => handleNavClick('retro')} />
            </DialogContent>
          </Dialog>
          <div className="bg-white text-retro-blue h-8 w-8 rounded-full flex items-center justify-center font-medium">
            PK
          </div>
        </div>
        
        {/* Mobile navigation - expanded menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-retro-blue z-50 shadow-lg">
            <div className="flex flex-col p-4 space-y-2">
              <MobileNavItem 
                icon={<Home size={18} />} 
                label="Dashboard" 
                active={activeView === 'dashboard'}
                onClick={() => handleNavClick('dashboard')}
              />
              <MobileNavItem 
                icon={<Calendar size={18} />} 
                label="Retros" 
                active={activeView === 'retro'}
                onClick={() => handleNavClick('retro')}
              />
              <MobileNavItem 
                icon={<BarChart3 size={18} />} 
                label="Analytics" 
                active={activeView === 'analytics'}
                onClick={() => handleNavClick('analytics')}
              />
              <MobileNavItem 
                icon={<Users size={18} />} 
                label="Teams" 
                active={activeView === 'teams'}
                onClick={() => handleNavClick('teams')}
              />
              <MobileNavItem 
                icon={<Settings size={18} />} 
                label="Settings" 
                active={activeView === 'settings'}
                onClick={() => handleNavClick('settings')}
              />
              <div className="pt-4 flex items-center justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-retro-coral hover:bg-retro-coral/90 text-white w-full">
                      <Plus size={16} className="mr-1" /> New Retro
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Retrospective</DialogTitle>
                    </DialogHeader>
                    <CreateRetroForm onSuccess={() => handleNavClick('retro')} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )}
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

const MobileNavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full px-3 py-3 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all",
      active ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
    )}
  >
    {icon}
    {label}
  </button>
);

export default Navigation;
