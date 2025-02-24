import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/components/useColorScheme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Explicitly type as boolean or null
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token); // Now correct because isLoggedIn is boolean | null
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false); // Handle potential errors and default to logged out
      }
    };

    checkAuth();
  }, []); // Remove hasMounted dependency; the checkAuth should run only once on mount

  useEffect(() => {
    if (isLoggedIn !== null) { // Only navigate when isLoggedIn is determined
      router.replace(isLoggedIn ? '/(tabs)/home' : '/(auth)');
    }
  }, [isLoggedIn, router]); // Add router to the dependency array

  if (isLoggedIn === null) {
    return null; // Or a loading indicator
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* REMOVE these Stack.Screen components for (auth) and (tabs) */}
        {/* These should be defined within your (auth) and (tabs) layouts */}
        <Stack.Screen name="showComments" options={{ headerShown: false }} />
        <Stack.Screen name="userProfile" options={{ headerShown: true }} /> 
      </Stack>
    </ThemeProvider>
  );
}