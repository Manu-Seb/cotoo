import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import TaskPanel from '../../components/TaskPanel';
import { Text, View } from '@/components/Themed';
import VirtualPet from '@/components/Character';

interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', content: 'Plant a tree!', completed: false },
    { id: '2', content: 'Recycle plastic', completed: false },
    { id: '3', content: 'Use public transport', completed: false },
    { id: '4', content: 'Take a 5-minute shower instead of 10', completed: false },
    { id: '5', content: 'Avoid using a heater and wear warm clothes', completed: false },
    { id: '6', content: 'Use a bicycle instead of a car', completed: false },
    { id: '7', content: 'Turn off lights when leaving a room', completed: false },
    { id: '8', content: 'Use reusable bags instead of plastic bags', completed: false },
    { id: '9', content: 'Compost food waste', completed: false },
    { id: '10', content: 'Use a reusable water bottle', completed: false },
    { id: '11', content: 'Unplug electronics when not in use', completed: false },
    { id: '12', content: 'Buy local produce', completed: false },
    { id: '13', content: 'Avoid single-use plastics', completed: false },
    { id: '14', content: 'Use a clothesline instead of a dryer', completed: false },
    { id: '15', content: 'Reduce meat consumption', completed: false },
    { id: '16', content: 'Use energy-efficient light bulbs', completed: false },
    { id: '17', content: 'Walk or bike for short trips', completed: false },
    { id: '18', content: 'Support eco-friendly brands', completed: false },
    { id: '19', content: 'Use a reusable coffee cup', completed: false },
    { id: '20', content: 'Avoid fast fashion', completed: false },
  ]); // Hardcoded tasks
  const [isLoading, setIsLoading] = useState(false); // Loading state (not used here but kept for consistency)

  const handleTaskComplete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Remove the task from the list
  };

  return (
    <View style={styles.container}>
      <VirtualPet />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.pastelGreen} />
      ) : (
        <TaskPanel
          style={styles.taskPanel}
          tasks={tasks} // Pass the array of tasks
          onTaskComplete={handleTaskComplete} // Use the async function
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.skyBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  taskPanel: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
  },
});