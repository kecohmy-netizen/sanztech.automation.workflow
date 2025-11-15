import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  useNodesState,
  useEdgesState,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Save, 
  Share,
  Trash2,
  Zap,
  Database,
  Mail,
  MessageSquare,
  FileText,
  Code,
  GitBranch,
  Clock,
  Filter,
  Menu,
  Download,
  Upload
} from 'lucide-react';

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
};

function TriggerNode({ data }: any) {
  return (
    <div className="px-3 md:px-4 py-2 md:py-3 shadow-lg rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8941f] border-2 border-[#d4af37] min-w-[140px] md:min-w-[180px]">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 md:w-5 md:h-5 text-black" />
        <div className="font-bold text-black text-sm md:text-base">{data.label}</div>
      </div>
      <div className="text-xs text-black/70 mt-1">{data.description}</div>
    </div>
  );
}

function ActionNode({ data }: any) {
  return (
    <div className="px-3 md:px-4 py-2 md:py-3 shadow-lg rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#d4af37]/50 min-w-[140px] md:min-w-[180px]">
      <div className="flex items-center gap-2">
        {data.icon}
        <div className="font-bold text-white text-sm md:text-base">{data.label}</div>
      </div>
      <div className="text-xs text-gray-400 mt-1">{data.description}</div>
    </div>
  );
}

function ConditionNode({ data }: any) {
  return (
    <div className="px-3 md:px-4 py-2 md:py-3 shadow-lg rounded-lg bg-gradient-to-br from-gray-900 to-black border-2 border-[#d4af37] min-w-[140px] md:min-w-[180px]">
      <div className="flex items-center gap-2">
        <GitBranch className="w-4 h-4 md:w-5 md:h-5 text-white" />
        <div className="font-bold text-white text-sm md:text-base">{data.label}</div>
      </div>
      <div className="text-xs text-gray-400 mt-1">{data.description}</div>
    </div>
  );
}

const availableNodes = [
  {
    type: 'trigger',
    label: 'Webhook Trigger',
    description: 'Start on webhook',
    icon: <Zap className="w-4 h-4" />
  },
  {
    type: 'trigger',
    label: 'Schedule Trigger',
    description: 'Run on schedule',
    icon: <Clock className="w-4 h-4" />
  },
  {
    type: 'action',
    label: 'Send Email',
    description: 'Send email notification',
    icon: <Mail className="w-4 h-4 text-[#d4af37]" />
  },
  {
    type: 'action',
    label: 'Database Query',
    description: 'Query database',
    icon: <Database className="w-4 h-4 text-[#d4af37]" />
  },
  {
    type: 'action',
    label: 'API Request',
    description: 'Make HTTP request',
    icon: <Code className="w-4 h-4 text-[#d4af37]" />
  },
  {
    type: 'action',
    label: 'Send Message',
    description: 'Send chat message',
    icon: <MessageSquare className="w-4 h-4 text-[#d4af37]" />
  },
  {
    type: 'action',
    label: 'Generate Document',
    description: 'Create document',
    icon: <FileText className="w-4 h-4 text-[#d4af37]" />
  },
  {
    type: 'action',
    label: 'TikTok Autopost',
    description: 'Auto-post affiliate links',
    icon: <Share className="w-4 h-4 text-[#d4af37]" />
  },
  {
    type: 'condition',
    label: 'If/Else',
    description: 'Conditional logic',
    icon: <Filter className="w-4 h-4" />
  },
];

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { 
      label: 'Webhook Trigger', 
      description: 'Start workflow',
      status: 'pending'
    },
  },
];

const initialEdges: Edge[] = [];

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Load workflow from localStorage on component mount
  useEffect(() => {
    const savedWorkflow = localStorage.getItem('sanztech-workflow');
    if (savedWorkflow) {
      try {
        const workflow = JSON.parse(savedWorkflow);
        if (workflow.nodes && workflow.edges) {
          setNodes(workflow.nodes);
          setEdges(workflow.edges);
          
          // Calculate next node ID
          const maxId = Math.max(...workflow.nodes.map((node: Node) => parseInt(node.id)).filter(id => !isNaN(id)));
          setNodeIdCounter(isFinite(maxId) ? maxId + 1 : 2);
        }
      } catch (error) {
        console.error('Error loading saved workflow:', error);
      }
    }
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (nodeTemplate: any) => {
    const newNode: Node = {
      id: `${nodeIdCounter}`,
      type: nodeTemplate.type,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 150 },
      data: { 
        label: nodeTemplate.label, 
        description: nodeTemplate.description,
        icon: nodeTemplate.icon,
        status: 'pending'
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter(nodeIdCounter + 1);
    setSidebarOpen(false);
  };

  const clearWorkflow = () => {
    setNodes(initialNodes);
    setEdges([]);
    setNodeIdCounter(2);
    localStorage.removeItem('sanztech-workflow');
  };

  const saveWorkflow = () => {
    const workflow = { nodes, edges };
    localStorage.setItem('sanztech-workflow', JSON.stringify(workflow));
    
    // Create downloadable JSON file
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    alert('Workflow saved successfully! You can also export it as JSON file.');
  };

  const exportWorkflow = () => {
    const workflow = { nodes, edges };
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importWorkflow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workflow = JSON.parse(e.target?.result as string);
          if (workflow.nodes && workflow.edges) {
            setNodes(workflow.nodes);
            setEdges(workflow.edges);
            
            // Calculate next node ID
            const maxId = Math.max(...workflow.nodes.map((node: Node) => parseInt(node.id)).filter(id => !isNaN(id)));
            setNodeIdCounter(isFinite(maxId) ? maxId + 1 : 2);
            
            // Save to localStorage
            localStorage.setItem('sanztech-workflow', JSON.stringify(workflow));
            alert('Workflow imported successfully!');
          } else {
            alert('Invalid workflow file format!');
          }
        } catch (error) {
          alert('Error importing workflow file!');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = '';
  };

  const runWorkflow = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    console.log('Running workflow with nodes:', nodes);
    
    // Reset all node statuses
    setNodes(nds => nds.map(n => ({
      ...n, 
      data: { ...n.data, status: 'pending' }
    })));
    
    // Simulate workflow execution with progress
    const steps = nodes.filter(node => node.type !== 'trigger');
    let progress = 0;
    
    for (const step of steps) {
      progress += 100 / steps.length;
      console.log(`Executing: ${step.data.label} - ${Math.round(progress)}% complete`);
      
      // Update node status to running
      setNodes(nds => nds.map(n => 
        n.id === step.id 
          ? { ...n, data: { ...n.data, status: 'running' } }
          : n
      ));
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update node status to completed
      setNodes(nds => nds.map(n => 
        n.id === step.id 
          ? { ...n, data: { ...n.data, status: 'completed' } }
          : n
      ));
    }
    
    setIsRunning(false);
    alert(`Workflow execution completed! ${steps.length} steps processed.`);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#d4af37] hover:bg-[#b8941f] text-black"
        size="icon"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar - Node Palette */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative w-64 bg-black/40 backdrop-blur-xl border-r border-[#d4af37]/20 p-4 overflow-y-auto h-full z-40 transition-transform duration-300`}>
        <h3 className="text-base md:text-lg font-bold text-[#d4af37] mb-4">Workflow Nodes</h3>
        
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-400 mb-2">TRIGGERS</div>
          {availableNodes.filter(n => n.type === 'trigger').map((node, idx) => (
            <Card
              key={idx}
              className="p-3 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/30 cursor-pointer hover:border-[#d4af37] transition-all active:scale-95"
              onClick={() => addNode(node)}
            >
              <div className="flex items-center gap-2 text-white text-sm">
                {node.icon}
                <span>{node.label}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{node.description}</div>
            </Card>
          ))}

          <div className="text-xs font-semibold text-gray-400 mb-2 mt-4">ACTIONS</div>
          {availableNodes.filter(n => n.type === 'action').map((node, idx) => (
            <Card
              key={idx}
              className="p-3 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/30 cursor-pointer hover:border-[#d4af37] transition-all active:scale-95"
              onClick={() => addNode(node)}
            >
              <div className="flex items-center gap-2 text-white text-sm">
                {node.icon}
                <span>{node.label}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{node.description}</div>
            </Card>
          ))}

          <div className="text-xs font-semibold text-gray-400 mb-2 mt-4">LOGIC</div>
          {availableNodes.filter(n => n.type === 'condition').map((node, idx) => (
            <Card
              key={idx}
              className="p-3 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/30 cursor-pointer hover:border-[#d4af37] transition-all active:scale-95"
              onClick={() => addNode(node)}
            >
              <div className="flex items-center gap-2 text-white text-sm">
                {node.icon}
                <span>{node.label}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{node.description}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-[#d4af37]/20 p-3 md:p-4 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-white ml-12 md:ml-0">Workflow Builder</h2>
          <div className="flex gap-1 md:gap-2">
            <Button
              onClick={runWorkflow}
              disabled={isRunning}
              className="bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold text-xs md:text-sm px-2 md:px-4 disabled:opacity-50"
              size="sm"
            >
              <Play className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">{isRunning ? 'Running...' : 'Run'}</span>
            </Button>
            <Button
              onClick={saveWorkflow}
              className="bg-[#d4af37] hover:bg-yellow-500 text-black text-xs md:text-sm px-2 md:px-4"
              size="sm"
            >
              <Save className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">Save</span>
            </Button>
            <Button
              onClick={exportWorkflow}
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 text-xs md:text-sm px-2 md:px-4"
              size="sm"
            >
              <Download className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">Export</span>
            </Button>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={importWorkflow}
                className="hidden"
              />
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 text-xs md:text-sm px-2 md:px-4"
                size="sm"
                asChild
              >
                <span>
                  <Upload className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
                  <span className="hidden md:inline">Import</span>
                </span>
              </Button>
            </label>
            <Button
              onClick={clearWorkflow}
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-700/10 text-xs md:text-sm px-2 md:px-4"
              size="sm"
            >
              <Trash2 className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">Clear</span>
            </Button>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="bg-[#0a0a0a] touch-none"
          >
            <Background color="#d4af37" gap={16} size={1} />
            <Controls className="bg-[#1a1a1a] border-[#d4af37]/20" />
            <MiniMap 
              className="bg-[#1a1a1a] border border-[#d4af37]/20 hidden md:block"
              nodeColor="#d4af37"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}