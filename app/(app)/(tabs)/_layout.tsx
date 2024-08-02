import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../../auth/context";
import BackgroundGradient from "../../_components/BackgroundGradient";
import { View } from "tamagui";

export default function TabLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <View>
      <BackgroundGradient />
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="(cards)"
          options={{
            title: "Cartões",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="cards-playing-outline"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
