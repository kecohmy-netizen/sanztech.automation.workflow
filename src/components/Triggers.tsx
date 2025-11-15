import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Clock, 
  Webhook,
  Calendar,
  Database,
  Mail,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit,
  MoreVertical
} from 'lucide-react';

interface Trigger {
  id: string;
  name: string;
  type: 'webhook' | 'schedule' | 'database' | 'email';
  status: 'active' | 'paused';
  workflow: string;
  lastTriggered?: string;
  triggerCount: number;
  config: string;
}

const initialTriggers: Trigger[] = [
  {
    id: '1',
    name: 'TikTok Webhook',
    type: 'webhook',
    status: 'active',
    workflow: 'TikTok Analytics',
    lastTriggered: '2 minutes ago',
    triggerCount: 1247,
    config: 'POST /webhook/tiktok'
  },
  {
    id: '2',
    name: 'Daily Report Schedule',
    type: 'schedule',
    status: 'active',
    workflow: 'Email Reports',
    lastTriggered: '3 hours ago',
    triggerCount: 89,
    config: 'Every day at 9:00 AM'
  },
  {
    id: '3',
    name: 'Database Change Monitor',
    type: 'database',
    status: 'active',
    workflow: 'Data Sync',
    lastTriggered: '15 minutes ago',
    triggerCount: 523,
    config: 'Watch users table'
  },
  {
    id: '4',
    name: 'Email Notification',
    type: 'email',
    status: 'paused',
    workflow: 'Support Tickets',
    lastTriggered: '1 day ago',
    triggerCount: 45,
    config: 'support@mayahq.com'
  },
  {
    id: '5',
    name: 'Hourly Backup',
    type: 'schedule',
    status: 'active',
    workflow: 'System Backup',
    lastTriggered: '30 minutes ago',
    triggerCount: 672,
    config: 'Every hour'
  }
];

export default function Triggers() {
  const [triggers, setTriggers] = useState<Trigger[]>(initialTriggers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTriggers = triggers.filter(trigger =>
    trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trigger.workflow.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTriggerStatus = (triggerId: string) => {
    setTriggers(triggers.map(trigger => {
      if (trigger.id === triggerId) {
        return { ...trigger, status: trigger.status === 'active' ? 'paused' : 'active' };
      }
      return trigger;
    }));
  };

  const deleteTrigger = (triggerId: string) => {
    setTriggers(triggers.filter(trigger => trigger.id !== triggerId));
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'webhook': return <Webhook className="w-5 h-5" />;
      case 'schedule': return <Clock className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const stats = {
    total: triggers.length,
    active: triggers.filter(t => t.status === 'active').length,
    paused: triggers.filter(t => t.status === 'paused').length,
    totalTriggers: triggers.reduce((sum, t) => sum + t.triggerCount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Triggers</h1>
        <p className="text-gray-400 text-sm md:text-base">Manage automation triggers and events</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[#d4af37]" />
            <div className="text-gray-400 text-xs md:text-sm">Total Triggers</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">{stats.total}</div>
        </Card>
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4 text-[#d4af37]" />
            <div className="text-gray-400 text-xs md:text-sm">Active</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-[#d4af37]">{stats.active}</div>
        </Card>
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Pause className="w-4 h-4 text-gray-400" />
            <div className="text-gray-400 text-xs md:text-sm">Paused</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-400">{stats.paused}</div>
        </Card>
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[#d4af37]" />
            <div className="text-gray-400 text-xs md:text-sm">Total Fired</div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">{stats.totalTriggers.toLocaleString()}</div>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search triggers..."
          className="bg-[#1a1a1a] border-[#d4af37]/30 text-white"
        />
      </div>

      {/* Triggers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTriggers.map((trigger) => (
          <Card
            key={trigger.id}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6 hover:border-[#d4af37]/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  trigger.status === 'active' 
                    ? 'bg-[#d4af37]/20 text-[#d4af37]' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {getTriggerIcon(trigger.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{trigger.name}</h3>
                  <Badge className={
                    trigger.status === 'active'
                      ? 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }>
                    {trigger.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTriggerStatus(trigger.id)}
                  className="h-8 w-8 text-gray-400 hover:text-[#d4af37]"
                >
                  {trigger.status === 'active' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
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
                  onClick={() => deleteTrigger(trigger.id)}
                  className="h-8 w-8 text-gray-400 hover:text-gray-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Workflow</div>
                <div className="text-sm text-white">{trigger.workflow}</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">Configuration</div>
                <div className="text-sm text-gray-300 font-mono bg-black/30 px-3 py-2 rounded">
                  {trigger.config}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-3 border-t border-[#d4af37]/10">
                <div className="text-xs text-gray-500">
                  Last triggered: <span className="text-gray-300">{trigger.lastTriggered}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Fired: <span className="text-[#d4af37] font-semibold">{trigger.triggerCount.toLocaleString()}x</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Trigger Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#d4af37] hover:bg-[#b8941f] text-black shadow-lg shadow-[#d4af37]/50"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
