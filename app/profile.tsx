import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors'

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const [username, setUsername] = useState<string>('JohnDoe');
  const [level, setLevel] = useState<number>(5);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Task 1', completed: false },
    { id: '2', title: 'Task 2', completed: true },
    { id: '3', title: 'Task 3', completed: false },
  ]);

  // Handle logout
  const handleLogout = () => {
    console.log('User logged out');
    onClose();
  };

  // Render a single task item
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={item.completed ? styles.taskCompleted : styles.taskPending}>
        {item.completed ? 'Completed' : 'Pending'}
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.level}>Level: {level}</Text>
        </View>

        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          style={styles.taskList}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.pastelGreen,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  level: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  taskList: {
    flex: 1,
    marginTop: 10,
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    color: '#333',
  },
  taskCompleted: {
    color: 'green',
    fontWeight: 'bold',
  },
  taskPending: {
    color: 'red',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileModal;