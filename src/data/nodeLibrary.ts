// Complete Node Library - All available node types

import {
  Zap,
  Clock,
  Mail,
  MessageSquare,
  Database,
  Code,
  GitBranch,
  Repeat,
  Bell,
  BarChart,
  Link,
  Smartphone,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Globe,
  Timer,
  Filter,
  Shuffle,
  FileText,
  Image,
  Video,
  Music,
} from 'lucide-react';

export interface NodeDefinition {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  category: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  nodeType: string;
  config: NodeConfig[];
  outputs?: string[];
}

export interface NodeConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'url' | 'email' | 'cron';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: any;
  description?: string;
}

export const nodeLibrary: NodeDefinition[] = [
  // ============================================
  // TRIGGERS
  // ============================================
  {
    id: 'webhook-trigger',
    type: 'trigger',
    category: 'Triggers',
    name: 'Webhook',
    description: 'Trigger workflow via HTTP webhook',
    icon: Zap,
    color: '#d4af37',
    nodeType: 'webhook-trigger',
    config: [
      {
        key: 'webhookUrl',
        label: 'Webhook URL',
        type: 'url',
        required: true,
        placeholder: 'https://api.example.com/webhook',
        description: 'URL that will trigger this workflow',
      },
      {
        key: 'method',
        label: 'HTTP Method',
        type: 'select',
        options: [
          { label: 'POST', value: 'POST' },
          { label: 'GET', value: 'GET' },
          { label: 'PUT', value: 'PUT' },
        ],
        defaultValue: 'POST',
      },
    ],
    outputs: ['webhookData'],
  },
  {
    id: 'schedule-trigger',
    type: 'trigger',
    category: 'Triggers',
    name: 'Schedule',
    description: 'Run workflow on a schedule',
    icon: Clock,
    color: '#d4af37',
    nodeType: 'schedule-trigger',
    config: [
      {
        key: 'schedule',
        label: 'Schedule (Cron)',
        type: 'cron',
        required: true,
        placeholder: '0 10 * * *',
        description: 'Cron expression (e.g., "0 10 * * *" = daily at 10am)',
      },
      {
        key: 'timezone',
        label: 'Timezone',
        type: 'select',
        options: [
          { label: 'Asia/Kuala_Lumpur', value: 'Asia/Kuala_Lumpur' },
          { label: 'UTC', value: 'UTC' },
          { label: 'America/New_York', value: 'America/New_York' },
        ],
        defaultValue: 'Asia/Kuala_Lumpur',
      },
    ],
    outputs: ['timestamp'],
  },

  // ============================================
  // SOCIAL MEDIA ACTIONS
  // ============================================
  {
    id: 'tiktok-post',
    type: 'action',
    category: 'Social Media',
    name: 'TikTok Post',
    description: 'Post video to TikTok',
    icon: Smartphone,
    color: '#00f2ea',
    nodeType: 'tiktok-post',
    config: [
      {
        key: 'videoUrl',
        label: 'Video URL',
        type: 'url',
        required: true,
        placeholder: 'https://storage.com/video.mp4',
      },
      {
        key: 'caption',
        label: 'Caption',
        type: 'textarea',
        required: true,
        placeholder: 'Enter your caption...',
      },
      {
        key: 'hashtags',
        label: 'Hashtags',
        type: 'text',
        placeholder: '#automation #business',
      },
      {
        key: 'privacy',
        label: 'Privacy',
        type: 'select',
        options: [
          { label: 'Public', value: 'public' },
          { label: 'Friends', value: 'friends' },
          { label: 'Private', value: 'private' },
        ],
        defaultValue: 'public',
      },
    ],
    outputs: ['postId', 'postUrl'],
  },
  {
    id: 'instagram-post',
    type: 'action',
    category: 'Social Media',
    name: 'Instagram Post',
    description: 'Post to Instagram',
    icon: Instagram,
    color: '#E4405F',
    nodeType: 'http-request',
    config: [
      {
        key: 'imageUrl',
        label: 'Image URL',
        type: 'url',
        required: true,
      },
      {
        key: 'caption',
        label: 'Caption',
        type: 'textarea',
        required: true,
      },
    ],
    outputs: ['postId'],
  },
  {
    id: 'facebook-post',
    type: 'action',
    category: 'Social Media',
    name: 'Facebook Post',
    description: 'Post to Facebook',
    icon: Facebook,
    color: '#1877F2',
    nodeType: 'http-request',
    config: [
      {
        key: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
      },
      {
        key: 'link',
        label: 'Link (optional)',
        type: 'url',
      },
    ],
    outputs: ['postId'],
  },
  {
    id: 'twitter-post',
    type: 'action',
    category: 'Social Media',
    name: 'Twitter Post',
    description: 'Post tweet to Twitter',
    icon: Twitter,
    color: '#1DA1F2',
    nodeType: 'http-request',
    config: [
      {
        key: 'tweet',
        label: 'Tweet',
        type: 'textarea',
        required: true,
        placeholder: 'What\'s happening?',
      },
    ],
    outputs: ['tweetId'],
  },

  // ============================================
  // AUTOMATION ACTIONS
  // ============================================
  {
    id: 'linkbio-update',
    type: 'action',
    category: 'Automation',
    name: 'Update Link Bio',
    description: 'Update your link bio',
    icon: Link,
    color: '#d4af37',
    nodeType: 'linkbio-update',
    config: [
      {
        key: 'links',
        label: 'Links (JSON)',
        type: 'textarea',
        required: true,
        placeholder: '[{"title": "My Link", "url": "https://..."}]',
      },
    ],
    outputs: ['updated'],
  },
  {
    id: 'ai-generate',
    type: 'action',
    category: 'AI',
    name: 'AI Generate Content',
    description: 'Generate content with AI',
    icon: MessageSquare,
    color: '#8B5CF6',
    nodeType: 'ai-generate',
    config: [
      {
        key: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        required: true,
        placeholder: 'Generate a TikTok caption about...',
      },
      {
        key: 'style',
        label: 'Style',
        type: 'select',
        options: [
          { label: 'Casual', value: 'casual' },
          { label: 'Professional', value: 'professional' },
          { label: 'Funny', value: 'funny' },
          { label: 'Inspiring', value: 'inspiring' },
        ],
        defaultValue: 'casual',
      },
    ],
    outputs: ['generatedText', 'hashtags'],
  },
  {
    id: 'delay',
    type: 'action',
    category: 'Utilities',
    name: 'Delay',
    description: 'Wait for specified time',
    icon: Timer,
    color: '#6B7280',
    nodeType: 'delay',
    config: [
      {
        key: 'delay',
        label: 'Delay (milliseconds)',
        type: 'number',
        required: true,
        defaultValue: 1000,
        description: '1000ms = 1 second',
      },
    ],
    outputs: [],
  },

  // ============================================
  // COMMUNICATION ACTIONS
  // ============================================
  {
    id: 'send-email',
    type: 'action',
    category: 'Communication',
    name: 'Send Email',
    description: 'Send email notification',
    icon: Mail,
    color: '#EF4444',
    nodeType: 'send-email',
    config: [
      {
        key: 'to',
        label: 'To',
        type: 'email',
        required: true,
        placeholder: 'user@example.com',
      },
      {
        key: 'subject',
        label: 'Subject',
        type: 'text',
        required: true,
      },
      {
        key: 'body',
        label: 'Body',
        type: 'textarea',
        required: true,
      },
    ],
    outputs: ['sent'],
  },
  {
    id: 'notification',
    type: 'action',
    category: 'Communication',
    name: 'Send Notification',
    description: 'Send notification via Telegram/WhatsApp',
    icon: Bell,
    color: '#10B981',
    nodeType: 'notification',
    config: [
      {
        key: 'channel',
        label: 'Channel',
        type: 'select',
        options: [
          { label: 'Telegram', value: 'telegram' },
          { label: 'WhatsApp', value: 'whatsapp' },
          { label: 'SMS', value: 'sms' },
        ],
        defaultValue: 'telegram',
      },
      {
        key: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
      },
    ],
    outputs: ['sent'],
  },

  // ============================================
  // DATA ACTIONS
  // ============================================
  {
    id: 'http-request',
    type: 'action',
    category: 'Data',
    name: 'HTTP Request',
    description: 'Make HTTP API call',
    icon: Globe,
    color: '#3B82F6',
    nodeType: 'http-request',
    config: [
      {
        key: 'url',
        label: 'URL',
        type: 'url',
        required: true,
        placeholder: 'https://api.example.com/endpoint',
      },
      {
        key: 'method',
        label: 'Method',
        type: 'select',
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' },
        ],
        defaultValue: 'GET',
      },
      {
        key: 'headers',
        label: 'Headers (JSON)',
        type: 'textarea',
        placeholder: '{"Authorization": "Bearer token"}',
      },
      {
        key: 'body',
        label: 'Body (JSON)',
        type: 'textarea',
        placeholder: '{"key": "value"}',
      },
    ],
    outputs: ['response', 'status'],
  },
  {
    id: 'data-transform',
    type: 'action',
    category: 'Data',
    name: 'Transform Data',
    description: 'Transform and manipulate data',
    icon: Shuffle,
    color: '#8B5CF6',
    nodeType: 'data-transform',
    config: [
      {
        key: 'transformations',
        label: 'Transformations (JSON)',
        type: 'textarea',
        required: true,
        placeholder: '[{"field": "name", "operation": "uppercase"}]',
      },
    ],
    outputs: ['transformedData'],
  },
  {
    id: 'database-query',
    type: 'action',
    category: 'Data',
    name: 'Database Query',
    description: 'Query database',
    icon: Database,
    color: '#059669',
    nodeType: 'http-request',
    config: [
      {
        key: 'query',
        label: 'SQL Query',
        type: 'textarea',
        required: true,
        placeholder: 'SELECT * FROM users WHERE...',
      },
    ],
    outputs: ['results'],
  },

  // ============================================
  // ANALYTICS ACTIONS
  // ============================================
  {
    id: 'analytics-track',
    type: 'action',
    category: 'Analytics',
    name: 'Track Event',
    description: 'Track analytics event',
    icon: BarChart,
    color: '#F59E0B',
    nodeType: 'analytics-track',
    config: [
      {
        key: 'event',
        label: 'Event Name',
        type: 'text',
        required: true,
        placeholder: 'button_clicked',
      },
      {
        key: 'properties',
        label: 'Properties (JSON)',
        type: 'textarea',
        placeholder: '{"button": "signup", "page": "home"}',
      },
    ],
    outputs: ['tracked'],
  },

  // ============================================
  // CONDITION NODES
  // ============================================
  {
    id: 'condition',
    type: 'condition',
    category: 'Logic',
    name: 'Condition',
    description: 'Branch based on condition',
    icon: GitBranch,
    color: '#d4af37',
    nodeType: 'condition',
    config: [
      {
        key: 'field',
        label: 'Field',
        type: 'text',
        required: true,
        placeholder: 'data.status',
      },
      {
        key: 'operator',
        label: 'Operator',
        type: 'select',
        options: [
          { label: 'Equals', value: 'equals' },
          { label: 'Not Equals', value: 'not_equals' },
          { label: 'Contains', value: 'contains' },
          { label: 'Greater Than', value: 'greater_than' },
          { label: 'Less Than', value: 'less_than' },
          { label: 'Exists', value: 'exists' },
        ],
        defaultValue: 'equals',
      },
      {
        key: 'value',
        label: 'Value',
        type: 'text',
        placeholder: 'expected value',
      },
    ],
    outputs: ['true', 'false'],
  },
  {
    id: 'loop',
    type: 'condition',
    category: 'Logic',
    name: 'Loop',
    description: 'Repeat actions for each item',
    icon: Repeat,
    color: '#d4af37',
    nodeType: 'loop',
    config: [
      {
        key: 'items',
        label: 'Items (Array)',
        type: 'text',
        required: true,
        placeholder: 'data.items',
      },
      {
        key: 'maxIterations',
        label: 'Max Iterations',
        type: 'number',
        defaultValue: 100,
      },
    ],
    outputs: ['item', 'index'],
  },
];

// Helper functions
export function getNodesByCategory(category: string): NodeDefinition[] {
  return nodeLibrary.filter(node => node.category === category);
}

export function getNodeById(id: string): NodeDefinition | undefined {
  return nodeLibrary.find(node => node.id === id);
}

export function getNodesByType(type: 'trigger' | 'action' | 'condition'): NodeDefinition[] {
  return nodeLibrary.filter(node => node.type === type);
}

export function searchNodes(query: string): NodeDefinition[] {
  const lowerQuery = query.toLowerCase();
  return nodeLibrary.filter(
    node =>
      node.name.toLowerCase().includes(lowerQuery) ||
      node.description.toLowerCase().includes(lowerQuery) ||
      node.category.toLowerCase().includes(lowerQuery)
  );
}

export const nodeCategories = [
  'Triggers',
  'Social Media',
  'Automation',
  'AI',
  'Communication',
  'Data',
  'Analytics',
  'Logic',
  'Utilities',
];
