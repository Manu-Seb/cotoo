// components/CustomTabBar.tsx
import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import Colors from '../constants/Colors'; // Import your color scheme
import { useColorScheme } from './useColorScheme'; // If you're using a color scheme
import duckyIcon from '../assets/images/ducky.png'; // Update paths if needed
import graphIcon from '../assets/images/graph.png';
import communityIcon from '../assets/images/community.png';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const colorScheme = useColorScheme(); // If using color scheme
  const icons = [graphIcon, duckyIcon, communityIcon];

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

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.pastelGreen, // Or Colors[colorScheme ?? 'light'].background
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButtonContainer: {
    backgroundColor: '#92ee8c',
    borderRadius: 50,
    padding: 5,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonContainerActive: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tabButtonActive: {
    backgroundColor: '#eee',
  },
  tabButtonActiveSize: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  tabButtonImage: {
    width: '100%',
    height: '100%',
  },
  tabButtonImageActive: {},
});

export default CustomTabBar;