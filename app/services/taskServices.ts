import api from './api'; // Import the configured axios instance

interface Task {
  id: string;
  title: string;
  description: string;
}

interface UserTask {
  id: string;
  userId: string;
  taskId: Task;
  date: string;
  completed: boolean;
}

// Fetch today's random task for a user
export const fetchDailyTask = async (userId: string): Promise<Task> => {
  try {
    const response = await api.get('/tasks/daily', { params: { userId } });
    return response.data; // Returns the task object
  } catch (error) {
    console.error('Error fetching daily task:', error);
    throw error;
  }
};

// Mark a task as complete
export const completeTask = async (userId: string, taskId: string): Promise<{ message: string; taskId: string }> => {
  try {
    const response = await api.post('/tasks/complete', { userId, taskId });
    return response.data; // Returns success message and taskId
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
};

export default {
  fetchDailyTask,
  completeTask,
};