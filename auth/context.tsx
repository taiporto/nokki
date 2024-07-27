import React, { createContext, useContext, useEffect, useState } from "react";

import { Session, User } from "@supabase/supabase-js";

import supabase from "../lib/supabase";

export const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
}>({
  user: null,
  session: null,
  isLoggedIn: false,
});

export const AuthContextProvider = (props: any) => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        setUserSession(session);
        setUser(session?.user ?? null);

        if (event === "SIGNED_IN") {
          setIsLoggedIn(true);
        } else if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    userSession,
    user,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContextProvider.");
  }
  return context;
};
