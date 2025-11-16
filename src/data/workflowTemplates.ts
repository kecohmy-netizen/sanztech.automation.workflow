// Pre-built Workflow Templates - Ready to use!

import { Node, Edge } from 'reactflow';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'social-media' | 'analytics' | 'automation' | 'marketing';
  icon: string;
  nodes: Node[];
  edges: Edge[];
  tags: string[];
}

export const workflowTemplates: WorkflowTemplate[] = [
  // Template 1: TikTok Auto-Post
  {
    id: 'tiktok-auto-post',
    name: 'TikTok Auto-Post',
    description: 'Automatically post content to TikTok with AI-generated captions',
    category: 'social-media',
    icon: '📱',
    tags: ['tiktok', 'ai', 'automation', 'social-media'],
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Schedule Trigger',
          description: 'Daily at 10:00 AM',
          nodeType: 'schedule-trigger',
          schedule: '0 10 * * *',
        },
      },
      {
        id: '2',
        type: 'action',
        position: { x: 250, y: 150 },
        data: {
          label: 'AI Generate Caption',
          description: 'Generate engaging caption',
          nodeType: 'ai-generate',
          topic: 'business automation',
        },
      },
      {
        id: '3',
        type: 'action',
        position: { x: 250, y: 250 },
        data: {
          label: 'Post to TikTok',
          description: 'Upload video with caption',
          nodeType: 'tiktok-post',
        },
      },
      {
        id: '4',
        type: 'action',
        position: { x: 250, y: 350 },
        data: {
          label: 'Update Link Bio',
          description: 'Add new post link',
          nodeType: 'linkbio-update',
        },
      },
      {
        id: '5',
        type: 'action',
        position: { x: 250, y: 450 },
        data: {
          label: 'Send Notification',
          description: 'Notify via Telegram',
          nodeType: 'notification',
          channel: 'telegram',
          message: 'TikTok post published successfully!',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // Template 2: Link Bio Sync
  {
    id: 'linkbio-sync',
    name: 'Link Bio Sync',
    description: 'Automatically sync and update your link bio across platforms',
    category: 'automation',
    icon: '🔗',
    tags: ['linkbio', 'sync', 'automation'],
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Webhook Trigger',
          description: 'On link update',
          nodeType: 'webhook-trigger',
        },
      },
      {
        id: '2',
        type: 'condition',
        position: { x: 250, y: 150 },
        data: {
          label: 'Validate Data',
          description: 'Check if data is valid',
          condition: {
            field: 'url',
            operator: 'exists',
          },
        },
      },
      {
        id: '3',
        type: 'action',
        position: { x: 100, y: 250 },
        data: {
          label: 'Update Link Bio',
          description: 'Sync to link bio',
          nodeType: 'linkbio-update',
        },
      },
      {
        id: '4',
        type: 'action',
        position: { x: 400, y: 250 },
        data: {
          label: 'Send Error',
          description: 'Invalid data notification',
          nodeType: 'notification',
          message: 'Link bio update failed: Invalid data',
        },
      },
      {
        id: '5',
        type: 'action',
        position: { x: 100, y: 350 },
        data: {
          label: 'Track Analytics',
          description: 'Log update event',
          nodeType: 'analytics-track',
          event: 'linkbio_updated',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', sourceHandle: 'true' },
      { id: 'e2-4', source: '2', target: '4', sourceHandle: 'false' },
      { id: 'e3-5', source: '3', target: '5' },
    ],
  },

  // Template 3: Analytics Report
  {
    id: 'analytics-report',
    name: 'Daily Analytics Report',
    description: 'Generate and send daily performance reports',
    category: 'analytics',
    icon: '📊',
    tags: ['analytics', 'report', 'automation'],
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Schedule Trigger',
          description: 'Daily at 5:00 PM',
          nodeType: 'schedule-trigger',
          schedule: '0 17 * * *',
        },
      },
      {
        id: '2',
        type: 'action',
        position: { x: 250, y: 150 },
        data: {
          label: 'Fetch Analytics',
          description: 'Get today\'s data',
          nodeType: 'http-request',
          url: '/api/analytics/today',
          method: 'GET',
        },
      },
      {
        id: '3',
        type: 'action',
        position: { x: 250, y: 250 },
        data: {
          label: 'Transform Data',
          description: 'Format report',
          nodeType: 'data-transform',
        },
      },
      {
        id: '4',
        type: 'action',
        position: { x: 250, y: 350 },
        data: {
          label: 'Send to Telegram',
          description: 'Daily report',
          nodeType: 'notification',
          channel: 'telegram',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ],
  },

  // Template 4: Content Distribution
  {
    id: 'content-distribution',
    name: 'Multi-Platform Content Distribution',
    description: 'Post content to multiple social media platforms at once',
    category: 'social-media',
    icon: '🚀',
    tags: ['social-media', 'distribution', 'automation'],
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Webhook Trigger',
          description: 'New content ready',
          nodeType: 'webhook-trigger',
        },
      },
      {
        id: '2',
        type: 'action',
        position: { x: 250, y: 150 },
        data: {
          label: 'AI Optimize Content',
          description: 'Optimize for each platform',
          nodeType: 'ai-generate',
        },
      },
      {
        id: '3',
        type: 'action',
        position: { x: 100, y: 250 },
        data: {
          label: 'Post to TikTok',
          description: 'TikTok version',
          nodeType: 'tiktok-post',
        },
      },
      {
        id: '4',
        type: 'action',
        position: { x: 250, y: 250 },
        data: {
          label: 'Post to Instagram',
          description: 'Instagram version',
          nodeType: 'http-request',
          url: '/api/instagram/post',
        },
      },
      {
        id: '5',
        type: 'action',
        position: { x: 400, y: 250 },
        data: {
          label: 'Post to Facebook',
          description: 'Facebook version',
          nodeType: 'http-request',
          url: '/api/facebook/post',
        },
      },
      {
        id: '6',
        type: 'action',
        position: { x: 250, y: 350 },
        data: {
          label: 'Track Results',
          description: 'Log all posts',
          nodeType: 'analytics-track',
          event: 'content_distributed',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' },
    ],
  },

  // Template 5: Affiliate Link Tracker
  {
    id: 'affiliate-tracker',
    name: 'Affiliate Link Performance Tracker',
    description: 'Track and analyze affiliate link performance',
    category: 'marketing',
    icon: '💰',
    tags: ['affiliate', 'tracking', 'analytics'],
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Schedule Trigger',
          description: 'Every hour',
          nodeType: 'schedule-trigger',
          schedule: '0 * * * *',
        },
      },
      {
        id: '2',
        type: 'action',
        position: { x: 250, y: 150 },
        data: {
          label: 'Fetch Click Data',
          description: 'Get affiliate clicks',
          nodeType: 'http-request',
          url: '/api/affiliate/clicks',
        },
      },
      {
        id: '3',
        type: 'condition',
        position: { x: 250, y: 250 },
        data: {
          label: 'Check Threshold',
          description: 'Revenue > RM 100?',
          condition: {
            field: 'revenue',
            operator: 'greater_than',
            value: 100,
          },
        },
      },
      {
        id: '4',
        type: 'action',
        position: { x: 100, y: 350 },
        data: {
          label: 'Send Alert',
          description: 'High revenue alert!',
          nodeType: 'notification',
          message: '🎉 Affiliate revenue exceeded RM 100!',
        },
      },
      {
        id: '5',
        type: 'action',
        position: { x: 250, y: 450 },
        data: {
          label: 'Update Dashboard',
          description: 'Save to database',
          nodeType: 'analytics-track',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', sourceHandle: 'true' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },

  // Template 6: Social Media Cross-Post
  {
    id: 'social-crosspost',
    name: 'Social Media Cross-Post',
    description: 'Automatically cross-post content across all social platforms',
    category: 'social-media',
    icon: '🌐',
    tags: ['social-media', 'cross-post', 'automation'],
    nodes: [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'New Post Trigger',
          description: 'When new content created',
          nodeType: 'webhook-trigger',
        },
      },
      {
        id: '2',
        type: 'action',
        position: { x: 250, y: 150 },
        data: {
          label: 'AI Adapt Content',
          description: 'Optimize for each platform',
          nodeType: 'ai-generate',
        },
      },
      {
        id: '3',
        type: 'action',
        position: { x: 250, y: 250 },
        data: {
          label: 'Delay 5 minutes',
          description: 'Stagger posts',
          nodeType: 'delay',
          delay: 300000,
        },
      },
      {
        id: '4',
        type: 'action',
        position: { x: 250, y: 350 },
        data: {
          label: 'Post to All Platforms',
          description: 'TikTok, Instagram, Facebook',
          nodeType: 'tiktok-post',
        },
      },
      {
        id: '5',
        type: 'action',
        position: { x: 250, y: 450 },
        data: {
          label: 'Success Notification',
          description: 'All posts published',
          nodeType: 'notification',
          message: '✅ Content posted to all platforms!',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ],
  },
];

// Get template by ID
export function getTemplateById(id: string): WorkflowTemplate | undefined {
  return workflowTemplates.find(t => t.id === id);
}

// Get templates by category
export function getTemplatesByCategory(category: string): WorkflowTemplate[] {
  return workflowTemplates.filter(t => t.category === category);
}

// Get templates by tag
export function getTemplatesByTag(tag: string): WorkflowTemplate[] {
  return workflowTemplates.filter(t => t.tags.includes(tag));
}

// Search templates
export function searchTemplates(query: string): WorkflowTemplate[] {
  const lowerQuery = query.toLowerCase();
  return workflowTemplates.filter(
    t =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some(tag => tag.includes(lowerQuery))
  );
}
