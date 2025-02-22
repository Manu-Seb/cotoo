import api from './api'; // Import the configured axios instance

// Login
const login = async (email:string, password:string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { token, user }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Signup
const signup = async (username : string, email: string, password:string) => {
  try {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data; // { token, user }
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Fetch User Details
const fetchUserDetails = async (userId:string) => {
  try {
    const response = await api.get(`/auth/user/${userId}`);
    return response.data; // { username, posts }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Logout (if needed)
const logout = async () => {
  try {
    // Clear token or session (e.g., remove from AsyncStorage)
    return { message: 'Logged out successfully' };
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export default {
  login,
  signup,
  fetchUserDetails,
  logout,
};