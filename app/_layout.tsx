import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/components/useColorScheme'; // Adjust path if needed

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), // Adjust path if needed
  });

  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize to null
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    setHasMounted(true); // Set hasMounted after initial render
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkAuth();
  }, [hasMounted]); // Add hasMounted as a dependency

  useEffect(() => {
    if (hasMounted && isLoggedIn) { // Check hasMounted *before* navigating
      router.replace('(tabs)');
    } else if (hasMounted && isLoggedIn === false) {
      router.replace('(auth)');
    }
  }, [hasMounted, isLoggedIn]); // Add hasMounted and isLoggedIn as a dependency

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (isLoggedIn === null) {
    return null; // Or a loading indicator
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="showComments" options={{ headerShown: false }} />
        <Stack.Screen name="userProfile" options={{ headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
}