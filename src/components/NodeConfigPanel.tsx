// Node Configuration Panel - Configure node settings

import { useState, useEffect } from 'react';
import { X, Save, Play, Trash2 } from 'lucide-react';
import { Node } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getNodeById, NodeConfig } from '@/data/nodeLibrary';

interface NodeConfigPanelProps {
  node: Node | null;
  onClose: () => void;
  onSave: (nodeId: string, config: any) => void;
  onDelete: (nodeId: string) => void;
  onTest?: (nodeId: string) => void;
}

export function NodeConfigPanel({
  node,
  onClose,
  onSave,
  onDelete,
  onTest,
}: NodeConfigPanelProps) {
  const [config, setConfig] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (node) {
      setConfig(node.data || {});
      setErrors({});
    }
  }, [node]);

  if (!node) return null;

  const nodeDefinition = getNodeById(node.data.nodeType || node.type);

  const handleChange = (key: string, value: any) => {
    setConfig((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (nodeDefinition?.config) {
      nodeDefinition.config.forEach((field: NodeConfig) => {
        if (field.required && !config[field.key]) {
          newErrors[field.key] = `${field.label} is required`;
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(node.id, config);
      onClose();
    }
  };

  const handleTest = () => {
    if (validate() && onTest) {
      onTest(node.id);
    }
  };

  const renderField = (field: NodeConfig) => {
    const value = config[field.key] ?? field.defaultValue ?? '';
    const error = errors[field.key];

    switch (field.type) {
      case 'text':
      case 'url':
      case 'email':
      case 'cron':
        return (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-white">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type === 'url' || field.type === 'email' ? field.type : 'text'}
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
            />
            {field.description && (
              <p className="text-xs text-gray-400">{field.description}</p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-white">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] resize-none"
            />
            {field.description && (
              <p className="text-xs text-gray-400">{field.description}</p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        );

      case 'number':
        return (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-white">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(field.key, Number(e.target.value))}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
            />
            {field.description && (
              <p className="text-xs text-gray-400">{field.description}</p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-white">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {field.description && (
              <p className="text-xs text-gray-400">{field.description}</p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(field.key, e.target.checked)}
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-[#d4af37]"
            />
            <label className="text-sm font-medium text-white">
              {field.label}
            </label>
            {field.description && (
              <p className="text-xs text-gray-400 ml-6">{field.description}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 shadow-2xl z-50 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{node.data.label}</h2>
            <p className="text-sm text-gray-400">{node.data.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Node Info */}
        <Card className="p-4 bg-gray-800/50 border-gray-700">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Node ID:</span>
              <span className="text-white font-mono text-xs">{node.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className="text-white capitalize">{node.type}</span>
            </div>
            {nodeDefinition && (
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">{nodeDefinition.category}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Configuration Fields */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Configuration</h3>
          
          {nodeDefinition?.config && nodeDefinition.config.length > 0 ? (
            nodeDefinition.config.map((field) => renderField(field))
          ) : (
            <p className="text-sm text-gray-400">No configuration needed for this node.</p>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4 border-t border-gray-800">
          <Button
            onClick={handleSave}
            className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>

          {onTest && (
            <Button
              onClick={handleTest}
              variant="outline"
              className="w-full border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10"
            >
              <Play className="w-4 h-4 mr-2" />
              Test Node
            </Button>
          )}

          <Button
            onClick={() => {
              if (confirm('Are you sure you want to delete this node?')) {
                onDelete(node.id);
                onClose();
              }
            }}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Node
          </Button>
        </div>

        {/* Outputs Info */}
        {nodeDefinition?.outputs && nodeDefinition.outputs.length > 0 && (
          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <h4 className="text-sm font-semibold text-white mb-2">Outputs</h4>
            <div className="space-y-1">
              {nodeDefinition.outputs.map((output) => (
                <div key={output} className="text-xs text-gray-400 font-mono">
                  • {output}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
