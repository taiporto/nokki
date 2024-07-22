import React from "react";
import { Stack } from "expo-router";
import Auth from "./_components/Auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth/context";

export default function App() {
  const { user } = useAuth();
  return (
    <SafeAreaView>
      {user ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Auth />
      )}
    </SafeAreaView>
  );
}
