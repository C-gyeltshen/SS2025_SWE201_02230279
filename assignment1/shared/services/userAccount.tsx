import { supabase } from "@/app/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
// import { useRouter, useFocusEffect } from 'expo-router';


export async function UserSignOut() {
  // const router = useRouter();
  const { error } = await supabase.auth.signOut()
}


export function useUser() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const user = session?.user;
  return { user, session };
}