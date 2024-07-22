import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Auth from "./_components/Auth";
import { Session, User } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const initAuth = async () => {
    if (supabase.auth) {
      const response = await supabase.auth.getSession();
      setUserSession(response.data.session);
      setUser(response.data.session?.user ?? null);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log(`Supabase auth event: ${event}`);
          setUserSession(session);
          setUser(session?.user ?? null);
        }
      );
    }
  };

  useEffect(() => {
    initAuth();

    // return () => {
    //   authListener?.subscription.unsubscribe();
    // };
  }, []);
  return (
    <SafeAreaView>
      {userSession ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Auth />
      )}
    </SafeAreaView>
  );
}
