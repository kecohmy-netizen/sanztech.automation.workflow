// Custom React hook for Maya AI integration
import { useState, useCallback, useEffect } from 'react';
import { mayaService } from '@/services/mayaService';

interface UseMayaOptions {
  userId?: string;
  autoLoad?: boolean;
}

interface MayaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: any[];
}

export function useMaya(options: UseMayaOptions = {}) {
  const { userId = 'default', autoLoad = false } = options;
  
  const [messages, setMessages] = useState<MayaMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load conversation history
  useEffect(() => {
    if (autoLoad) {
      const history = mayaService.getConversationHistory(userId);
      const formattedMessages = history.map((msg, idx) => ({
        id: `msg-${idx}`,
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
        timestamp: msg.timestamp || new Date(),
      })) as MayaMessage[];
      setMessages(formattedMessages);
    }
  }, [userId, autoLoad]);

  // Send message to Maya
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMessage: MayaMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get Maya response
      const response = await mayaService.chat(userId, message);

      // Add Maya response
      const mayaMessage: MayaMessage = {
        id: `maya-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        suggestions: response.suggestions,
        actions: response.actions,
      };
      setMessages(prev => [...prev, mayaMessage]);

    } catch (err: any) {
      setError(err.message || 'Failed to get response from Maya');
      console.error('Maya error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Generate content
  const generateContent = useCallback(async (
    type: 'caption' | 'description' | 'hashtags',
    topic: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const content = await mayaService.generateContent(type, topic);
      return content;
    } catch (err: any) {
      setError(err.message || 'Failed to generate content');
      console.error('Content generation error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Suggest workflow
  const suggestWorkflow = useCallback(async (description: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const workflow = await mayaService.suggestWorkflow(description);
      return workflow;
    } catch (err: any) {
      setError(err.message || 'Failed to suggest workflow');
      console.error('Workflow suggestion error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Analyze performance
  const analyzePerformance = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const insights = await mayaService.analyzePerformance(data);
      return insights;
    } catch (err: any) {
      setError(err.message || 'Failed to analyze performance');
      console.error('Analytics error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear conversation
  const clearConversation = useCallback(() => {
    mayaService.clearConversation(userId);
    setMessages([]);
    setError(null);
  }, [userId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    generateContent,
    suggestWorkflow,
    analyzePerformance,
    clearConversation,
  };
}
