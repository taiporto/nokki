import React from "react";
import { router, Tabs } from "expo-router";
import { Stack, View, useTheme } from "tamagui";
import { User2, WalletCards } from "@tamagui/lucide-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../auth/context";

export default function TabLayout() {
  const theme = useTheme();

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    router.replace("login");
  }

  return (
    <View height="100%">
      <SafeAreaView>
        <Stack height="100%">
          <Tabs
            screenOptions={{
              tabBarStyle: {
                padding: 4,
                backgroundColor: theme?.neutral900?.val,
              },
              tabBarItemStyle: {
                padding: 4,
              },
              tabBarActiveTintColor: theme?.background?.val,
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="(cards)"
              options={{
                title: "Cartões",
                tabBarIcon: ({ color }) => (
                  <WalletCards size={22} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ color }) => <User2 size={22} color={color} />,
              }}
            />
          </Tabs>
        </Stack>
      </SafeAreaView>
    </View>
  );
}
