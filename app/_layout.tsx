import { Stack } from "expo-router/stack";
import "@tamagui/core/reset.css";
import { TamaguiProvider } from "@tamagui/core";
import { tamaguiConfig } from "../tamagui.config";
import { SplashScreen } from "expo-router";
import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import {
  DarkerGrotesque_400Regular,
  DarkerGrotesque_500Medium,
  DarkerGrotesque_600SemiBold,
  DarkerGrotesque_700Bold,
} from "@expo-google-fonts/darker-grotesque";
import { useEffect } from "react";
import { initDatabase } from "../database/initDatabase";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";

SplashScreen.preventAutoHideAsync();

const db = initDatabase();

export default function AppLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    DarkerGrotesque_400Regular,
    DarkerGrotesque_500Medium,
    DarkerGrotesque_600SemiBold,
    DarkerGrotesque_700Bold,
  });

  const { success: migrationSuccess, error: migrationError } = useMigrations(
    db,
    migrations
  );

  useEffect(() => {
    if (fontsLoaded || fontError || migrationError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
      migrationError && console.error("Migration error", migrationError);
      fontError && console.error("Font error", fontError);
    }
  }, [fontsLoaded, fontError, migrationError]);

  // Prevent rendering until the font has loaded or an error was returned
  if ((!fontsLoaded && !fontError) || migrationError || !migrationSuccess) {
    return null;
  }

  // Render the children routes now that all the assets are loaded.
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
