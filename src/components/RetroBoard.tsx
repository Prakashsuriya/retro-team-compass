
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronUp, Plus, ThumbsUp, X, MessageSquare, ArrowLeft } from 'lucide-react';
import { useRetro, RetroItem, RetroItemType } from '@/context/RetroContext';
import { cn } from '@/lib/utils';

interface RetroBoardProps {
  retroId: string;
  onBack?: () => void;
}

const RetroBoard: React.FC<RetroBoardProps> = ({ retroId, onBack }) => {
  const { retros, currentRetro, addRetroItem, voteRetroItem, deleteRetroItem } = useRetro();
  const [newItemText, setNewItemText] = useState<string>('');
  const [activeColumn, setActiveColumn] = useState<RetroItemType | null>(null);

  const retro = currentRetro || retros.find(r => r.id === retroId);

  if (!retro) {
    return <div className="p-8 text-center">Retro not found</div>;
  }

  const positiveItems = retro.items.filter(item => item.type === 'positive');
  const negativeItems = retro.items.filter(item => item.type === 'negative');
  const actionItems = retro.items.filter(item => item.type === 'action');

  const handleAddItem = (type: RetroItemType) => {
    if (!newItemText.trim()) return;
    
    addRetroItem(retro.id, {
      content: newItemText.trim(),
      type,
      votes: 0,
      author: 'Current User', // In a real app, get from auth context
    });
    
    setNewItemText('');
    setActiveColumn(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-retro-blue" 
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-retro-blue">{retro.title}</h1>
            <p className="text-muted-foreground">{retro.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Finalize Retro</Button>
        </div>
      </div>

      <div className="retro-board-container min-h-[500px]">
        {/* What Went Well Column */}
        <RetroColumn 
          title="What Went Well" 
          description="Celebrate achievements and successes"
          color="green"
          icon={<ThumbsUp className="h-5 w-5 text-green-500" />}
          isAdding={activeColumn === 'positive'}
          onAddClick={() => setActiveColumn(activeColumn === 'positive' ? null : 'positive')}
          onSubmit={() => handleAddItem('positive')}
        >
          {activeColumn === 'positive' && (
            <div className="mb-4">
              <Textarea 
                placeholder="What went well in this sprint?"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setNewItemText('');
                    setActiveColumn(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleAddItem('positive')}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
          
          {positiveItems.length > 0 ? (
            <div className="space-y-3">
              {positiveItems.map((item) => (
                <RetroItemCard 
                  key={item.id}
                  item={item}
                  onVote={() => voteRetroItem(retro.id, item.id)}
                  onDelete={() => deleteRetroItem(retro.id, item.id)}
                  color="green"
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground italic">
              No items yet. Add your first observation!
            </div>
          )}
        </RetroColumn>
        
        {/* What Needs Improvement Column */}
        <RetroColumn 
          title="What Needs Improvement" 
          description="Identify areas for growth"
          color="amber"
          icon={<MessageSquare className="h-5 w-5 text-amber-500" />}
          isAdding={activeColumn === 'negative'}
          onAddClick={() => setActiveColumn(activeColumn === 'negative' ? null : 'negative')}
          onSubmit={() => handleAddItem('negative')}
        >
          {activeColumn === 'negative' && (
            <div className="mb-4">
              <Textarea 
                placeholder="What could we improve?"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setNewItemText('');
                    setActiveColumn(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleAddItem('negative')}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
          
          {negativeItems.length > 0 ? (
            <div className="space-y-3">
              {negativeItems.map((item) => (
                <RetroItemCard 
                  key={item.id}
                  item={item}
                  onVote={() => voteRetroItem(retro.id, item.id)}
                  onDelete={() => deleteRetroItem(retro.id, item.id)}
                  color="amber"
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground italic">
              No items yet. Add your first observation!
            </div>
          )}
        </RetroColumn>
        
        {/* Action Items Column */}
        <RetroColumn 
          title="Action Items" 
          description="Tasks to improve future sprints"
          color="blue"
          icon={<ChevronUp className="h-5 w-5 text-blue-500" />}
          isAdding={activeColumn === 'action'}
          onAddClick={() => setActiveColumn(activeColumn === 'action' ? null : 'action')}
          onSubmit={() => handleAddItem('action')}
        >
          {activeColumn === 'action' && (
            <div className="mb-4">
              <Textarea 
                placeholder="What actions should we take?"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setNewItemText('');
                    setActiveColumn(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleAddItem('action')}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
          
          {actionItems.length > 0 ? (
            <div className="space-y-3">
              {actionItems.map((item) => (
                <RetroItemCard 
                  key={item.id}
                  item={item}
                  onVote={() => voteRetroItem(retro.id, item.id)}
                  onDelete={() => deleteRetroItem(retro.id, item.id)}
                  color="blue"
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground italic">
              No items yet. Add your first action item!
            </div>
          )}
        </RetroColumn>
      </div>
    </div>
  );
};

interface RetroColumnProps {
  title: string;
  description: string;
  color: 'green' | 'amber' | 'blue';
  icon: React.ReactNode;
  isAdding: boolean;
  onAddClick: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

const RetroColumn: React.FC<RetroColumnProps> = ({
  title,
  description,
  color,
  icon,
  isAdding,
  onAddClick,
  onSubmit,
  children
}) => {
  const colorClasses = {
    green: "border-green-200 bg-green-50",
    amber: "border-amber-200 bg-amber-50",
    blue: "border-blue-200 bg-blue-50"
  };

  return (
    <div className={cn("border rounded-lg p-4", colorClasses[color])}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "rounded-full w-8 h-8 p-0",
            isAdding && "bg-primary/20"
          )}
          onClick={onAddClick}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  );
};

interface RetroItemCardProps {
  item: RetroItem;
  onVote: () => void;
  onDelete: () => void;
  color: 'green' | 'amber' | 'blue';
}

const RetroItemCard: React.FC<RetroItemCardProps> = ({
  item,
  onVote,
  onDelete,
  color
}) => {
  const colorClasses = {
    green: "border-green-300 bg-white",
    amber: "border-amber-300 bg-white",
    blue: "border-blue-300 bg-white"
  };
  
  return (
    <div className={cn("border p-3 rounded-md shadow-sm", colorClasses[color])}>
      <div className="flex justify-between">
        <p className="text-sm">{item.content}</p>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-full opacity-30 hover:opacity-100"
          onClick={onDelete}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t text-xs text-muted-foreground">
        <span className="italic">{item.author}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 flex gap-1 items-center text-xs"
          onClick={onVote}
        >
          <ThumbsUp className="h-3 w-3" />
          <span>{item.votes}</span>
        </Button>
      </div>
    </div>
  );
};

export default RetroBoard;
