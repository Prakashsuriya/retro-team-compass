
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRetro } from '@/context/RetroContext';
import { BarChart3, Home, Settings, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { currentTeam } = useRetro();
  
  return (
    <header className="bg-retro-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold">RetroCompass</span>
            {currentTeam && (
              <span className="text-xs opacity-80">{currentTeam.name}</span>
            )}
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem icon={<Home size={18} />} href="/" label="Dashboard" active />
          <NavItem icon={<Calendar size={18} />} href="/retros" label="Retros" />
          <NavItem icon={<BarChart3 size={18} />} href="/analytics" label="Analytics" />
          <NavItem icon={<Users size={18} />} href="/teams" label="Teams" />
          <NavItem icon={<Settings size={18} />} href="/settings" label="Settings" />
        </nav>

        <div className="flex items-center gap-4">
          <Button size="sm" className="bg-retro-coral hover:bg-retro-coral/90 text-white">
            New Retro
          </Button>
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
  href: string;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon, href, label, active }: NavItemProps) => (
  <a 
    href={href} 
    className={cn(
      "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all",
      active ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
    )}
  >
    {icon}
    {label}
  </a>
);

export default Navigation;
