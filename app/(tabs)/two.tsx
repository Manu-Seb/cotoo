import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import ProfileHeader from '../../components/ProfileHeader';
import Tabs from '../../components/Tabs';
import Stats from '../profile/Stats';
import Posts from '../profile/Posts';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader
        profilePicture={require('../../assets/images/ducky.png')}
        username="JohnDoe"
        level="Level 5"
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
});