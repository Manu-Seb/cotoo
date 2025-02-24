import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  profilePicture: any; // Can be a require() or a URL
  username: string;
  level: string;
  rightComponent?: React.ReactNode; // Make rightComponent optional
}

const ProfileHeader = ({ profilePicture, username, level, rightComponent }: ProfileHeaderProps) => { // Add rightComponent to the destructuring
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={profilePicture} style={styles.profilePicture} />

      {/* Username and Level */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.level}>{level}</Text>
      </View>
      {/* Conditionally render the rightComponent */}
      {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute space between items
    paddingHorizontal: 16, // Add some horizontal padding
    paddingVertical: 8,    // Add some vertical padding
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 16,
    color: '#666',
  },
  rightComponent: { // Style for the right component container
    // Add any specific styling for the right component container
  },
});

export default ProfileHeader;