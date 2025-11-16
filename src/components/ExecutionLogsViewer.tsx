// Execution Logs Viewer - View workflow execution logs in real-time

import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Clock, Play, Download, RefreshCw } from 'lucide-react';
import { WorkflowExecution, ExecutionLog } from '@/services/workflowEngine';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExecutionLogsViewerProps {
  execution: WorkflowExecution | null;
  onClose: () => void;
  onRetry?: () => void;
}

export function ExecutionLogsViewer({
  execution,
  onClose,
  onRetry,
}: ExecutionLogsViewerProps) {
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && execution) {
      // Auto-scroll to bottom when new logs arrive
      const logsContainer = document.getElementById('logs-container');
      if (logsContainer) {
        logsContainer.scrollTop = logsContainer.scrollHeight;
      }
    }
  }, [execution?.logs, autoScroll]);

  if (!execution) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'started':
        return <Play className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      case 'paused':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatDuration = () => {
    if (!execution.startedAt) return '0s';
    
    const end = execution.completedAt || new Date();
    const duration = end.getTime() - execution.startedAt.getTime();
    
    if (duration < 1000) return `${duration}ms`;
    if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
    return `${(duration / 60000).toFixed(1)}m`;
  };

  const exportLogs = () => {
    const logsText = execution.logs
      .map(
        log =>
          `[${log.timestamp.toISOString()}] ${log.status.toUpperCase()} - ${log.nodeName}: ${log.message}`
      )
      .join('\n');

    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-execution-${execution.id}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-gradient-to-b from-gray-900 to-black border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Execution Logs</h2>
              <p className="text-sm text-gray-400 mt-1">
                Execution ID: <span className="font-mono">{execution.id}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Status</div>
              <div className={`text-lg font-bold capitalize ${getStatusColor(execution.status)}`}>
                {execution.status}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Duration</div>
              <div className="text-lg font-bold text-white">{formatDuration()}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Steps</div>
              <div className="text-lg font-bold text-white">{execution.logs.length}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Started</div>
              <div className="text-sm font-medium text-white">
                {execution.startedAt.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Logs Container */}
        <div
          id="logs-container"
          className="flex-1 overflow-y-auto p-6 space-y-2 font-mono text-sm"
        >
          {execution.logs.map((log, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                log.status === 'failed'
                  ? 'bg-red-500/10 border-red-500/30'
                  : log.status === 'completed'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-gray-800/50 border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-xs">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                    <span className="text-[#d4af37] font-semibold">{log.nodeName}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        log.status === 'failed'
                          ? 'bg-red-500/20 text-red-400'
                          : log.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                  <div className="text-white">{log.message}</div>
                  
                  {log.error && (
                    <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs">
                      Error: {log.error}
                    </div>
                  )}
                  
                  {log.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">
                        View data
                      </summary>
                      <pre className="mt-2 p-2 bg-black/50 rounded text-xs text-gray-300 overflow-x-auto">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}

          {execution.status === 'running' && (
            <div className="flex items-center gap-2 text-blue-500 p-3">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Workflow is running...</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="auto-scroll"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-gray-800"
            />
            <label htmlFor="auto-scroll" className="text-sm text-gray-400">
              Auto-scroll
            </label>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={exportLogs}
              variant="outline"
              className="border-gray-700 text-gray-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>

            {execution.status === 'failed' && onRetry && (
              <Button
                onClick={onRetry}
                className="bg-[#d4af37] hover:bg-[#b8941f] text-black"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Workflow
              </Button>
            )}

            {execution.status === 'completed' && (
              <Button
                onClick={onClose}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Done
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
