import { Stack } from "expo-router";

export default function CardView() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="singleCard" options={{ headerShown: false }} />
    </Stack>
  );
}
