import React, { useState } from 'react';
import { 
  Play, 
  Pause,
  Settings, 
  Link2, 
  Calendar,
  BarChart3,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Eye,
  MousePointer,
  ShoppingBag,
  Zap,
  Globe,
  Video
} from 'lucide-react';

interface BioLink {
  id: string;
  title: string;
  url: string;
  type: 'affiliate' | 'tiktok' | 'template' | 'ai-tool' | 'custom';
  description: string;
  icon: string;
  schedule: {
    enabled: boolean;
    frequency: 'instant' | 'daily' | 'weekly' | 'monthly';
    time?: string;
    days?: string[];
  };
  automation: {
    autoPost: boolean;
    autoShare: boolean;
    platforms: string[];
  };
  status: 'active' | 'paused' | 'scheduled';
  analytics: {
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };
  createdAt: string;
  lastUpdated: string;
}

export default function LinkBioAutomation() {
  const [links, setLinks] = useState<BioLink[]>([
    {
      id: '1',
      title: 'Collection Baju Budak',
      url: 'https://tiktok.com/@adamsanz/collection-baju-budak',
      type: 'affiliate',
      description: 'Koleksi baju budak trending - Affiliate TikTok Shop',
      icon: '👕',
      schedule: {
        enabled: true,
        frequency: 'daily',
        time: '10:00',
        days: ['Mon', 'Wed', 'Fri']
      },
      automation: {
        autoPost: true,
        autoShare: true,
        platforms: ['tiktok', 'instagram', 'facebook']
      },
      status: 'active',
      analytics: {
        views: 2500,
        clicks: 320,
        conversions: 45,
        revenue: 1250.50
      },
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      title: 'Template Automation',
      url: 'https://sanztech.online/templates',
      type: 'template',
      description: 'Template bisnes automation & workflow builder',
      icon: '🚀',
      schedule: {
        enabled: true,
        frequency: 'weekly',
        time: '14:00',
        days: ['Tue', 'Thu']
      },
      automation: {
        autoPost: false,
        autoShare: true,
        platforms: ['linkedin', 'twitter']
      },
      status: 'active',
      analytics: {
        views: 1800,
        clicks: 180,
        conversions: 12,
        revenue: 2400.00
      },
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18'
    },
    {
      id: '3',
      title: 'TikTok Aku',
      url: 'https://tiktok.com/@adamsanz',
      type: 'tiktok',
      description: 'Follow untuk content automation & AI',
      icon: '📱',
      schedule: {
        enabled: false,
        frequency: 'instant'
      },
      automation: {
        autoPost: false,
        autoShare: false,
        platforms: []
      },
      status: 'active',
      analytics: {
        views: 5200,
        clicks: 890,
        conversions: 0,
        revenue: 0
      },
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-19'
    },
    {
      id: '4',
      title: 'AI Content Ideation',
      url: 'https://sanztech.online/ai-tools',
      type: 'ai-tool',
      description: 'AI tools untuk generate content ideas',
      icon: '🤖',
      schedule: {
        enabled: true,
        frequency: 'daily',
        time: '09:00'
      },
      automation: {
        autoPost: true,
        autoShare: true,
        platforms: ['tiktok', 'twitter']
      },
      status: 'active',
      analytics: {
        views: 3100,
        clicks: 420,
        conversions: 28,
        revenue: 840.00
      },
      createdAt: '2024-01-12',
      lastUpdated: '2024-01-20'
    }
  ]);

  const [automationRunning, setAutomationRunning] = useState(false);
  const [selectedLink, setSelectedLink] = useState<BioLink | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate total analytics
  const totalAnalytics = links.reduce((acc, link) => ({
    views: acc.views + link.analytics.views,
    clicks: acc.clicks + link.analytics.clicks,
    conversions: acc.conversions + link.analytics.conversions,
    revenue: acc.revenue + link.analytics.revenue
  }), { views: 0, clicks: 0, conversions: 0, revenue: 0 });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'affiliate': return <ShoppingBag className="w-5 h-5" />;
      case 'tiktok': return <Video className="w-5 h-5" />;
      case 'template': return <Zap className="w-5 h-5" />;
      case 'ai-tool': return <Globe className="w-5 h-5" />;
      default: return <Link2 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30';
      case 'paused': return 'bg-gray-700/50 text-gray-400 border-gray-600/30';
      case 'scheduled': return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30';
      default: return 'bg-gray-700/50 text-gray-400 border-gray-600/30';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] via-yellow-400 to-[#d4af37] bg-clip-text text-transparent">
              Link Bio Automation
            </h1>
            <p className="text-gray-400 mt-2">Manage & automate semua link bio kau - sanztech.online</p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setAutomationRunning(!automationRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                automationRunning
                  ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-gray-400'
                  : 'bg-gradient-to-r from-[#d4af37] to-yellow-500 hover:from-yellow-500 hover:to-[#d4af37]'
              }`}
            >
              {automationRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </button>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-yellow-500 hover:from-yellow-500 hover:to-[#d4af37] rounded-xl font-semibold transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Link
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#d4af37]/10 to-yellow-600/5 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-[#d4af37]" />
              <TrendingUp className="w-5 h-5 text-[#d4af37]" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Views</p>
            <p className="text-3xl font-bold text-[#d4af37]">{totalAnalytics.views.toLocaleString()}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#d4af37]/10 to-yellow-600/5 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20">
            <div className="flex items-center justify-between mb-4">
              <MousePointer className="w-8 h-8 text-[#d4af37]" />
              <TrendingUp className="w-5 h-5 text-[#d4af37]" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-[#d4af37]">{totalAnalytics.clicks.toLocaleString()}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#d4af37]/10 to-yellow-600/5 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-[#d4af37]" />
              <TrendingUp className="w-5 h-5 text-[#d4af37]" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Conversions</p>
            <p className="text-3xl font-bold text-[#d4af37]">{totalAnalytics.conversions}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#d4af37]/10 to-yellow-600/5 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-[#d4af37]" />
              <TrendingUp className="w-5 h-5 text-[#d4af37]" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-[#d4af37]">RM {totalAnalytics.revenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Automation Status */}
        <div className="bg-gradient-to-r from-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20 mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${automationRunning ? 'bg-[#d4af37] animate-pulse' : 'bg-gray-600'}`}></div>
            <div className="flex-1">
              <p className="font-semibold text-lg">
                Automation: {automationRunning ? 'Running' : 'Stopped'}
              </p>
              <p className="text-gray-400 text-sm">
                {automationRunning 
                  ? 'Browser automation active - Auto-posting & sharing enabled' 
                  : 'Click Start untuk activate browser automation'
                }
              </p>
            </div>
            {automationRunning && (
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Zap className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-medium">Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {links.map((link) => (
            <div 
              key={link.id}
              className="bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all"
            >
              {/* Link Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37]/20 to-yellow-500/10 rounded-xl flex items-center justify-center text-2xl">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getTypeIcon(link.type)}
                      <span className="text-xs text-gray-400 capitalize">{link.type}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(link.status)}`}>
                  {link.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{link.description}</p>

              {/* URL */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-black/30 rounded-lg">
                <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-300 truncate flex-1">{link.url}</span>
                <button 
                  onClick={() => copyToClipboard(link.url)}
                  className="p-1 hover:bg-[#d4af37]/20 rounded transition-colors"
                >
                  <Copy className="w-4 h-4 text-[#d4af37]" />
                </button>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-[#d4af37]/20 rounded transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#d4af37]" />
                </a>
              </div>

              {/* Schedule Info */}
              {link.schedule.enabled && (
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-gray-400">
                    {link.schedule.frequency} at {link.schedule.time}
                    {link.schedule.days && ` (${link.schedule.days.join(', ')})`}
                  </span>
                </div>
              )}

              {/* Analytics */}
              <div className="grid grid-cols-4 gap-3 mb-4 p-4 bg-black/30 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#d4af37]">{link.analytics.views}</p>
                  <p className="text-xs text-gray-400">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#d4af37]">{link.analytics.clicks}</p>
                  <p className="text-xs text-gray-400">Clicks</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#d4af37]">{link.analytics.conversions}</p>
                  <p className="text-xs text-gray-400">Conv</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#d4af37]">RM{link.analytics.revenue}</p>
                  <p className="text-xs text-gray-400">Revenue</p>
                </div>
              </div>

              {/* Automation Status */}
              {link.automation.autoPost && (
                <div className="flex items-center gap-2 mb-4 p-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
                  <Zap className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs text-[#d4af37]">Auto-posting enabled</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] rounded-lg font-medium transition-all">
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 text-gray-400 rounded-lg font-medium transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
