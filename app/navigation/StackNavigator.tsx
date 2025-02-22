import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../(tabs)/index';
import ShowComments from '../showComments';
import UserProfile from '../userProfile';

type RootStackParamList = {
  Home: undefined;
  ShowComments: {
    post: {
      title: string;
      content: string;
      image?: any;
      username: string;
      createdTime: Date;
      commentsCount: number;
    };
  };
  UserProfile: { username: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ShowComments" component={ShowComments} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default StackNavigator;