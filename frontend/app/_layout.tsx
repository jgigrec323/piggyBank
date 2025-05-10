import { Slot } from "expo-router";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_600SemiBold,
} from "@expo-google-fonts/fredoka";

export default function RootLayout() {
  const [loaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_600SemiBold,
  });
  if (!loaded) {
    return null;
  }
  return <Slot></Slot>;
}
