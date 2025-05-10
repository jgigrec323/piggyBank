import { Slot } from "expo-router";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_600SemiBold,
} from "@expo-google-fonts/fredoka";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <Slot></Slot>
    </GestureHandlerRootView>
  );
}
