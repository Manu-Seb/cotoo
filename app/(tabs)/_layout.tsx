import { Tabs } from 'expo-router';
import CustomTabBar from '../../components/CustomTabBar'; // Move CustomTabBar to a separate file

export default function TabLayout() {
  console.log("Tabs Layout Rendered");
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}