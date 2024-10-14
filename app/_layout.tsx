import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { loaded } from "expo-font/build/memory";
export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
