import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Animated, Text, Dimensions } from 'react-native';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors'; // Import your color scheme
import { useColorScheme } from '../../components/useColorScheme';
import LevelIndicator from '../../components/LevelIndicator'; // Import the LevelIndicator component
import Profile from '../profile'; // Import the Profile component
import StackNavigator from '../navigation/StackNavigator'; // Import the StackNavigator

// Import your images
import duckyIcon from '../../assets/images/ducky.png';
import graphIcon from '../../assets/images/graph.png';
import communityIcon from '../../assets/images/community.png';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const colorScheme = useColorScheme();
  const icons = [graphIcon, duckyIcon, communityIcon]; // Array of icons

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const scale = useRef(new Animated.Value(1)).current;

        useEffect(() => {
          Animated.timing(scale, {
            toValue: isFocused ? 1.2 : 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }, [isFocused]);

        const onPress = () => {
          const event = navigation.emit({
            type: 'TabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Animated.View
            key={route.key}
            style={[
              styles.tabButtonContainer,
              isFocused && styles.tabButtonContainerActive,
              { transform: [{ scale }] },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.tabButton,
                isFocused && styles.tabButtonActive,
                isFocused && styles.tabButtonActiveSize,
              ]}
              onPress={onPress}
            >
              <Image
                source={icons[index]}
                style={[styles.tabButtonImage, isFocused && styles.tabButtonImageActive]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleLevelIndicatorPress = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Level Indicator */}
      <LevelIndicator level={1} onPress={handleLevelIndicatorPress} />

      {/* Tabs */}
      <Tabs
        screenOptions={{
          // Remove default header
          headerShown: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} />} // Use the custom tab bar
      >
        {/* Your Tabs.Screen components here */}
        <Tabs.Screen name="two" options={{ title: 'Home' }} />
        <Tabs.Screen name="index" options={{ title: 'Profile' }} />
        <Tabs.Screen name="three" options={{ title: 'Settings' }} />
      </Tabs>

      {/* Stack Navigator */}

      {/* Popup Overlay */}
      {popupVisible && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleClosePopup}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {/* Pass necessary props to the Profile component */}
            <Profile
              username="JohnDoe" // Example username
              postsCount={10} // Example posts count
              level={5} // Example level
              tasks={[
                { id: '1', title: 'Task 1', completed: false },
                { id: '2', title: 'Task 2', completed: true },
                { id: '3', title: 'Task 3', completed: false },
              ]}
              onClose={handleClosePopup} // Pass the close function
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.pastelGreen, // Or Colors[colorScheme ?? 'light'].background
    paddingVertical: 10,
    justifyContent: 'space-around', // Distribute buttons evenly
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Example border color
  },
  tabButtonContainer: {
    backgroundColor: '#92ee8c', // Background color for the hard circle
    borderRadius: 50, // Make the outer container circular
    padding: 5, // Add padding to create the margin effect
    width: 70, // Default width
    height: 70, // Default height
    justifyContent: 'center', // Center the button horizontally
    alignItems: 'center', // Center the button vertically
  },
  tabButtonContainerActive: {
    width: 90, // Increase width when active
    height: 90, // Increase height when active
    borderRadius: 45, // Adjust border radius to maintain circular shape
    justifyContent: 'center', // Center the button horizontally
    alignItems: 'center', // Center the button vertically
  },
  tabButton: {
    borderRadius: 30, // Make the button circular
    width: 60, // Set width to make it a circle
    height: 60, // Set height to make it a circle
    justifyContent: 'center', // Center the image
    alignItems: 'center', // Center the image
    overflow: 'hidden', // Ensure the image is cropped to the circle
  },
  tabButtonActive: {
    backgroundColor: '#eee', // Highlight active tab
  },
  tabButtonActiveSize: {
    width: 70, // Increase width when active
    height: 70, // Increase height when active
    borderRadius: 35, // Adjust border radius to maintain circular shape
  },
  tabButtonImage: {
    width: '100%', // Set the width of the image to fill the button
    height: '100%', // Set the height of the image to fill the button
  },
  tabButtonImageActive: {
    // No tintColor to avoid solid color overlay
  },
  popupOverlay: {
    position: 'absolute',
    top: 205, // Start the popup below the top 205 pixels
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    width: '90%', // Slightly wider for better usability
    backgroundColor: Colors.pastelGreen,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%', // Ensure the popup content does not exceed the screen height
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure the close button is on top
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});