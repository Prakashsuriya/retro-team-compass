
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRetro } from '@/context/RetroContext';
import { Calendar, Clock, CheckCheck, AlertTriangle, LineChart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateRetroForm from './CreateRetroForm';

interface DashboardProps {
  onRetroSelect: (retroId: string) => void;
}

export default function Dashboard({ onRetroSelect }: DashboardProps) {
  const { retros, teams, currentTeam, setCurrentRetro } = useRetro();
  
  const upcomingRetros = retros.filter(retro => retro.status === 'upcoming');
  const completedRetros = retros.filter(retro => retro.status === 'completed');
  
  const handleRetroClick = (retro: any) => {
    setCurrentRetro(retro);
    onRetroSelect(retro.id);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-retro-blue">Team Dashboard</h1>
            <p className="text-muted-foreground">Track your team's progress and plan effective retrospectives</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-retro-teal hover:bg-retro-teal/90">
                Create New Retro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Retrospective</DialogTitle>
              </DialogHeader>
              <CreateRetroForm onSuccess={() => onRetroSelect("1")} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Upcoming Retros" 
            value={upcomingRetros.length.toString()}
            description="Scheduled sessions"
            icon={<Calendar className="h-5 w-5 text-retro-teal" />}
          />
          <MetricCard 
            title="Action Items" 
            value="12"
            description="4 completed, 8 pending"
            icon={<CheckCheck className="h-5 w-5 text-green-500" />}
          />
          <MetricCard 
            title="Areas for Improvement" 
            value="7"
            description="Identified in last retro"
            icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          />
          <MetricCard 
            title="Sentiment Score" 
            value="71%"
            description="12% increase"
            icon={<LineChart className="h-5 w-5 text-retro-blue" />}
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-retro-blue">Upcoming Retrospectives</h2>
        </div>
        
        <div className="dashboard-grid">
          {upcomingRetros.length > 0 ? (
            upcomingRetros.map((retro) => (
              <RetroCard 
                key={retro.id} 
                retro={retro} 
                onClick={() => handleRetroClick(retro)}
              />
            ))
          ) : (
            <Card className="col-span-full bg-muted/40">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No upcoming retrospectives scheduled</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4">Schedule a Retro</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Retrospective</DialogTitle>
                    </DialogHeader>
                    <CreateRetroForm onSuccess={() => onRetroSelect("1")} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-retro-blue">Recent Retrospectives</h2>
          <Button variant="ghost" size="sm" className="text-retro-blue">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="dashboard-grid">
          {completedRetros.slice(0, 3).map((retro) => (
            <RetroCard 
              key={retro.id} 
              retro={retro} 
              onClick={() => handleRetroClick(retro)}
              completed
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ title, value, description, icon }: { 
  title: string; 
  value: string; 
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1 text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="p-2 bg-background rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RetroCard({ retro, onClick, completed = false }: { 
  retro: any; 
  onClick: () => void;
  completed?: boolean;
}) {
  const positiveItems = retro.items.filter((item: any) => item.type === 'positive').length;
  const negativeItems = retro.items.filter((item: any) => item.type === 'negative').length;
  const actionItems = retro.items.filter((item: any) => item.type === 'action').length;
  
  const totalItems = positiveItems + negativeItems + actionItems;
  
  return (
    <Card className={cn(
      "cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4",
      completed ? "border-l-green-500" : "border-l-blue-500"
    )} onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <CardTitle className="text-lg font-semibold">{retro.title}</CardTitle>
          {completed && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Completed
            </span>
          )}
          {!completed && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Upcoming
            </span>
          )}
        </div>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{retro.date}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 line-clamp-2">{retro.description}</p>
        
        {completed && totalItems > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Items breakdown</span>
              <span>{totalItems} items</span>
            </div>
            <div className="h-2 flex rounded-full overflow-hidden">
              {positiveItems > 0 && (
                <div 
                  className="bg-green-500" 
                  style={{ width: `${(positiveItems / totalItems) * 100}%` }}
                />
              )}
              {negativeItems > 0 && (
                <div 
                  className="bg-amber-500" 
                  style={{ width: `${(negativeItems / totalItems) * 100}%` }}
                />
              )}
              {actionItems > 0 && (
                <div 
                  className="bg-blue-500" 
                  style={{ width: `${(actionItems / totalItems) * 100}%` }}
                />
              )}
            </div>
            <div className="flex text-xs gap-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Positive</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                <span>Needs Improvement</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Actions</span>
              </div>
            </div>
          </div>
        ) : completed ? (
          <div className="text-sm text-muted-foreground italic">No items recorded</div>
        ) : (
          <div className="text-sm text-muted-foreground">Ready to be started</div>
        )}
      </CardContent>
    </Card>
  );
}
