import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../constants/Colors';

const ShowComments = () => {
  const { post } = useLocalSearchParams();
  const router = useRouter();

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  // Mock post data (for frontend-only development)
  const mockPost = {
    id: 1,
    title: 'Mock Post Title',
    content: 'This is a mock post for frontend development.',
    username: 'MockUser',
    createdTime: new Date(),
    image: require('../assets/images/ducky.png'), // Mock image
    comments: [
      {
        id: 1,
        username: 'Commenter1',
        content: 'This is a mock comment.',
      },
      {
        id: 2,
        username: 'Commenter2',
        content: 'Another mock comment.',
      },
    ],
  };

  // Use mock data if no post is passed
  const parsedPost = post ? JSON.parse(post as string) : mockPost;

  // Debugging: Log parsedPost and comments
  console.log('Parsed Post:', parsedPost);

  if (!parsedPost) {
    return <Text>No post data available.</Text>;
  }

  // Ensure comments is an array
  let initialComments = parsedPost.comments || [];

  // If comments is undefined but commentsCount is available, generate mock comments
  if (!parsedPost.comments && parsedPost.commentsCount) {
    initialComments = Array.from({ length: parsedPost.commentsCount }, (_, index) => ({
      id: index + 1,
      username: `Commenter${index + 1}`,
      content: `This is a mock comment ${index + 1}.`,
    }));
  }

  // Set initial comments
  useEffect(() => {
    setComments(initialComments);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        username: 'CurrentUser', // Replace with actual current user
        content: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  console.log('Comments:', comments);

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Post Author */}
        <TouchableOpacity onPress={() => router.push({ pathname: '/userProfile', params: { username: parsedPost.username } })}>
          <Text style={styles.username}>{parsedPost.username}</Text>
        </TouchableOpacity>

        {/* Post Title and Content */}
        <Text style={styles.title}>{parsedPost.title}</Text>
        <Text style={styles.content}>{parsedPost.content}</Text>

        {/* Post Image (if available) */}
        {parsedPost.image && (
          <Image source={parsedPost.image} style={styles.postImage} />
        )}

        {/* Post Info (e.g., time ago, actions) */}
        <View style={styles.postInfo}>
          <Text style={styles.postedHoursAgo}>Posted 2 hours ago</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Add Comment Section */}
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
            <Text style={styles.addCommentButtonText}>Add Comment</Text>
          </TouchableOpacity>
        </View>

        {/* Comments */}
        <View>
          {comments.map((comment: { id: number; username: string; content: string }) => (
            <View key={comment.id} style={styles.commentContainer}>
              {/* Comment Author */}
              <TouchableOpacity onPress={() => router.push({ pathname: '/userProfile', params: { username: comment.username } })}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
              </TouchableOpacity>

              {/* Comment Content */}
              <Text style={styles.commentContent}>{comment.content}</Text>

              {/* Comment Actions */}
              <View style={styles.commentActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.pastelGreen,
  },
  container: {
    padding: 20,
  },
  username: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  postedHoursAgo: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  actionText: {
    fontSize: 14,
    color: 'blue',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addCommentButton: {
    backgroundColor: Colors.brightPastelGreen,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addCommentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentContainer: {
    marginBottom: 10,
    backgroundColor: Colors.pastelYellow, // Add background color for visibility
    padding: 10, // Add padding for better spacing
    borderRadius: 5, // Optional: Add rounded corners
  },
  commentUsername: {
    fontSize: 12,
    color: 'black',
    marginBottom: 5,
  },
  commentContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentActions: {
    flexDirection: 'row',
  },
});

export default ShowComments;