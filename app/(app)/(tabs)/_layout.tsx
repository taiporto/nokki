import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../../auth/context";
import { Stack, View, useTheme } from "tamagui";
import { User2, WalletCards } from "@tamagui/lucide-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const { isLoggedIn } = useAuth();

  const theme = useTheme();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
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
