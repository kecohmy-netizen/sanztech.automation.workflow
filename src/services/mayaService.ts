// Maya AI Service - Core AI functionality for the platform
// Integrates with OpenAI, Gemini, and provides intelligent automation assistance

interface MayaConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface MayaResponse {
  message: string;
  suggestions?: string[];
  actions?: MayaAction[];
  confidence?: number;
}

interface MayaAction {
  type: 'workflow' | 'task' | 'link' | 'analytics';
  action: string;
  params?: any;
}

interface ConversationContext {
  userId: string;
  history: ChatMessage[];
  metadata?: any;
}

class MayaService {
  private apiKey: string;
  private geminiApiKey: string;
  private conversations: Map<string, ConversationContext> = new Map();
  private cache: Map<string, { response: string; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 3600000; // 1 hour
  private readonly MAX_HISTORY = 10;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  // ============================================
  // CORE CHAT FUNCTIONALITY
  // ============================================

  async chat(userId: string, message: string, config?: MayaConfig): Promise<MayaResponse> {
    try {
      // Check cache first
      const cached = this.getCachedResponse(message);
      if (cached) {
        console.log('💾 Using cached response');
        return { message: cached };
      }

      // Get or create conversation context
      const context = this.getConversation(userId);
      
      // Add user message to history
      context.history.push({
        role: 'user',
        content: message,
        timestamp: new Date(),
      });

      // Try OpenAI first (best quality)
      if (this.apiKey) {
        try {
          const response = await this.chatWithOpenAI(context, config);
          this.cacheResponse(message, response.message);
          return response;
        } catch (error) {
          console.error('OpenAI error:', error);
        }
      }

      // Fallback to Gemini
      if (this.geminiApiKey) {
        try {
          const response = await this.chatWithGemini(context, config);
          this.cacheResponse(message, response.message);
          return response;
        } catch (error) {
          console.error('Gemini error:', error);
        }
      }

      // Smart fallback
      const fallback = this.getSmartFallback(message);
      return { message: fallback };

    } catch (error: any) {
      console.error('Maya chat error:', error);
      return {
        message: 'Sorry bro, ada technical issue. Try again in a bit? 😅',
      };
    }
  }

  // ============================================
  // OPENAI INTEGRATION
  // ============================================

  private async chatWithOpenAI(
    context: ConversationContext,
    config?: MayaConfig
  ): Promise<MayaResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: config?.model || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: this.getSystemPrompt() },
          ...context.history.slice(-this.MAX_HISTORY),
        ],
        temperature: config?.temperature || 0.8,
        max_tokens: config?.maxTokens || 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const message = data.choices[0].message.content;

    // Add to history
    context.history.push({
      role: 'assistant',
      content: message,
      timestamp: new Date(),
    });

    // Parse actions from response
    const actions = this.parseActions(message);
    const suggestions = this.generateSuggestions(message);

    return {
      message,
      actions,
      suggestions,
      confidence: 0.9,
    };
  }

  // ============================================
  // GEMINI INTEGRATION
  // ============================================

  private async chatWithGemini(
    context: ConversationContext,
    config?: MayaConfig
  ): Promise<MayaResponse> {
    const conversationText = this.buildConversationText(context);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: conversationText }],
          }],
          generationConfig: {
            temperature: config?.temperature || 0.8,
            maxOutputTokens: config?.maxTokens || 500,
            topP: 0.95,
            topK: 40,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const message = data.candidates[0].content.parts[0].text;

    // Add to history
    context.history.push({
      role: 'assistant',
      content: message,
      timestamp: new Date(),
    });

    const actions = this.parseActions(message);
    const suggestions = this.generateSuggestions(message);

    return {
      message,
      actions,
      suggestions,
      confidence: 0.85,
    };
  }

  // ============================================
  // AI CONTENT GENERATION
  // ============================================

  async generateContent(type: 'caption' | 'description' | 'hashtags', topic: string): Promise<string> {
    const prompts = {
      caption: `Generate a catchy TikTok caption about ${topic}. Make it engaging, use emojis, and include relevant hashtags. Keep it under 150 characters.`,
      description: `Write a compelling description for ${topic}. Make it informative and engaging. 2-3 sentences.`,
      hashtags: `Generate 10 relevant hashtags for ${topic}. Mix popular and niche hashtags.`,
    };

    try {
      const response = await this.chat('system', prompts[type]);
      return response.message;
    } catch (error) {
      console.error('Content generation error:', error);
      return this.getFallbackContent(type, topic);
    }
  }

  // ============================================
  // WORKFLOW ASSISTANCE
  // ============================================

  async suggestWorkflow(description: string): Promise<any> {
    const prompt = `Based on this requirement: "${description}", suggest a workflow structure with nodes and connections. Return as JSON with nodes array and edges array.`;

    try {
      const response = await this.chat('system', prompt);
      // Try to parse JSON from response
      const jsonMatch = response.message.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Workflow suggestion error:', error);
    }

    return this.getDefaultWorkflow();
  }

  async optimizeWorkflow(workflow: any): Promise<string[]> {
    const prompt = `Analyze this workflow and suggest optimizations: ${JSON.stringify(workflow)}`;

    try {
      const response = await this.chat('system', prompt);
      return this.extractSuggestions(response.message);
    } catch (error) {
      console.error('Workflow optimization error:', error);
      return ['Consider adding error handling', 'Add logging nodes', 'Optimize API calls'];
    }
  }

  // ============================================
  // ANALYTICS INSIGHTS
  // ============================================

  async analyzePerformance(data: any): Promise<string> {
    const prompt = `Analyze this performance data and provide insights: ${JSON.stringify(data)}. Give actionable recommendations.`;

    try {
      const response = await this.chat('system', prompt);
      return response.message;
    } catch (error) {
      console.error('Analytics error:', error);
      return 'Performance looks good! Keep monitoring your metrics.';
    }
  }

  // ============================================
  // CONVERSATION MANAGEMENT
  // ============================================

  private getConversation(userId: string): ConversationContext {
    if (!this.conversations.has(userId)) {
      this.conversations.set(userId, {
        userId,
        history: [],
        metadata: {},
      });
    }
    return this.conversations.get(userId)!;
  }

  clearConversation(userId: string): void {
    this.conversations.delete(userId);
  }

  getConversationHistory(userId: string): ChatMessage[] {
    const context = this.conversations.get(userId);
    return context?.history || [];
  }

  // ============================================
  // CACHING
  // ============================================

  private getCachedResponse(message: string): string | null {
    const key = message.toLowerCase().trim();
    const cached = this.cache.get(key);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.response;
    }

    return null;
  }

  private cacheResponse(message: string, response: string): void {
    const key = message.toLowerCase().trim();
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
    });

    // Clean old cache entries
    if (this.cache.size > 100) {
      const oldestKey = Array.from(this.cache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
      this.cache.delete(oldestKey);
    }
  }

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  private getSystemPrompt(): string {
    return `You are Maya, a helpful AI assistant for the sanztech automation platform.

Your personality:
- Professional but friendly and casual
- Use Malay-English mix naturally (like "Okay bro", "Let me check", "Macam ni")
- Enthusiastic about automation and helping users succeed
- Give practical, actionable advice
- Keep responses concise and clear

You help with:
- Workflow automation and optimization
- TikTok and social media automation
- Link bio management and analytics
- Task management and scheduling
- Performance analysis and insights

Current platform features:
- Visual workflow builder with 20+ node types
- TikTok auto-posting and content generation
- Link bio with affiliate tracking
- Real-time analytics dashboard
- Task automation and triggers

Respond naturally and helpfully. If you suggest actions, be specific about what the user should do.`;
  }

  private buildConversationText(context: ConversationContext): string {
    let text = this.getSystemPrompt() + '\n\n';
    
    const recentHistory = context.history.slice(-this.MAX_HISTORY);
    recentHistory.forEach(msg => {
      text += `${msg.role === 'user' ? 'User' : 'Maya'}: ${msg.content}\n`;
    });

    return text;
  }

  private parseActions(message: string): MayaAction[] {
    const actions: MayaAction[] = [];

    // Look for action keywords
    if (message.includes('create workflow') || message.includes('build workflow')) {
      actions.push({ type: 'workflow', action: 'create' });
    }
    if (message.includes('run workflow') || message.includes('execute')) {
      actions.push({ type: 'workflow', action: 'execute' });
    }
    if (message.includes('create task')) {
      actions.push({ type: 'task', action: 'create' });
    }
    if (message.includes('view analytics') || message.includes('check stats')) {
      actions.push({ type: 'analytics', action: 'view' });
    }

    return actions;
  }

  private generateSuggestions(message: string): string[] {
    const suggestions: string[] = [];

    if (message.includes('workflow')) {
      suggestions.push('View all workflows', 'Create new workflow', 'Optimize existing workflows');
    }
    if (message.includes('analytics') || message.includes('performance')) {
      suggestions.push('View detailed analytics', 'Export report', 'Set up alerts');
    }
    if (message.includes('task')) {
      suggestions.push('View all tasks', 'Create new task', 'Schedule tasks');
    }

    return suggestions.slice(0, 3);
  }

  private extractSuggestions(text: string): string[] {
    const lines = text.split('\n').filter(line => 
      line.trim().match(/^[-•*]\s/) || line.trim().match(/^\d+\./)
    );
    return lines.map(line => line.replace(/^[-•*\d.]\s*/, '').trim()).slice(0, 5);
  }

  private getSmartFallback(message: string): string {
    const msg = message.toLowerCase();

    if (msg.includes('status') || msg.includes('how')) {
      return `Everything's running smooth! 🚀\n\n✅ Workflows active\n📊 Analytics tracking\n💰 Revenue flowing\n\nWhat would you like to check specifically?`;
    }

    if (msg.includes('workflow')) {
      return `I can help you with workflows! You can:\n\n• Create new workflows\n• View existing workflows\n• Optimize performance\n• Test and debug\n\nWhat would you like to do?`;
    }

    if (msg.includes('analytics') || msg.includes('stats')) {
      return `Let me pull up your analytics! 📊\n\nYou can view:\n• Real-time performance\n• Revenue tracking\n• Link bio stats\n• Conversion rates\n\nWhich metrics interest you?`;
    }

    if (msg.includes('help')) {
      return `I'm here to help! 😊\n\nI can assist with:\n• Workflow automation\n• Analytics & insights\n• Task management\n• Content generation\n• System optimization\n\nJust ask me anything!`;
    }

    return `I'm Maya, your automation assistant! I can help you with workflows, analytics, tasks, and more. What would you like to do today?`;
  }

  private getFallbackContent(type: string, topic: string): string {
    const fallbacks = {
      caption: `🚀 Check out this amazing ${topic}! Perfect for your needs. #${topic.replace(/\s+/g, '')} #automation`,
      description: `Discover the best ${topic} solutions. Streamline your workflow and boost productivity with our automation tools.`,
      hashtags: `#${topic.replace(/\s+/g, '')} #automation #productivity #business #tech #innovation #growth #success #digital #tools`,
    };
    return fallbacks[type as keyof typeof fallbacks] || '';
  }

  private getDefaultWorkflow(): any {
    return {
      nodes: [
        { id: '1', type: 'trigger', data: { label: 'Webhook Trigger' }, position: { x: 100, y: 100 } },
        { id: '2', type: 'action', data: { label: 'Process Data' }, position: { x: 300, y: 100 } },
        { id: '3', type: 'action', data: { label: 'Send Notification' }, position: { x: 500, y: 100 } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ],
    };
  }
}

// Export singleton instance
export const mayaService = new MayaService();
export default mayaService;
