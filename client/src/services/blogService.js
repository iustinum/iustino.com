import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';


// fetches list of blog posts and their details
export const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error.response || error);
    throw error;
  }
};

// fetches content of a specific blog post
export const fetchBlogPost = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${slug}`);
    if (!response.data || !response.data.data) {
      throw new Error('Post not found');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog post:', error.response || error);
    throw error;
  }
};