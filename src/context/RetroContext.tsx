import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
export type RetroItemType = 'positive' | 'negative' | 'action';

export interface RetroItem {
  id: string;
  content: string;
  type: RetroItemType;
  votes: number;
  author: string;
  createdAt: string;
}

export interface Retro {
  id: string;
  title: string;
  description: string;
  date: string;
  teamId: string;
  status: 'upcoming' | 'active' | 'completed';
  items: RetroItem[];
}

export interface Team {
  id: string;
  name: string;
  members: string[];
}

// Define context shape
interface RetroContextType {
  retros: Retro[];
  currentRetro: Retro | null;
  teams: Team[];
  currentTeam: Team | null;
  loading: boolean;
  setCurrentRetro: (retro: Retro | null) => void;
  setCurrentTeam: (team: Team | null) => void;
  addRetro: (retro: Omit<Retro, 'id'>) => void;
  addRetroItem: (retroId: string, item: Omit<RetroItem, 'id' | 'createdAt'>) => void;
  updateRetroItem: (retroId: string, itemId: string, updates: Partial<RetroItem>) => void;
  deleteRetroItem: (retroId: string, itemId: string) => void;
  voteRetroItem: (retroId: string, itemId: string) => void;
}

// Create context
const RetroContext = createContext<RetroContextType | undefined>(undefined);

// Sample data
const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Team',
    members: ['John Doe', 'Jane Smith', 'Alex Johnson'],
  },
  {
    id: '2',
    name: 'Backend Team',
    members: ['Michael Brown', 'Emily Davis', 'Robert Wilson'],
  },
  {
    id: '3',
    name: 'Design Team',
    members: ['Sarah Lee', 'Chris Martinez', 'Taylor Kim'],
  },
];

const mockRetros: Retro[] = [
  {
    id: '1',
    title: 'Sprint 23 Retrospective',
    description: 'Review of our latest feature launch',
    date: '2023-05-15',
    teamId: '1',
    status: 'completed',
    items: [
      {
        id: '101',
        content: 'Successfully launched new user dashboard on time',
        type: 'positive',
        votes: 3,
        author: 'John Doe',
        createdAt: '2023-05-15T10:00:00Z',
      },
      {
        id: '102',
        content: 'QA process took longer than expected',
        type: 'negative',
        votes: 2,
        author: 'Jane Smith',
        createdAt: '2023-05-15T10:05:00Z',
      },
      {
        id: '103',
        content: 'Implement automated testing for critical paths',
        type: 'action',
        votes: 4,
        author: 'Alex Johnson',
        createdAt: '2023-05-15T10:10:00Z',
      },
    ],
  },
  {
    id: '2',
    title: 'API Integration Review',
    description: 'Discussing challenges with third-party services',
    date: '2023-05-22',
    teamId: '2',
    status: 'completed',
    items: [
      {
        id: '201',
        content: 'Payment API integration completed ahead of schedule',
        type: 'positive',
        votes: 2,
        author: 'Michael Brown',
        createdAt: '2023-05-22T14:00:00Z',
      },
      {
        id: '202',
        content: 'Documentation for shipping API was outdated',
        type: 'negative',
        votes: 3,
        author: 'Emily Davis',
        createdAt: '2023-05-22T14:15:00Z',
      },
      {
        id: '203',
        content: 'Create internal documentation for all API integrations',
        type: 'action',
        votes: 5,
        author: 'Robert Wilson',
        createdAt: '2023-05-22T14:30:00Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Q2 Planning Session',
    description: 'Planning our objectives for the next quarter',
    date: '2023-06-01',
    teamId: '1',
    status: 'upcoming',
    items: [],
  },
  {
    id: '4',
    title: 'UI/UX Design Review',
    description: 'Evaluating our latest design system implementation',
    date: '2023-04-18',
    teamId: '3',
    status: 'completed',
    items: [
      {
        id: '401',
        content: 'New component library improved development speed by 30%',
        type: 'positive',
        votes: 5,
        author: 'Sarah Lee',
        createdAt: '2023-04-18T09:30:00Z',
      },
      {
        id: '402',
        content: 'Mobile responsiveness issues on key landing pages',
        type: 'negative',
        votes: 3,
        author: 'Chris Martinez',
        createdAt: '2023-04-18T09:45:00Z',
      },
      {
        id: '403',
        content: 'Create comprehensive responsive design guidelines',
        type: 'action',
        votes: 4,
        author: 'Taylor Kim',
        createdAt: '2023-04-18T10:00:00Z',
      },
    ],
  },
  {
    id: '5',
    title: 'Performance Optimization Sprint',
    description: 'Review of site performance improvements',
    date: '2023-04-05',
    teamId: '1',
    status: 'completed',
    items: [
      {
        id: '501',
        content: 'Reduced page load time by 45%',
        type: 'positive',
        votes: 6,
        author: 'John Doe',
        createdAt: '2023-04-05T11:00:00Z',
      },
      {
        id: '502',
        content: 'Legacy code refactoring took longer than estimated',
        type: 'negative',
        votes: 2,
        author: 'Jane Smith',
        createdAt: '2023-04-05T11:10:00Z',
      },
      {
        id: '503',
        content: 'Implement performance monitoring system',
        type: 'action',
        votes: 5,
        author: 'Alex Johnson',
        createdAt: '2023-04-05T11:20:00Z',
      },
      {
        id: '504',
        content: 'Bundle optimization reduced JavaScript size by 30%',
        type: 'positive',
        votes: 4,
        author: 'John Doe',
        createdAt: '2023-04-05T11:30:00Z',
      },
    ],
  },
  {
    id: '6',
    title: 'Database Migration Post-Mortem',
    description: 'Analysis of our recent database migration process',
    date: '2023-03-15',
    teamId: '2',
    status: 'completed',
    items: [
      {
        id: '601',
        content: 'Zero downtime achieved during migration',
        type: 'positive',
        votes: 7,
        author: 'Michael Brown',
        createdAt: '2023-03-15T15:00:00Z',
      },
      {
        id: '602',
        content: 'Data validation scripts caught 15 critical issues before launch',
        type: 'positive',
        votes: 5,
        author: 'Emily Davis',
        createdAt: '2023-03-15T15:10:00Z',
      },
      {
        id: '603',
        content: 'Some query performance degradation post-migration',
        type: 'negative',
        votes: 4,
        author: 'Robert Wilson',
        createdAt: '2023-03-15T15:20:00Z',
      },
      {
        id: '604',
        content: 'Optimize high-traffic queries and add performance monitoring',
        type: 'action',
        votes: 6,
        author: 'Michael Brown',
        createdAt: '2023-03-15T15:30:00Z',
      },
    ],
  },
];

// Provider component
interface RetroProviderProps {
  children: ReactNode;
}

export const RetroProvider = ({ children }: RetroProviderProps) => {
  const [retros, setRetros] = useState<Retro[]>(mockRetros);
  const [currentRetro, setCurrentRetro] = useState<Retro | null>(null);
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(teams[0]);
  const [loading, setLoading] = useState<boolean>(false);

  const addRetro = (retro: Omit<Retro, 'id'>) => {
    const newRetro = {
      ...retro,
      id: `retro-${Date.now()}`,
      items: [],
    };

    setRetros([...retros, newRetro]);
  };

  const addRetroItem = (retroId: string, item: Omit<RetroItem, 'id' | 'createdAt'>) => {
    setRetros(
      retros.map((retro) => {
        if (retro.id === retroId) {
          return {
            ...retro,
            items: [
              ...retro.items,
              {
                ...item,
                id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        return retro;
      })
    );
  };

  const updateRetroItem = (retroId: string, itemId: string, updates: Partial<RetroItem>) => {
    setRetros(
      retros.map((retro) => {
        if (retro.id === retroId) {
          return {
            ...retro,
            items: retro.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, ...updates };
              }
              return item;
            }),
          };
        }
        return retro;
      })
    );
  };

  const deleteRetroItem = (retroId: string, itemId: string) => {
    setRetros(
      retros.map((retro) => {
        if (retro.id === retroId) {
          return {
            ...retro,
            items: retro.items.filter((item) => item.id !== itemId),
          };
        }
        return retro;
      })
    );
  };

  const voteRetroItem = (retroId: string, itemId: string) => {
    setRetros(
      retros.map((retro) => {
        if (retro.id === retroId) {
          return {
            ...retro,
            items: retro.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, votes: item.votes + 1 };
              }
              return item;
            }),
          };
        }
        return retro;
      })
    );
  };

  // Effect to update current retro if it changes in the retros array
  useEffect(() => {
    if (currentRetro) {
      const updated = retros.find((r) => r.id === currentRetro.id);
      if (updated) {
        setCurrentRetro(updated);
      }
    }
  }, [retros, currentRetro]);

  const value = {
    retros,
    currentRetro,
    teams,
    currentTeam,
    loading,
    setCurrentRetro,
    setCurrentTeam,
    addRetro,
    addRetroItem,
    updateRetroItem,
    deleteRetroItem,
    voteRetroItem,
  };

  return <RetroContext.Provider value={value}>{children}</RetroContext.Provider>;
};

// Hook to use the retro context
export const useRetro = () => {
  const context = useContext(RetroContext);
  if (context === undefined) {
    throw new Error('useRetro must be used within a RetroProvider');
  }
  return context;
};
