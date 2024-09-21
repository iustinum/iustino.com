// Load environment variables
require('dotenv').config({ path: '../.env' });

// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Set up environment variables
const PORT = process.env.PORT || 3001;
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// Endpoint to fetch posts from Strapi
app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/posts`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts');
  }
});

// Endpoint to fetch a single post from Strapi by ID or slug
app.get('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/posts/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(error.response?.status || 500).send('Error fetching post');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});