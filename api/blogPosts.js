export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(
        `https://api.notion.com/v1/databases/${process.env.REACT_APP_NOTION_DATABASE_ID}/query`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'An error occurred while fetching blog posts' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}