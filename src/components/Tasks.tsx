import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  workflow?: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Process TikTok Analytics',
    description: 'Analyze engagement metrics from last week',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-15',
    workflow: 'TikTok Automation'
  },
  {
    id: '2',
    title: 'Send Weekly Report',
    description: 'Generate and send weekly automation report',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-01-16',
    workflow: 'Email Automation'
  },
  {
    id: '3',
    title: 'Database Backup',
    description: 'Automated daily database backup',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-01-14',
    workflow: 'System Maintenance'
  },
  {
    id: '4',
    title: 'Update API Integration',
    description: 'Sync with new API endpoints',
    status: 'pending',
    priority: 'low',
    dueDate: '2024-01-18',
    workflow: 'API Management'
  }
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30';
      case 'in-progress': return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30';
      case 'medium': return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 
                         task.status === 'pending' ? 'in-progress' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Tasks</h1>
        <p className="text-gray-400 text-sm md:text-base">Manage your automation tasks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4">
          <div className="text-gray-400 text-xs md:text-sm mb-1">Total Tasks</div>
          <div className="text-2xl md:text-3xl font-bold text-white">{stats.total}</div>
        </Card>
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4">
          <div className="text-gray-400 text-xs md:text-sm mb-1">Completed</div>
          <div className="text-2xl md:text-3xl font-bold text-[#d4af37]">{stats.completed}</div>
        </Card>
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4">
          <div className="text-gray-400 text-xs md:text-sm mb-1">In Progress</div>
          <div className="text-2xl md:text-3xl font-bold text-[#d4af37]">{stats.inProgress}</div>
        </Card>
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-500/20 p-4">
          <div className="text-gray-400 text-xs md:text-sm mb-1">Pending</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-400">{stats.pending}</div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="pl-10 bg-[#1a1a1a] border-[#d4af37]/30 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            className={filterStatus === 'all' ? 'bg-[#d4af37] text-black' : 'border-[#d4af37]/30 text-white'}
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('pending')}
            className={filterStatus === 'pending' ? 'bg-[#d4af37] text-black' : 'border-[#d4af37]/30 text-white'}
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('in-progress')}
            className={filterStatus === 'in-progress' ? 'bg-[#d4af37] text-black' : 'border-[#d4af37]/30 text-white'}
          >
            Active
          </Button>
          <Button
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('completed')}
            className={filterStatus === 'completed' ? 'bg-[#d4af37] text-black' : 'border-[#d4af37]/30 text-white'}
          >
            Done
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 hover:border-[#d4af37]/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className="mt-1 flex-shrink-0"
              >
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 hover:text-[#d4af37] transition-colors" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h3 className={`font-semibold text-white ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
                    {task.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-xs text-gray-500">
                  {task.workflow && (
                    <span className="flex items-center gap-1">
                      <span className="text-[#d4af37]">Workflow:</span> {task.workflow}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-[#d4af37]"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="h-8 w-8 text-gray-400 hover:text-gray-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Task Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#d4af37] hover:bg-[#b8941f] text-black shadow-lg shadow-[#d4af37]/50"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
