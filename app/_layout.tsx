import useTheme from "@/hooks/useTheme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const { theme, colorScheme } = useTheme();
  const isAuth = true;

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Protected guard={isAuth}>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!isAuth}>
            <Stack.Screen name="sign-in" />
          </Stack.Protected>
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </PaperProvider>
  );
}
