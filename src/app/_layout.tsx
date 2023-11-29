import { useEffect } from "react";
import { useColorScheme } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "src/tamagui.config";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("src/assets/fonts/SpaceMono-Regular.ttf"),
    "RedHatText-Bold": require("src/assets/fonts/RedHatText/RedHatText-Bold.ttf"),
    "RedHatText-BoldItalic": require("src/assets/fonts/RedHatText/RedHatText-BoldItalic.ttf"),
    "RedHatText-Italic-VariableFont_wght": require("src/assets/fonts/RedHatText/RedHatText-Italic-VariableFont_wght.ttf"),
    "RedHatText-Italic": require("src/assets/fonts/RedHatText/RedHatText-Italic.ttf"),
    "RedHatText-Light": require("src/assets/fonts/RedHatText/RedHatText-Light.ttf"),
    "RedHatText-LightItalic": require("src/assets/fonts/RedHatText/RedHatText-LightItalic.ttf"),
    "RedHatText-Medium": require("src/assets/fonts/RedHatText/RedHatText-Medium.ttf"),
    "RedHatText-MediumItalic": require("src/assets/fonts/RedHatText/RedHatText-MediumItalic.ttf"),
    "RedHatText-Regular": require("src/assets/fonts/RedHatText/RedHatText-Regular.ttf"),
    "RedHatText-SemiBold": require("src/assets/fonts/RedHatText/RedHatText-SemiBold.ttf"),
    "RedHatText-SemiBoldItalic": require("src/assets/fonts/RedHatText/RedHatText-SemiBoldItalic.ttf"),
    "RedHatText-VariableFont_wght": require("src/assets/fonts/RedHatText/RedHatText-VariableFont_wght.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // router.push("/screens/");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
