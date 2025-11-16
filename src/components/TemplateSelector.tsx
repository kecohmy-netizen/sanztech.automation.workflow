// Template Selector - Choose from pre-built workflow templates

import { useState } from 'react';
import { X, Search, Zap, TrendingUp, Filter } from 'lucide-react';
import { workflowTemplates, WorkflowTemplate } from '@/data/workflowTemplates';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TemplateSelectorProps {
  onSelect: (template: WorkflowTemplate) => void;
  onClose: () => void;
}

export function TemplateSelector({ onSelect, onClose }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Templates', icon: Zap },
    { id: 'social-media', name: 'Social Media', icon: TrendingUp },
    { id: 'automation', name: 'Automation', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: Filter },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp },
  ];

  const filteredTemplates = workflowTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[85vh] bg-gradient-to-b from-gray-900 to-black border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Workflow Templates</h2>
              <p className="text-sm text-gray-400 mt-1">
                Start with a pre-built template and customize it
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 py-4 border-b border-gray-800 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#d4af37] text-black font-semibold'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
              <p className="text-gray-400">
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-[#d4af37] transition-all cursor-pointer group"
                  onClick={() => onSelect(template)}
                >
                  <div className="p-6">
                    {/* Icon & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{template.icon}</div>
                      <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded capitalize">
                        {template.category.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-[#d4af37]/10 text-[#d4af37] rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {template.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">
                          +{template.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {template.nodes.length} nodes
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {template.edges.length} connections
                      </div>
                    </div>

                    {/* Hover Action */}
                    <div className="mt-4 pt-4 border-t border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}{' '}
            available
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-700 text-gray-300"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
