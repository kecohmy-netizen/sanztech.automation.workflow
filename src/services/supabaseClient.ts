import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { demoStorageService } from './demoStorageService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Demo mode will use localStorage.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper functions for common operations
export const supabaseHelpers = {
  // ============================================
  // WORKFLOWS
  // ============================================
  
  async getWorkflows(userId: string) {
    // Use demo storage for demo users
    if (demoStorageService.isDemoUser(userId)) {
      return await demoStorageService.getWorkflows(userId);
    }

    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  async createWorkflow(userId: string, workflow: any) {
    // Use demo storage for demo users
    if (demoStorageService.isDemoUser(userId)) {
      return await demoStorageService.createWorkflow(userId, workflow);
    }

    const { data, error } = await supabase
      .from('workflows')
      .insert({ ...workflow, user_id: userId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateWorkflow(id: string, updates: any, userId?: string) {
    // Use demo storage for demo users
    if (userId && demoStorageService.isDemoUser(userId)) {
      return await demoStorageService.updateWorkflow(userId, id, updates);
    }

    const { data, error } = await supabase
      .from('workflows')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async deleteWorkflow(id: string, userId?: string) {
    // Use demo storage for demo users
    if (userId && demoStorageService.isDemoUser(userId)) {
      return await demoStorageService.deleteWorkflow(userId, id);
    }

    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
  
  // ============================================
  // TASKS
  // ============================================
  
  async getTasks(userId: string, status?: string) {
    // Use demo storage for demo users
    if (demoStorageService.isDemoUser(userId)) {
      return await demoStorageService.getTasks(userId, status);
    }

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId);
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  async createTask(userId: string, task: any) {
    // Use demo storage for demo users
    if (demoStorageService.isDemoUser(userId)) {
      return await demoStorageService.createTask(userId, task);
    }

    const { data, error} = await supabase
      .from('tasks')
      .insert({ ...task, user_id: userId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateTask(id: string, updates: any) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // ============================================
  // LINKS
  // ============================================
  
  async getLinks(userId: string) {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
      .order('position', { ascending: true });
    
    if (error) throw error;
    return data;
  },
  
  async createLink(userId: string, link: any) {
    const { data, error } = await supabase
      .from('links')
      .insert({ ...link, user_id: userId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateLink(id: string, updates: any) {
    const { data, error } = await supabase
      .from('links')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async deleteLink(id: string) {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
  
  // ============================================
  // ANALYTICS
  // ============================================
  
  async trackEvent(userId: string, linkId: string, eventType: 'view' | 'click' | 'conversion', revenue = 0, metadata = {}) {
    const { data, error } = await supabase
      .from('analytics')
      .insert({
        user_id: userId,
        link_id: linkId,
        event_type: eventType,
        revenue,
        metadata,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async getAnalytics(userId: string, linkId?: string, startDate?: Date, endDate?: Date) {
    let query = supabase
      .from('analytics')
      .select('*')
      .eq('user_id', userId);
    
    if (linkId) {
      query = query.eq('link_id', linkId);
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  async getDailyAnalytics(userId: string, days = 30) {
    const { data, error } = await supabase
      .from('daily_analytics')
      .select('*')
      .eq('user_id', userId)
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // ============================================
  // NOTIFICATIONS
  // ============================================
  
  async getNotifications(userId: string, unreadOnly = false) {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId);
    
    if (unreadOnly) {
      query = query.eq('read', false);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false }).limit(50);
    
    if (error) throw error;
    return data;
  },
  
  async createNotification(userId: string, notification: any) {
    const { data, error } = await supabase
      .from('notifications')
      .insert({ ...notification, user_id: userId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async markNotificationRead(id: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    
    if (error) throw error;
  },
  
  async markAllNotificationsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    
    if (error) throw error;
  },
  
  // ============================================
  // USER SETTINGS
  // ============================================
  
  async getUserSettings(userId: string) {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateUserSettings(userId: string, settings: any) {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ user_id: userId, ...settings })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // ============================================
  // REAL-TIME SUBSCRIPTIONS
  // ============================================
  
  subscribeToTasks(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('tasks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },
  
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },
  
  subscribeToAnalytics(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('analytics')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'analytics',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },
};

export default supabase;
