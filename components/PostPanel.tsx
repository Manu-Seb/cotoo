import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import AddComment from './AddComment'; // Import the AddComment component

const screenWidth = Dimensions.get('window').width;

interface PostPanelProps {
  title: string;
  content: string;
  image?: any; // Optional image prop, can be a number when using require
  username: string;
  createdTime: Date; // Created time as a Date object
}

const PostPanel: React.FC<PostPanelProps> = ({ title, content, image, username, createdTime }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    // TODO: Implement backend call to update likes
  };

  const handleComment = () => {
    setCommentModalVisible(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModalVisible(false);
  };

  const handleShare = () => {
    setSharesCount(sharesCount + 1);
    // TODO: Implement backend call to share the post
  };

  // Calculate hours ago
  const hoursAgo = Math.floor((new Date().getTime() - createdTime.getTime()) / (1000 * 60 * 60));

  return (
    <View style={styles.outerPanel}>
      <TouchableOpacity style={styles.taskItem} onPress={handleComment}>
        <View style={styles.panel}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>
            {image && (
              <Image source={image} style={styles.postImage} />
            )}
            <View style={styles.content}>
              <Text style={styles.postContent}>
                {content}
              </Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.hoursAgo}>Posted {hoursAgo} hours ago</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                <Icon name={isLiked ? 'thumbs-up' : 'thumbs-o-up'} size={20} color="#000" />
                <Text style={styles.actionText}> ({likesCount})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
                <Icon name="comment-o" size={20} color="#000" />
                <Text style={styles.actionText}> ({commentsCount})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Icon name="share" size={20} color="#000" />
                <Text style={styles.actionText}> ({sharesCount})</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Add Comment Modal */}
      <Modal visible={commentModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AddComment visible={commentModalVisible} onAddComment={() => {}} onClose={handleCloseCommentModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outerPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 40,
    marginVertical: 2,
  },
  panel: {
    backgroundColor: Colors.pastelGreen, // Inner panel background color
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the panel
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%', // Set width to 100% of the outer container
  },
  contentContainer: {
    backgroundColor: Colors.brightPastelGreen, // Background color for content container
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items on opposite ends
    alignItems: 'center', // Vertically center items
    marginBottom: 5, // Space between header and content
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Example color
  },
  content: {
    // Styles for the content area
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionsContainer: {
    backgroundColor: Colors.brightPastelGreen, // Background color for actions container
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  hoursAgo: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#000', // Black color for action text
  },
  tasksText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000', // Example border color
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000', // Example checkmark color
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%', // Ensure the modal content does not exceed the screen height
    position: 'relative', // Ensure the close button is positioned relative to this container
  },
});

export default PostPanel;