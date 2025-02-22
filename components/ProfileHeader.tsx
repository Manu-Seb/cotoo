import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  profilePicture: any; // Can be a require() or a URL
  username: string;
  level: string;
}

const ProfileHeader = ({ profilePicture, username, level }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={profilePicture} style={styles.profilePicture} />

      {/* Username and Level */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.level}>{level}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40, // Makes it round
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
});

export default ProfileHeader;