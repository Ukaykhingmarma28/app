import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="signing" options={{ headerShown: false }} />
    </Stack>
  );
}
