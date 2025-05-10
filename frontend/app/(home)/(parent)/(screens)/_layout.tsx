import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="child-detail-screen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
