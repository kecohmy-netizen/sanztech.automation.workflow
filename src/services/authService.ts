// Authentication Service - Complete auth flow with Supabase
import { supabase } from './supabaseClient';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

class AuthService {
  private listeners: Set<(state: AuthState) => void> = new Set();
  private currentState: AuthState = {
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  };

  constructor() {
    this.initialize();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  private async initialize() {
    try {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        await this.handleSessionChange(session);
      } else {
        this.updateState({ isLoading: false });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth event:', event);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await this.handleSessionChange(session);
        } else if (event === 'SIGNED_OUT') {
          this.handleSignOut();
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.updateState({ isLoading: false });
    }
  }

  // ============================================
  // SIGN UP
  // ============================================

  async signUp(email: string, password: string, metadata?: { name?: string }) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      if (data.user && data.session) {
        await this.handleSessionChange(data.session);
        return { user: data.user, session: data.session };
      }

      // Email confirmation required
      return { 
        user: data.user, 
        session: null,
        message: 'Please check your email to confirm your account' 
      };
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to sign up');
    }
  }

  // ============================================
  // SIGN IN
  // ============================================

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        await this.handleSessionChange(data.session);
      }

      return { user: data.user, session: data.session };
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  // ============================================
  // SIGN IN WITH OAUTH
  // ============================================

  async signInWithOAuth(provider: 'google' | 'github' | 'discord') {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('OAuth sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with OAuth');
    }
  }

  // ============================================
  // SIGN OUT
  // ============================================

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      this.handleSignOut();
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  // ============================================
  // PASSWORD RESET
  // ============================================

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { message: 'Password reset email sent' };
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send reset email');
    }
  }

  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { message: 'Password updated successfully' };
    } catch (error: any) {
      console.error('Password update error:', error);
      throw new Error(error.message || 'Failed to update password');
    }
  }

  // ============================================
  // USER PROFILE
  // ============================================

  async updateProfile(updates: { name?: string; avatar?: string }) {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) throw error;

      // Update current state
      if (this.currentState.user) {
        this.updateState({
          user: {
            ...this.currentState.user,
            ...updates,
          },
        });
      }

      return { message: 'Profile updated successfully' };
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  // ============================================
  // SESSION MANAGEMENT
  // ============================================

  private async handleSessionChange(session: Session | null) {
    if (!session) {
      this.handleSignOut();
      return;
    }

    const user = session.user;
    const authUser: AuthUser = {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email?.split('@')[0],
      avatar: user.user_metadata?.avatar_url,
      createdAt: new Date(user.created_at),
    };

    this.updateState({
      user: authUser,
      session,
      isLoading: false,
      isAuthenticated: true,
    });
  }

  private handleSignOut() {
    this.updateState({
      user: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  private updateState(updates: Partial<AuthState>) {
    this.currentState = {
      ...this.currentState,
      ...updates,
    };

    // Notify all listeners
    this.listeners.forEach(listener => listener(this.currentState));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener);
    // Immediately call with current state
    listener(this.currentState);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): AuthState {
    return this.currentState;
  }

  getUser(): AuthUser | null {
    return this.currentState.user;
  }

  getSession(): Session | null {
    return this.currentState.session;
  }

  isAuthenticated(): boolean {
    return this.currentState.isAuthenticated;
  }

  isLoading(): boolean {
    return this.currentState.isLoading;
  }

  // ============================================
  // DEMO MODE (for testing without Supabase)
  // ============================================

  async signInDemo() {
    // Generate unique demo user ID for each session
    const uniqueId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const randomName = `Demo User ${Math.floor(Math.random() * 1000)}`;
    
    // Create a unique demo user for testing
    const demoUser: AuthUser = {
      id: uniqueId,
      email: `demo-${uniqueId}@sanztech.online`,
      name: randomName,
      avatar: undefined,
      createdAt: new Date(),
    };

    this.updateState({
      user: demoUser,
      session: null,
      isLoading: false,
      isAuthenticated: true,
    });

    // Store in localStorage for persistence (per browser session)
    localStorage.setItem('demo_auth', JSON.stringify(demoUser));

    console.log('🎭 Demo mode activated with unique user:', demoUser.id);

    return { user: demoUser, session: null };
  }

  checkDemoAuth() {
    const demoAuth = localStorage.getItem('demo_auth');
    if (demoAuth) {
      try {
        const user = JSON.parse(demoAuth);
        this.updateState({
          user,
          session: null,
          isLoading: false,
          isAuthenticated: true,
        });
        return true;
      } catch (error) {
        localStorage.removeItem('demo_auth');
      }
    }
    return false;
  }

  signOutDemo() {
    localStorage.removeItem('demo_auth');
    this.handleSignOut();
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
