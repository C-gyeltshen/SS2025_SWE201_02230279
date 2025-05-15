import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import SplashScreenComponent from "./(tabs)/SplashScreen";
import TodoApp from "./(tabs)/todo";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        // <View>
        //   <Text>Hello, this is my Home component!</Text>
        //   <Text>{JSON.stringify(session.user)}</Text>
        //   <Text>WE ARE HERE</Text>
        // </View>
        <TodoApp />
      ) : (
        // <Auth />
        <SplashScreenComponent />
      )}
    </View>
  );
}
