import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'; // Import TouchableOpacity and Text
import Colors from '../../constants/Colors';
import ProfileHeader from '../../components/ProfileHeader';
import Tabs from '../../components/Tabs';
import Stats from '../profile/Stats';
import Posts from '../profile/Posts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/(auth)');
    } catch (error) {
      console.error("Logout error:", error);
      // Handle the error (e.g., display an alert)
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader
        profilePicture={require('../../assets/images/ducky.png')}
        username="JohnDoe"
        level="Level 5"
        // Add the logout button here
        rightComponent={
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        }
      />

      {/* Separator */}
      <View style={styles.separator} />

      {/* Tabs */}
      <Tabs
        tabs={[
          { name: 'Posts', component: Posts },
          { name: 'Stats', component: Stats },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.skyBlue,
    flex: 1,
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  logoutButton: {  // Style for the logout button
    backgroundColor: 'red', // Red background
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  logoutButtonText: { // Style for the logout text
    color: 'white',  // White text
    fontWeight: 'bold',
  },
});