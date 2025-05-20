// store/authStore.ts
import { create } from 'zustand';
import { Session } from '@supabase/supabase-js'; 
import { supabase } from '@/app/lib/supabase';

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void; // Explicitly typed parameter
  checkSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: true,

  // Now properly typed
  setSession: (session: Session | null) => set({ session, isLoading: false }),

  checkSession: async () => {
    try {
      set({ isLoading: true });
      const { data: { session } } = await supabase.auth.getSession();
      set({ session, isLoading: false });
    } catch (error) {
      set({ session: null, isLoading: false });
      console.error('Error checking session:', error);
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();
      set({ session: null, isLoading: false });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ isLoading: false });
    }
  }
}));