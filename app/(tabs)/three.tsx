import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Text, View, Modal } from 'react-native';
import Colors from '../../constants/Colors';
import PostPanel from '../../components/PostPanel';
import NewPost from '../newPost'; // Import the NewPost component

const screenWidth = Dimensions.get('window').width;

export default function TabTwoScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <ScrollView contentContainerStyle={styles.outerContainer}>
        <Text style={styles.tasksText}>Community</Text>
        <PostPanel title="Post Title 1" content="This is the content of post 1." username="User1" createdTime={new Date(Date.now() - 3600000)} />
        <PostPanel title="Post Title 2" content="This is the content of post 2." username="User2" createdTime={new Date(Date.now() - 7200000)} />
        <PostPanel title="Post Title 3" content="This is the content of post 3." username="User3" createdTime={new Date(Date.now() - 10800000)} />
        <PostPanel title="Post Title 4" content="This is the content of post 4." username="User4" createdTime={new Date(Date.now() - 14400000)} />
        <PostPanel title="Post Title 5" content="This is the content of post 5." username="User5" createdTime={new Date(Date.now() - 18000000)} />
        <PostPanel title="Post Title 6" content="This is the content of post 6." username="User6" createdTime={new Date(Date.now() - 21600000)} />
        <PostPanel title="Post Title 7" content="This is the content of post 7." username="User7" createdTime={new Date(Date.now() - 25200000)} />
        <PostPanel title="Post Title 8" content="This is the content of post 8." image={require('../../assets/images/ducky.png')} username="User8" createdTime={new Date(Date.now() - 28800000)} />
        <PostPanel title="Post Title 9" content="This is the content of post 9." image={require('../../assets/images/ducky.png')} username="User9" createdTime={new Date(Date.now() - 32400000)} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleOpenModal}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* NewPost Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <NewPost />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tasksText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  outerContainer: {
    flexGrow: 1, // Allow the ScrollView to grow
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brightPastelGreen, // Outer container background color
    padding: 30, // Padding to create the margin effect
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 15, // Rounded corners for the outer container
    marginHorizontal: 10, // Margin on left and right
    width: screenWidth - 20, // Set width to screen width minus 20 pixels (10 pixels margin on each side)
  },
  container: {
    backgroundColor: Colors.skyBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 60,
    height: 60,
    backgroundColor: Colors.pastelYellow, // Use Colors.pastelYellow for the FAB background color
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', // Ensure the plus symbol is centered
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
