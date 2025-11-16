// Workflow Tester - Test workflows before deploying

import { useState } from 'react';
import { Play, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { workflowEngine, WorkflowExecution } from '@/services/workflowEngine';
import { Node, Edge } from 'reactflow';

interface WorkflowTesterProps {
  nodes: Node[];
  edges: Edge[];
  workflowId: string;
  onClose: () => void;
  onViewLogs: (execution: WorkflowExecution) => void;
}

export function WorkflowTester({
  nodes,
  edges,
  workflowId,
  onClose,
  onViewLogs,
}: WorkflowTesterProps) {
  const [testInput, setTestInput] = useState('{}');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<WorkflowExecution | null>(null);
  const [error, setError] = useState<string>('');

  const handleTest = async () => {
    setIsRunning(true);
    setError('');
    setResult(null);

    try {
      // Parse test input
      let input = {};
      if (testInput.trim()) {
        try {
          input = JSON.parse(testInput);
        } catch (e) {
          throw new Error('Invalid JSON input');
        }
      }

      // Execute workflow
      const execution = await workflowEngine.execute(workflowId, nodes, edges, input);
      setResult(execution);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-gradient-to-b from-gray-900 to-black border-gray-800">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Test Workflow</h2>
              <p className="text-sm text-gray-400 mt-1">
                Run your workflow with test data before deploying
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Test Input */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Test Input (JSON)
              </label>
              <textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder='{"key": "value"}'
                rows={6}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] font-mono text-sm resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                💡 Enter test data that will be passed to the workflow
              </p>
            </div>

            {/* Run Button */}
            <Button
              onClick={handleTest}
              disabled={isRunning}
              className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
            >
              {isRunning ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Running Test...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Test
                </>
              )}
            </Button>
          </div>

          {/* Error */}
          {error && (
            <Card className="p-4 bg-red-500/10 border-red-500/30 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-red-500 mb-1">Test Failed</h3>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Result */}
          {result && (
            <Card className={`p-4 mb-6 ${
              result.status === 'completed'
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-start gap-3">
                {result.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold mb-2 ${
                    result.status === 'completed' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {result.status === 'completed' ? 'Test Passed!' : 'Test Failed'}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Duration:</span>
                      <span className="font-mono">
                        {result.completedAt && result.startedAt
                          ? `${(result.completedAt.getTime() - result.startedAt.getTime())}ms`
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Steps:</span>
                      <span>{result.logs.length}</span>
                    </div>
                    {result.error && (
                      <div className="mt-2 p-2 bg-black/30 rounded text-red-400 text-xs">
                        {result.error}
                      </div>
                    )}
                  </div>

                  {/* View Logs Button */}
                  <Button
                    onClick={() => onViewLogs(result)}
                    variant="outline"
                    className="w-full mt-4 border-gray-700 text-gray-300"
                  >
                    View Detailed Logs
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Info */}
          <div className="text-xs text-gray-400 space-y-2">
            <p>💡 <strong>Tip:</strong> Test your workflow with realistic data</p>
            <p>⚡ <strong>Note:</strong> Test runs don't affect your actual data</p>
            <p>🔍 <strong>Debug:</strong> Check logs to see each step's output</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
