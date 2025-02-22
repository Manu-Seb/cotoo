import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface Task {
  id: string;
  content: string;
  completed: boolean;
}

interface TaskPanelProps {
  style?: object;
  tasks: Task[]; // Array of tasks
  onTaskComplete?: (taskId: string) => void; // Callback when a task is completed
}

const TaskPanel: React.FC<TaskPanelProps> = ({ style, tasks, onTaskComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Track if the panel is expanded
  const contentHeightAnim = useRef(new Animated.Value(100)).current; // Initial height for minimized view (increased to 100)

  const handlePress = () => {
    Animated.timing(contentHeightAnim, {
      toValue: isExpanded ? 100 : screenHeight * 0.5, // Toggle between minimized (100) and expanded height
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

  const handleTaskComplete = (taskId: string) => {
    if (onTaskComplete) {
      onTaskComplete(taskId); // Notify parent component that the task is completed
    }
  };

  return (
    <View style={[styles.outerContainer, style]}>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <Text style={styles.tasksText}>Tasks</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.panel, { height: contentHeightAnim }]}>
        {tasks.length === 0 ? ( // Check if there are no tasks
          <View style={styles.noTasksContainer}>
            <Text style={styles.noTasksText}>No more tasks!</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            {tasks.slice(0, isExpanded ? tasks.length : 1).map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
                onPress={() => handleTaskComplete(task.id)}
              >
                <View style={styles.taskCircle}>
                  {task.completed && <View style={styles.taskCheckmark} />}
                </View>
                <View style={styles.taskTextContainer}>
                  <Text style={styles.taskText}>{task.content}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </Animated.View>
    </View>
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
    overflow: 'hidden', // Ensure content doesn't overflow
  },
  content: {
    flexGrow: 1, // Allow content to grow
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
  taskTextContainer: {
    flex: 1, // Take up remaining space
  },
  taskText: {
    fontSize: 16,
    color: '#333', // Ensure text color is visible
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 16,
    color: '#666', // Subtle color for the "No more tasks" message
  },
});

export default TaskPanel;