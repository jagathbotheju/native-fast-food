import { Colors } from "@/lib/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const customLightTheme = { ...MD3LightTheme, colors: Colors.light.colors };
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark.colors };

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const useTheme = () => {
  const { toggleColorScheme, setColorScheme, colorScheme } = useColorScheme();

  const theme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleDarkMode = async () => {
    toggleColorScheme();
    await AsyncStorage.setItem("dark-mode", JSON.stringify(colorScheme));
  };

  useEffect(() => {
    AsyncStorage.getItem("dark-mode").then((darkMode) => {
      if (darkMode) {
        setColorScheme(darkMode === "dark" ? "dark" : "light");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { theme, toggleDarkMode, colorScheme, setColorScheme };
};

export default useTheme;
