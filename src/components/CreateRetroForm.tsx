
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRetro } from '@/context/RetroContext';
import { cn } from '@/lib/utils';

interface FormData {
  title: string;
  description: string;
  teamId: string;
  date: Date;
}

export default function CreateRetroForm({ onSuccess }: { onSuccess?: () => void }) {
  const { teams, addRetro } = useRetro();
  const [date, setDate] = useState<Date>();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    if (!date) return;
    
    addRetro({
      title: data.title,
      description: data.description,
      teamId: data.teamId,
      date: format(date, 'yyyy-MM-dd'),
      status: 'upcoming',
      items: [],
    });
    
    reset();
    setDate(undefined);
    if (onSuccess) onSuccess();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Retro Title</Label>
        <Input
          id="title"
          placeholder="Sprint 24 Retrospective"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Let's review our performance and identify areas for improvement..."
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>
      
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {!date && <p className="text-sm text-destructive">Date is required</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="teamId">Team</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || !date}>
          Create Retrospective
        </Button>
      </div>
    </form>
  );
}
