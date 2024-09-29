const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// get blog post list and details
app.post('/api/blogPosts', async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.REACT_APP_NOTION_DATABASE_ID}/query`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching blog posts' });
  }
});

// get blog post details
app.get('/api/blocks/:blockId/children', async (req, res) => {
    try {
      const { blockId } = req.params;
      const response = await axios.get(
        `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching block children:', error);
      res.status(500).json({ error: 'An error occurred while fetching block children' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});