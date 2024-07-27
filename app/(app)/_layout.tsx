import { Stack } from "expo-router";

export default function App() {
  console.log("hi here");
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
