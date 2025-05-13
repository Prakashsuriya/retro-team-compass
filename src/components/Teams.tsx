
import React, { useState } from 'react';
import { useRetro } from '@/context/RetroContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Plus, UserPlus } from 'lucide-react';

const Teams = () => {
  const { teams, currentTeam, setCurrentTeam } = useRetro();
  const [newTeamName, setNewTeamName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const handleCreateTeam = () => {
    // In a real app, this would create a team in the database
    console.log('Creating team:', newTeamName);
    setNewTeamName('');
    // Since we can't modify the teams array in this demo, we'll just log it
  };

  const handleAddMember = () => {
    // In a real app, this would add a member to the team
    console.log('Adding member:', newMemberName, 'to team:', selectedTeam?.name);
    setNewMemberName('');
    // Since we can't modify the teams array in this demo, we'll just log it
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-retro-blue">Team Management</h1>
          <p className="text-muted-foreground">Manage your teams and team members</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-retro-teal hover:bg-retro-teal/90">
              <Plus size={16} className="mr-1" /> Create New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>Enter a name for your new team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-name" className="text-right">
                  Team Name
                </Label>
                <Input
                  id="team-name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className={`${currentTeam?.id === team.id ? 'border-retro-teal border-2' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">{team.name}</CardTitle>
                {currentTeam?.id === team.id && (
                  <span className="bg-retro-teal/20 text-retro-teal text-xs px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{team.members.length} members</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {team.members.map((member, idx) => (
                  <Avatar key={idx} className="h-8 w-8">
                    <AvatarFallback className="bg-retro-light-teal text-white text-xs">
                      {getInitials(member)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => setSelectedTeam(team)}
                    >
                      <UserPlus size={14} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>Add a new member to {selectedTeam?.name}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="member-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="member-name"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddMember}>Add Member</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={currentTeam?.id === team.id ? "secondary" : "outline"} 
                onClick={() => setCurrentTeam(team)}
                className="w-full"
              >
                {currentTeam?.id === team.id ? 'Current Team' : 'Switch to This Team'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teams;
