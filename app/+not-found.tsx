import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed'; // Make sure you're importing Text

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text style={styles.title}>This screen doesn't exist.</Text> {/* Text wrapped in <Text> */}

      <Link href="/" style={styles.link} replace>
        <Text style={styles.linkText}>Go to home screen!</Text> {/* Text wrapped in <Text> */}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Added some margin for spacing
  },
  link: {
    marginTop: 15,
    paddingVertical: 10, // Adjusted padding
    paddingHorizontal: 20, // Added horizontal padding
    borderRadius: 5,     // Added border radius for better visual appeal
    backgroundColor: '#eee', // A subtle background color
  },
  linkText: {
    fontSize: 16,        // Slightly increased font size
    color: '#2e78b7',
    textAlign: 'center', // Centered text within the Link
  },
});