import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRetro } from '@/context/RetroContext';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { currentTeam } = useRetro();
  const { toast } = useToast();
  
  const [profileSettings, setProfileSettings] = useState({
    name: 'Parker Kim',
    email: 'parker.kim@example.com',
    notifications: true,
    darkMode: false,
  });
  
  const [teamSettings, setTeamSettings] = useState({
    name: currentTeam?.name || '',
    autoArchive: true,
    emailNotifications: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating profile settings:', profileSettings);
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
    // In a real app, this would update the user profile
  };

  const handleTeamUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating team settings:', teamSettings);
    toast({
      title: "Team Settings Updated",
      description: "Team settings have been saved successfully.",
    });
    // In a real app, this would update the team settings
  };
  
  const handleDeleteTeam = () => {
    console.log('Delete team clicked');
    toast({
      title: "Team Deletion",
      description: "Team deletion functionality would be implemented here.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-retro-blue">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profileForm" onSubmit={handleProfileUpdate}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-retro-blue text-white">PK</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button size="sm" variant="outline" type="button">Upload Picture</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileSettings.name} 
                        onChange={(e) => setProfileSettings({...profileSettings, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileSettings.email} 
                        onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Email Notifications</Label>
                        <div className="text-xs text-muted-foreground">Receive email notifications about retro updates</div>
                      </div>
                      <Switch 
                        id="notifications" 
                        checked={profileSettings.notifications} 
                        onCheckedChange={(checked) => setProfileSettings({...profileSettings, notifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <div className="text-xs text-muted-foreground">Use dark color scheme</div>
                      </div>
                      <Switch 
                        id="darkMode" 
                        checked={profileSettings.darkMode} 
                        onCheckedChange={(checked) => setProfileSettings({...profileSettings, darkMode: checked})}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="profileForm">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>
                Configure settings for {currentTeam?.name || 'your team'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="teamForm" onSubmit={handleTeamUpdate}>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input 
                      id="teamName" 
                      value={teamSettings.name} 
                      onChange={(e) => setTeamSettings({...teamSettings, name: e.target.value})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoArchive">Auto-Archive</Label>
                        <div className="text-xs text-muted-foreground">
                          Automatically archive completed retros after 30 days
                        </div>
                      </div>
                      <Switch 
                        id="autoArchive" 
                        checked={teamSettings.autoArchive} 
                        onCheckedChange={(checked) => setTeamSettings({...teamSettings, autoArchive: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">Team Email Notifications</Label>
                        <div className="text-xs text-muted-foreground">
                          Send email notifications to all team members
                        </div>
                      </div>
                      <Switch 
                        id="emailNotifications" 
                        checked={teamSettings.emailNotifications} 
                        onCheckedChange={(checked) => setTeamSettings({...teamSettings, emailNotifications: checked})}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button 
                      variant="destructive" 
                      type="button" 
                      onClick={handleDeleteTeam}
                    >
                      Delete Team
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      This action cannot be undone. All data will be permanently deleted.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="teamForm">Save Team Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
