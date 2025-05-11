import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="stage-one" options={{ headerShown: false }} />
      <Stack.Screen name="stage-two" options={{ headerShown: false }} />
      <Stack.Screen name="game-one" options={{ headerShown: false }} />
      <Stack.Screen name="game-two" options={{ headerShown: false }} />
      <Stack.Screen name="game-three" options={{ headerShown: false }} />
      <Stack.Screen name="game-ten" options={{ headerShown: false }} />
      <Stack.Screen name="shop" options={{ headerShown: false }} />
      <Stack.Screen name="my-tasks" options={{ headerShown: false }} />
    </Stack>
  );
}
