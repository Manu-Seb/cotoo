import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log("Login component mounted"); // Log when the component mounts
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = async () => {
    console.log("Login button pressed"); // Log when the login button is pressed

    if (email.trim() && password.trim()) {
      console.log("Email and password entered"); // Log if email and password are entered

      try {
        console.log("Attempting to store token"); // Log before storing the token
        await AsyncStorage.setItem('token', 'some_token'); // Store token (replace with actual token)
        console.log("Token stored successfully"); // Log after successful token storage
        console.log("Navigating to tabs/index"); // Log before navigation
        router.replace('/(tabs)/home'); // Use replace here!
      } catch (error) {
        console.error("Login error:", error); // Log any error during login
        alert('Login failed. Please try again.');
      }
    } else {
      console.log("Email or password missing"); // Log if email or password is missing
      alert('Please enter both email and password.');
    }
  };

  const handleCreateAccount = () => {
    console.log("Create account button pressed"); // Log when create account is pressed
    router.push('/(auth)/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

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
    borderColor: Colors.brightPastelGreen, // Brighter pastel green for borders
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff', // White background for inputs
    fontSize: 16,
    color: '#333', // Dark text for readability
  },
  loginButton: {
    backgroundColor: Colors.brightPastelGreen, // Brighter pastel green for the button
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