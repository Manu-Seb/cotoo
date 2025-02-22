import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Posts = () => {
  const posts = [
    {
      id: 1,
      title: 'Post Title 1',
      content: 'This is the content of post 1.',
    },
    {
      id: 2,
      title: 'Post Title 2',
      content: 'This is the content of post 2.',
    },
    {
      id: 3,
      title: 'Post Title 3',
      content: 'This is the content of post 3.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Posts</Text>
      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
  },
});

export default Posts; // Ensure default export