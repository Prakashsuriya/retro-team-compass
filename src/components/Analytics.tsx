
import React from 'react';
import { useRetro } from '@/context/RetroContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { retros } = useRetro();
  
  // Calculate data for charts
  const retrosByMonth = retros.reduce((acc: any, retro) => {
    const month = new Date(retro.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { month, count: 0 };
    }
    acc[month].count += 1;
    return acc;
  }, {});
  
  const retroBarData = Object.values(retrosByMonth);
  
  // Calculate total items by type
  const itemsByType = retros.reduce((acc: any, retro) => {
    retro.items.forEach(item => {
      if (!acc[item.type]) {
        acc[item.type] = { name: item.type, value: 0 };
      }
      acc[item.type].value += 1;
    });
    return acc;
  }, {});
  
  const pieData = Object.values(itemsByType);
  const COLORS = ['#4CAF50', '#FFC107', '#2196F3'];

  // Calculate team participation
  const teamParticipation = retros.reduce((acc: any, retro) => {
    const teamId = retro.teamId;
    if (!acc[teamId]) {
      acc[teamId] = { teamId, count: 0 };
    }
    acc[teamId].count += 1;
    return acc;
  }, {});
  
  const teamData = Object.values(teamParticipation);
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-retro-blue">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your team's retrospective analytics and insights</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Retrospectives by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={retroBarData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Retros" fill="#3c7a89" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Item Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="teamId" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Retros" fill="#e57f50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
