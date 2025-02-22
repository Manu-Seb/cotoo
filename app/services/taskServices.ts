import api from './api'; // Import the configured axios instance

// Fetch Daily Task
const fetchDailyTask = async () => {
  try {
    const response = await api.get('/community/daily');
    return response.data; // { taskId, date, participants }
  } catch (error) {
    console.error('Error fetching daily task:', error);
    throw error;
  }
};

// Mark Task as Completed
const completeCommunityTask = async (userId:string) => {
  try {
    const response = await api.post('/community/complete', { userId });
    return response.data; // { message, totalParticipants }
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
};

// Fetch Milestone Progress
const fetchMilestoneProgress = async () => {
  try {
    const response = await api.get('/community/milestone');
    return response.data; // { message, totalParticipants, milestonesReached }
  } catch (error) {
    console.error('Error fetching milestone progress:', error);
    throw error;
  }
};

export default {
  fetchDailyTask,
  completeCommunityTask,
  fetchMilestoneProgress,
};