import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Colors from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskPanelProps {
  style?: object;
  tasks: Task[]; // Array of tasks
  onTaskComplete?: (taskId: string) => void; // Callback when a task is completed
}

const TaskPanel: React.FC<TaskPanelProps> = ({ style, tasks, onTaskComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(200)).current; // Initial height of the outer container

  const handlePress = () => {
    Animated.timing(heightAnim, {
      toValue: isExpanded ? 200 : screenHeight / 2, // Toggle between initial height and half the screen height
      duration: 300, // Duration of the animation
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const handleTaskPress = (taskId: string) => {
    if (onTaskComplete) {
      onTaskComplete(taskId); // Notify parent component that the task is completed
    }
  };

  return (
    <Animated.View style={[styles.outerContainer, style, { height: heightAnim }]}>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <Text style={styles.tasksText}>Tasks</Text>
      </TouchableOpacity>
      <View style={styles.panel}>
        <View style={styles.header}>
          {/* You can add an image or other content here if needed */}
        </View>
        <View style={styles.content}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskItem}
              onPress={() => handleTaskPress(task.id)}
            >
              <View style={styles.taskCircle}>
                {task.completed && <View style={styles.taskCheckmark} />}
              </View>
              <Text style={styles.taskText}>{task.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.brightPastelGreen, // Outer container background color
    padding: 30, // Padding to create the margin effect
    borderRadius: 15, // Rounded corners for the outer container
    margin: 20, // Margin around the outer container
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
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
    width: screenWidth * 0.8, // Set width to 80% of the screen width
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items on opposite ends
    alignItems: 'center', // Vertically center items
    marginBottom: 10, // Space between header and content
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Example color
  },
  content: {
    // Styles for the content area
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
});

export default TaskPanel;