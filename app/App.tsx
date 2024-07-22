import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Auth from "./_components/Auth";
import { Session, User } from "@supabase/supabase-js";
import { auth } from "../auth";

export default function App() {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const initAuth = async () => {
    if (auth) {
      const response = await auth.getSession();
      console.log(response);
      setUserSession(response.data.session);
      setUser(response.data.session?.user ?? null);

      const { data: authListener } = auth.onAuthStateChange(
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
    <>
      {userSession ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Auth />
      )}
    </>
  );
}
