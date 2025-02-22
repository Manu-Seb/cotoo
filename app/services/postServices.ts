import api from './api';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  media: string[];
  likes: number;
  commentCount: number;
}

interface Comment {
  id: string;
  post: string;
  author: string;
  content: string;
  likesCount: number;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface MediaFile {
  uri: string;
  name: string;
  type: string;
}

const createPost = async (
  title: string,
  content: string,
  author: string,
  mediaFiles: MediaFile[]
): Promise<ApiResponse<Post>> => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    mediaFiles.forEach((file, index) => {
      formData.append('media', {
        uri: file.uri,
        name: `media${index}.jpg`,
        type: file.type,
      });
    });

    const response = await api.post<ApiResponse<Post>>('/posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const fetchAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const editPost = async (
  postId: string,
  title: string,
  content: string,
  token: string
): Promise<ApiResponse<Post>> => {
  try {
    const response = await api.put<ApiResponse<Post>>(
      `/posts/${String(postId)}`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error editing post:', error);
    throw error;
  }
};

const deletePost = async (postId: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/posts/${String(postId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

const addComment = async (
  postId: string,
  content: string,
  token: string
): Promise<ApiResponse<Comment>> => {
  try {
    const response = await api.post<ApiResponse<Comment>>(
      `/posts/${String(postId)}/comment`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const fetchComments = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>(`/posts/${String(postId)}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

const likePost = async (postId: string, token: string): Promise<ApiResponse<Post>> => {
  try {
    const response = await api.post<ApiResponse<Post>>(
      `/posts/${String(postId)}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

const unlikePost = async (postId: string, token: string): Promise<ApiResponse<Post>> => {
  try {
    const response = await api.post<ApiResponse<Post>>(
      `/posts/${String(postId)}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};

export default {
  createPost,
  fetchAllPosts,
  editPost,
  deletePost,
  addComment,
  fetchComments,
  likePost,
  unlikePost,
};