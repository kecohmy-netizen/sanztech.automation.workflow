// Node Library Panel - Searchable, categorized node library

import { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { nodeLibrary, nodeCategories, NodeDefinition } from '@/data/nodeLibrary';
import { Card } from '@/components/ui/card';

interface NodeLibraryPanelProps {
  onNodeDragStart: (event: React.DragEvent, nodeType: string, nodeData: any) => void;
}

export function NodeLibraryPanel({ onNodeDragStart }: NodeLibraryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(nodeCategories)
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredNodes = nodeLibrary.filter(
    (node) =>
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nodesByCategory = nodeCategories.map((category) => ({
    category,
    nodes: filteredNodes.filter((node) => node.category === category),
  }));

  const onDragStart = (event: React.DragEvent, node: NodeDefinition) => {
    const nodeData = {
      label: node.name,
      description: node.description,
      nodeType: node.nodeType,
      icon: node.icon,
      color: node.color,
    };
    
    onNodeDragStart(event, node.type, nodeData);
  };

  return (
    <div className="w-80 h-full bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-bold text-white mb-3">Node Library</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      {/* Node Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {nodesByCategory.map(({ category, nodes }) => {
          if (nodes.length === 0) return null;

          const isExpanded = expandedCategories.has(category);

          return (
            <div key={category}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white">
                  {category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{nodes.length}</span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Nodes */}
              {isExpanded && (
                <div className="mt-1 space-y-1 ml-2">
                  {nodes.map((node) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, node)}
                        className="p-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-[#d4af37]/50 rounded-lg cursor-move transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${node.color}20` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: node.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                              {node.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                              {node.description}
                            </div>
                            
                            {/* Type Badge */}
                            <div className="mt-2">
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  node.type === 'trigger'
                                    ? 'bg-[#d4af37]/20 text-[#d4af37]'
                                    : node.type === 'condition'
                                    ? 'bg-purple-500/20 text-purple-400'
                                    : 'bg-blue-500/20 text-blue-400'
                                }`}
                              >
                                {node.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredNodes.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-white mb-2">No nodes found</h3>
            <p className="text-sm text-gray-400">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400 text-center">
          💡 Drag and drop nodes onto the canvas
        </div>
      </div>
    </div>
  );
}
