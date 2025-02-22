import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Basic check: if email and password are not empty, navigate to (tabs)/index
    if (email.trim() && password.trim()) {
      router.replace('/(tabs)/index'); // Replace the current route with (tabs)/index
    } else {
      alert('Please enter both email and password.'); // Simple validation
    }
  };

  const handleCreateAccount = () => {
    router.push('/(auth)/signup'); // Navigate to a signup page (you can create this later)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.createAccountText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.pastelGreen, // Background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2D6A4F', // Dark green for contrast
  },
  input: {
    height: 50,
    borderColor: Colors.brighterPastelGreen, // Brighter pastel green for borders
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff', // White background for inputs
    fontSize: 16,
    color: '#333', // Dark text for readability
  },
  loginButton: {
    backgroundColor: Colors.brighterPastelGreen, // Brighter pastel green for the button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
  },
  createAccountText: {
    marginTop: 16,
    textAlign: 'center',
    color: Colors.pastelYellow, // Pastel yellow for the "Create an Account" text
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});