import React, { useState } from 'react';
import { 
  Play, 
  Settings, 
  Link, 
  Calendar,
  BarChart3,
  Share,
  Plus,
  Trash2,
  Edit3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AffiliateLink {
  id: string;
  title: string;
  url: string;
  description: string;
  schedule: 'instant' | 'daily' | 'weekly' | 'custom';
  customTime?: string;
  status: 'active' | 'paused';
  lastPosted?: string;
  performance: {
    views: number;
    clicks: number;
    conversions: number;
  };
}

export default function TikTokAutomation() {
  const [links, setLinks] = useState<AffiliateLink[]>([
    {
      id: '1',
      title: 'Tech Gadgets Review',
      url: 'https://example.com/tech-gadgets',
      description: 'Latest tech gadgets and reviews',
      schedule: 'daily',
      status: 'active',
      performance: { views: 1500, clicks: 120, conversions: 15 }
    },
    {
      id: '2',
      title: 'Fashion Deals',
      url: 'https://example.com/fashion-deals',
      description: 'Trendy fashion items on sale',
      schedule: 'weekly',
      status: 'paused',
      performance: { views: 800, clicks: 60, conversions: 8 }
    }
  ]);

  const [newLink, setNewLink] = useState<{
    title: string;
    url: string;
    description: string;
    schedule: 'instant' | 'daily' | 'weekly' | 'custom';
    customTime: string;
  }>({
    title: '',
    url: '',
    description: '',
    schedule: 'daily',
    customTime: ''
  });

  const [isAdding, setIsAdding] = useState(false);
  const [automationStatus, setAutomationStatus] = useState<'running' | 'stopped'>('stopped');

  const addLink = () => {
    if (!newLink.title || !newLink.url) return;

    const link: AffiliateLink = {
      id: Date.now().toString(),
      title: newLink.title,
      url: newLink.url,
      description: newLink.description,
      schedule: newLink.schedule,
      customTime: newLink.customTime,
      status: 'active',
      performance: { views: 0, clicks: 0, conversions: 0 }
    };

    setLinks([...links, link]);
    setNewLink({ title: '', url: '', description: '', schedule: 'daily', customTime: '' });
    setIsAdding(false);
  };

  const toggleLinkStatus = (id: string) => {
    setLinks(links.map(link => 
      link.id === id 
        ? { ...link, status: link.status === 'active' ? 'paused' : 'active' }
        : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const toggleAutomation = () => {
    setAutomationStatus(automationStatus === 'running' ? 'stopped' : 'running');
  };

  const totalPerformance = links.reduce((acc, link) => ({
    views: acc.views + link.performance.views,
    clicks: acc.clicks + link.performance.clicks,
    conversions: acc.conversions + link.performance.conversions
  }), { views: 0, clicks: 0, conversions: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-yellow-400 bg-clip-text text-transparent">
              TikTok Automation
            </h1>
            <p className="text-gray-400 mt-2">Auto-post affiliate links dengan jadwal yang ditentukan</p>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={toggleAutomation}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                automationStatus === 'running'
                  ? 'bg-gray-700 hover:bg-gray-800 text-gray-400'
                  : 'bg-[#d4af37] hover:bg-yellow-500'
              }`}
            >
              {automationStatus === 'running' ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  Stop Automation
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Automation
                </>
              )}
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] hover:bg-yellow-500 rounded-lg font-semibold transition-all">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-black rounded-xl p-6 border border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-[#d4af37]" />
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold">{totalPerformance.views.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black rounded-xl p-6 border border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <Link className="w-8 h-8 text-[#d4af37]" />
              <div>
                <p className="text-gray-400 text-sm">Total Clicks</p>
                <p className="text-2xl font-bold">{totalPerformance.clicks.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black rounded-xl p-6 border border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-[#d4af37]" />
              <div>
                <p className="text-gray-400 text-sm">Conversions</p>
                <p className="text-2xl font-bold">{totalPerformance.conversions.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black rounded-xl p-6 border border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-[#d4af37]" />
              <div>
                <p className="text-gray-400 text-sm">Active Links</p>
                <p className="text-2xl font-bold">
                  {links.filter(link => link.status === 'active').length}/{links.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Link Section */}
        <div className="bg-black rounded-xl p-6 border border-[#d4af37]/30 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Affiliate Links</h2>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] hover:bg-yellow-500 rounded-lg font-semibold transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Link
            </button>
          </div>

          {isAdding && (
            <div className="bg-black rounded-lg p-6 mb-6 border border-[#d4af37]/30">
              <h3 className="text-lg font-semibold mb-4">Add New Affiliate Link</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={newLink.title}
                    onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                    className="w-full bg-black border border-[#d4af37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    placeholder="Enter link title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">URL</label>
                  <input
                    type="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                    className="w-full bg-black border border-[#d4af37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    placeholder="https://example.com/affiliate-link"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    value={newLink.description}
                    onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                    className="w-full bg-black border border-[#d4af37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    placeholder="Description for the affiliate link"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Schedule</label>
                  <select
                    value={newLink.schedule}
                    onChange={(e) => setNewLink({...newLink, schedule: e.target.value as any})}
                    className="w-full bg-black border border-[#d4af37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="instant">Instant Post</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom Time</option>
                  </select>
                </div>
                
                {newLink.schedule === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Custom Time</label>
                    <input
                      type="time"
                      value={newLink.customTime}
                      onChange={(e) => setNewLink({...newLink, customTime: e.target.value})}
                      className="w-full bg-black border border-[#d4af37]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={addLink}
                  className="px-6 py-2 bg-[#d4af37] hover:bg-yellow-500 rounded-lg font-semibold transition-all"
                >
                  Add Link
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Links List */}
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="bg-black rounded-lg p-6 border border-[#d4af37]/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{link.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        link.status === 'active' 
                          ? 'bg-[#d4af37]/20 text-[#d4af37]' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {link.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{link.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Link className="w-4 h-4" />
                        <span className="truncate max-w-xs">{link.url}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{link.schedule}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => toggleLinkStatus(link.id)}
                      className="px-4 py-2 rounded-lg font-medium transition-all bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30"
                    >
                      {link.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                    <button className="p-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 rounded-lg transition-all">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="p-2 bg-gray-700/50 text-gray-400 hover:bg-gray-700/70 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#d4af37]/20">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#d4af37]">{link.performance.views}</p>
                    <p className="text-xs text-gray-400">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#d4af37]">{link.performance.clicks}</p>
                    <p className="text-xs text-gray-400">Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#d4af37]">{link.performance.conversions}</p>
                    <p className="text-xs text-gray-400">Conversions</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Automation */}
        <div className="bg-black rounded-xl p-6 border border-[#d4af37]/30">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${automationStatus === 'running' ? 'bg-[#d4af37] animate-pulse' : 'bg-gray-600'}`}></div>
            <div>
              <p className="font-semibold">
                Automation Status: {automationStatus === 'running' ? 'Running' : 'Stopped'}
              </p>
              <p className="text-gray-400 text-sm">
                {automationStatus === 'running' 
                  ? 'System sedang auto-posting affiliate links sesuai jadwal' 
                  : 'System paused - klik Start Automation untuk memulai'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}