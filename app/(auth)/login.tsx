// app/(auth)/login.tsx
import React from 'react';
import { View, Text } from 'react-native';

import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    console.log('Login page rendered'); // Debugging
  }, []);

  return (
    <View>
      <Text>Login Page</Text>
    </View>
  );
}