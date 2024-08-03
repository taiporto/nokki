import "@tamagui/core/reset.css";
import { TamaguiProvider } from "@tamagui/core";
import { tamaguiConfig } from "../tamagui.config";
import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  // Inter_500Medium,
  // Inter_400Regular,
} from "@expo-google-fonts/inter";
// import {
//   DarkerGrotesque_400Regular,
//   DarkerGrotesque_500Medium,
//   DarkerGrotesque_600SemiBold,
//   DarkerGrotesque_700Bold,
// } from "@expo-google-fonts/darker-grotesque";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../auth/context";
import { AppState } from "react-native";
import supabase from "../lib/supabase";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Regular.otf"),
    InterMedium: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    "DarkerGrotesque-Regular": require("../assets/fonts/DarkerGrotesque-Regular.ttf"),
    "DarkerGrotesque-Medium": require("../assets/fonts/DarkerGrotesque-Medium.ttf"),
    "DarkerGrotesque-SemiBold": require("../assets/fonts/DarkerGrotesque-SemiBold.ttf"),
    "DarkerGrotesque-Bold": require("../assets/fonts/DarkerGrotesque-Bold.ttf"),
  });

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
      fontError && console.error("Font error", fontError);
    }

    AppState.addEventListener("change", (state) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Render the children routes now that all the assets are loaded.
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <AuthContextProvider>
        {isLoggedIn ? (
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
          </Stack>
        )}
      </AuthContextProvider>
    </TamaguiProvider>
  );
}
