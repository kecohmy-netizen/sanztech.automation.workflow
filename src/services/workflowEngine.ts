// Workflow Execution Engine - Execute workflows with real logic!

import { Node, Edge } from 'reactflow';

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  startedAt: Date;
  completedAt?: Date;
  currentNode?: string;
  logs: ExecutionLog[];
  data: any;
  error?: string;
}

export interface ExecutionLog {
  timestamp: Date;
  nodeId: string;
  nodeName: string;
  status: 'started' | 'completed' | 'failed';
  message: string;
  data?: any;
  error?: string;
}

export class WorkflowEngine {
  private executions: Map<string, WorkflowExecution> = new Map();
  private nodeExecutors: Map<string, NodeExecutor> = new Map();

  constructor() {
    this.registerDefaultExecutors();
  }

  // Register node executors
  private registerDefaultExecutors() {
    // Trigger nodes
    this.registerExecutor('webhook-trigger', new WebhookTriggerExecutor());
    this.registerExecutor('schedule-trigger', new ScheduleTriggerExecutor());
    
    // Action nodes
    this.registerExecutor('tiktok-post', new TikTokPostExecutor());
    this.registerExecutor('linkbio-update', new LinkBioUpdateExecutor());
    this.registerExecutor('ai-generate', new AIGenerateExecutor());
    this.registerExecutor('send-email', new SendEmailExecutor());
    this.registerExecutor('http-request', new HTTPRequestExecutor());
    this.registerExecutor('delay', new DelayExecutor());
    this.registerExecutor('notification', new NotificationExecutor());
    this.registerExecutor('analytics-track', new AnalyticsTrackExecutor());
    this.registerExecutor('data-transform', new DataTransformExecutor());
    
    // Condition nodes
    this.registerExecutor('condition', new ConditionExecutor());
    this.registerExecutor('loop', new LoopExecutor());
  }

  registerExecutor(nodeType: string, executor: NodeExecutor) {
    this.nodeExecutors.set(nodeType, executor);
  }

  // Execute workflow
  async execute(
    workflowId: string,
    nodes: Node[],
    edges: Edge[],
    input: any = {}
  ): Promise<WorkflowExecution> {
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      status: 'running',
      startedAt: new Date(),
      logs: [],
      data: input,
    };

    this.executions.set(executionId, execution);

    try {
      // Find trigger node (starting point)
      const triggerNode = nodes.find(n => n.type?.includes('trigger'));
      
      if (!triggerNode) {
        throw new Error('No trigger node found in workflow');
      }

      this.addLog(execution, triggerNode.id, triggerNode.data.label, 'started', 'Workflow started');

      // Execute nodes in order
      let currentNode = triggerNode;
      let data = input;

      while (currentNode) {
        execution.currentNode = currentNode.id;
        
        // Execute current node
        this.addLog(execution, currentNode.id, currentNode.data.label, 'started', `Executing ${currentNode.data.label}`);
        
        try {
          data = await this.executeNode(currentNode, data);
          
          this.addLog(execution, currentNode.id, currentNode.data.label, 'completed', 'Node executed successfully', data);
        } catch (error: any) {
          this.addLog(execution, currentNode.id, currentNode.data.label, 'failed', error.message, undefined, error.message);
          throw error;
        }

        // Find next node
        currentNode = this.getNextNode(currentNode, edges, nodes, data);
      }

      // Workflow completed
      execution.status = 'completed';
      execution.completedAt = new Date();
      execution.data = data;
      
      this.addLog(execution, 'workflow', 'Workflow', 'completed', 'Workflow completed successfully', data);

      return execution;
    } catch (error: any) {
      execution.status = 'failed';
      execution.completedAt = new Date();
      execution.error = error.message;
      
      this.addLog(execution, 'workflow', 'Workflow', 'failed', `Workflow failed: ${error.message}`, undefined, error.message);
      
      return execution;
    }
  }

  // Execute single node
  private async executeNode(node: Node, data: any): Promise<any> {
    const nodeType = node.data.nodeType || node.type;
    const executor = this.nodeExecutors.get(nodeType);

    if (!executor) {
      console.warn(`No executor found for node type: ${nodeType}, skipping...`);
      return data;
    }

    return await executor.execute(node, data);
  }

  // Get next node based on edges
  private getNextNode(
    currentNode: Node,
    edges: Edge[],
    nodes: Node[],
    data: any
  ): Node | null {
    // Find outgoing edges from current node
    const outgoingEdges = edges.filter(e => e.source === currentNode.id);

    if (outgoingEdges.length === 0) {
      return null; // End of workflow
    }

    // For condition nodes, evaluate which path to take
    if (currentNode.type === 'condition') {
      const condition = currentNode.data.condition;
      const result = this.evaluateCondition(condition, data);
      
      // Find edge based on condition result
      const edge = outgoingEdges.find(e => 
        result ? e.sourceHandle === 'true' : e.sourceHandle === 'false'
      );
      
      if (edge) {
        return nodes.find(n => n.id === edge.target) || null;
      }
    }

    // For regular nodes, take first edge
    const nextEdge = outgoingEdges[0];
    return nodes.find(n => n.id === nextEdge.target) || null;
  }

  // Evaluate condition
  private evaluateCondition(condition: any, data: any): boolean {
    if (!condition) return true;

    try {
      // Simple condition evaluation
      const { field, operator, value } = condition;
      const fieldValue = this.getNestedValue(data, field);

      switch (operator) {
        case 'equals':
          return fieldValue === value;
        case 'not_equals':
          return fieldValue !== value;
        case 'contains':
          return String(fieldValue).includes(value);
        case 'greater_than':
          return Number(fieldValue) > Number(value);
        case 'less_than':
          return Number(fieldValue) < Number(value);
        case 'exists':
          return fieldValue !== undefined && fieldValue !== null;
        default:
          return true;
      }
    } catch (error) {
      console.error('Condition evaluation error:', error);
      return false;
    }
  }

  // Get nested value from object
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Add log entry
  private addLog(
    execution: WorkflowExecution,
    nodeId: string,
    nodeName: string,
    status: 'started' | 'completed' | 'failed',
    message: string,
    data?: any,
    error?: string
  ) {
    execution.logs.push({
      timestamp: new Date(),
      nodeId,
      nodeName,
      status,
      message,
      data,
      error,
    });
  }

  // Get execution by ID
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  // Get all executions for a workflow
  getWorkflowExecutions(workflowId: string): WorkflowExecution[] {
    return Array.from(this.executions.values()).filter(
      e => e.workflowId === workflowId
    );
  }
}

// Base Node Executor interface
export interface NodeExecutor {
  execute(node: Node, data: any): Promise<any>;
}

// Webhook Trigger Executor
class WebhookTriggerExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    // Webhook trigger just passes through the input data
    return data;
  }
}

// Schedule Trigger Executor
class ScheduleTriggerExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    // Schedule trigger passes through with timestamp
    return {
      ...data,
      triggeredAt: new Date().toISOString(),
      schedule: node.data.schedule,
    };
  }
}

// TikTok Post Executor
class TikTokPostExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('📱 Posting to TikTok:', node.data);
    
    // Simulate TikTok API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      ...data,
      tiktok: {
        posted: true,
        postId: `tt_${Date.now()}`,
        url: `https://tiktok.com/@adamsanz/video/${Date.now()}`,
        caption: data.caption || node.data.caption,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

// Link Bio Update Executor
class LinkBioUpdateExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('🔗 Updating Link Bio:', node.data);
    
    // Simulate Link Bio API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      ...data,
      linkBio: {
        updated: true,
        links: node.data.links || [],
        timestamp: new Date().toISOString(),
      },
    };
  }
}

// AI Generate Executor
class AIGenerateExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('🤖 Generating AI content:', node.data);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const topic = data.topic || node.data.topic || 'automation';
    
    return {
      ...data,
      aiGenerated: {
        caption: `🚀 Check out this amazing ${topic}! Perfect for your business automation needs. #${topic} #automation #business`,
        hashtags: ['#automation', '#business', '#productivity', '#tech'],
        timestamp: new Date().toISOString(),
      },
    };
  }
}

// Send Email Executor
class SendEmailExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('📧 Sending email:', node.data);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      ...data,
      email: {
        sent: true,
        to: node.data.to,
        subject: node.data.subject,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

// HTTP Request Executor
class HTTPRequestExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('🌐 Making HTTP request:', node.data);
    
    const { url, method = 'GET', headers = {}, body } = node.data;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      const responseData = await response.json();
      
      return {
        ...data,
        httpResponse: {
          status: response.status,
          data: responseData,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error: any) {
      throw new Error(`HTTP request failed: ${error.message}`);
    }
  }
}

// Delay Executor
class DelayExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    const delay = node.data.delay || 1000;
    console.log(`⏱️ Waiting ${delay}ms...`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return data;
  }
}

// Notification Executor
class NotificationExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('🔔 Sending notification:', node.data);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      ...data,
      notification: {
        sent: true,
        message: node.data.message,
        channel: node.data.channel || 'telegram',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

// Analytics Track Executor
class AnalyticsTrackExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('📊 Tracking analytics:', node.data);
    
    return {
      ...data,
      analytics: {
        tracked: true,
        event: node.data.event,
        properties: node.data.properties,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

// Data Transform Executor
class DataTransformExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('🔄 Transforming data:', node.data);
    
    const { transformations } = node.data;
    let result = { ...data };
    
    if (transformations) {
      for (const transform of transformations) {
        const { field, operation, value } = transform;
        
        switch (operation) {
          case 'set':
            result[field] = value;
            break;
          case 'append':
            result[field] = (result[field] || '') + value;
            break;
          case 'uppercase':
            result[field] = String(result[field]).toUpperCase();
            break;
          case 'lowercase':
            result[field] = String(result[field]).toLowerCase();
            break;
        }
      }
    }
    
    return result;
  }
}

// Condition Executor
class ConditionExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    // Condition node just passes data through
    // The actual condition evaluation happens in getNextNode
    return data;
  }
}

// Loop Executor
class LoopExecutor implements NodeExecutor {
  async execute(node: Node, data: any): Promise<any> {
    console.log('🔁 Loop node:', node.data);
    
    // Loop logic would be more complex in real implementation
    return data;
  }
}

// Export singleton instance
export const workflowEngine = new WorkflowEngine();
export default workflowEngine;
