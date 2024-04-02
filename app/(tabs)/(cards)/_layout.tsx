import { Stack } from "expo-router";

export default function CardView() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="singleCard" />
    </Stack>
  );
}
