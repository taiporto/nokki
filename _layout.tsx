import { SplashScreen, Slot } from "expo-router";
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
import "@tamagui/core/reset.css";
import { TamaguiProvider } from "@tamagui/core";
import { createTamagui, CreateTamaguiProps } from "tamagui";
import { config } from "@tamagui/config/v3";

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config as CreateTamaguiProps);

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    DarkerGrotesque_400Regular,
    DarkerGrotesque_500Medium,
    DarkerGrotesque_600SemiBold,
    DarkerGrotesque_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Render the children routes now that all the assets are loaded.
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Slot />
    </TamaguiProvider>
  );
}
