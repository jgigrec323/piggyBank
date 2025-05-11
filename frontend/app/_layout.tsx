import { Slot } from "expo-router";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_600SemiBold,
} from "@expo-google-fonts/fredoka";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "@/context/app-context";
import { ParentProvider } from "@/context/parent-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_600SemiBold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <AppProvider>
        <ParentProvider>
          <Slot></Slot>
        </ParentProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
