import { Stack } from "expo-router";

export default function CardsGroup() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="createCollection" />
      <Stack.Screen name="createCard" />
    </Stack>
  );
}
