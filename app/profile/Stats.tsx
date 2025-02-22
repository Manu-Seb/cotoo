import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Stats = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Likes</Text>
        <Text style={styles.statValue}>1,234</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Comments</Text>
        <Text style={styles.statValue}>567</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Shares</Text>
        <Text style={styles.statValue}>89</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Stats; // Ensure default export