import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBlogPosts = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/blogPosts`);
    return response.data.results.map(page => ({
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text || '',
      excerpt: page.properties.Excerpt.rich_text[0]?.plain_text || '',
      coverImage: page.properties['Cover Image'].files[0]?.file.url || '',
      publishDate: page.properties['Created Time'].created_time,
      slug: page.properties.Slug.rich_text[0]?.plain_text || '',
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const parseNotionBlocks = async (blocks, depth = 0) => {
    const parsedBlocks = [];
  
    for (const block of blocks) {
      const parsedBlock = {
        id: block.id,
        type: block.type,
        content: block[block.type],
      };
  
      if (block.has_children) {
        const childBlocks = await fetchChildBlocks(block.id);
        parsedBlock.children = await parseNotionBlocks(childBlocks, depth + 1);
      }
  
      parsedBlocks.push(parsedBlock);
    }
  
    return parsedBlocks;
};

const fetchChildBlocks = async (blockId) => {
  try {
    const response = await axios.get(`${API_URL}/api/blocks/${blockId}/children`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching child blocks:', error);
    return [];
  }
};