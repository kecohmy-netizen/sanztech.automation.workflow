// Custom React hook for authentication
import { useState, useEffect } from 'react';
import { authService, type AuthState, type AuthUser } from '@/services/authService';

export function useAuth() {
  const [state, setState] = useState<AuthState>(authService.getState());

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    // State
    user: state.user,
    session: state.session,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,

    // Actions
    signUp: authService.signUp.bind(authService),
    signIn: authService.signIn.bind(authService),
    signInWithOAuth: authService.signInWithOAuth.bind(authService),
    signOut: authService.signOut.bind(authService),
    resetPassword: authService.resetPassword.bind(authService),
    updatePassword: authService.updatePassword.bind(authService),
    updateProfile: authService.updateProfile.bind(authService),
    
    // Demo mode
    signInDemo: authService.signInDemo.bind(authService),
    signOutDemo: authService.signOutDemo.bind(authService),
  };
}
