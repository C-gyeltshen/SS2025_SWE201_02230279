// import { useAuthStore } from '../store/authStore';

import { useAuthStore } from "@/shared/store/authStore";

export const useSession = () => {
  const { session, isLoading } = useAuthStore();
  
  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    userId: session?.user?.id || null,
    userEmail: session?.user?.email || null
  };
};