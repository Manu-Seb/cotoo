import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import TaskPanel from '../../components/TaskPanel';
import { Text, View } from '@/components/Themed';
import VirtualPet from '@/components/Character';
import taskServices from '../services/taskServices'; // Correct import for default export

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  // Only ONE useEffect!
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await taskServices.fetchDailyTask(); 
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks(); // Call the fetchTasks function inside useEffect
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <View style={styles.container}>
      <VirtualPet />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.pastelGreen} />
      ) : tasks.length > 0 ? (
        <TaskPanel
          style={styles.taskPanel}
          tasks={tasks}
          onTaskComplete={(taskId) => {
            setTasks(
              tasks.map((task) =>
                task.id === taskId ? { ...task, completed: true } : task
              )
            );
          }}
        />
      ) : (
        <Text>No tasks available.</Text>
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