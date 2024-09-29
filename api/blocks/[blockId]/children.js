import axios from 'axios';

export default async function handler(req, res) {
  const { blockId } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching block children:', error);
      res.status(500).json({ error: 'An error occurred while fetching block children' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}