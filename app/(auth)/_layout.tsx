import { Stack } from 'expo-router';

export default function AuthLayout() {
    console.log('AuthLayout rendered');
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}