export default async function handler(req, res) {
  const { blockId } = req.query;

  if (req.method === "GET") {
    try {
      let allResults = [];
      let hasMore = true;
      let nextCursor = undefined;

      // Recursively fetch beyond 100 results limit
      while (hasMore) {
        const url = new URL(
          `https://api.notion.com/v1/blocks/${blockId}/children`
        );
        if (nextCursor) {
          url.searchParams.append("start_cursor", nextCursor);
        }
        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
          },
        });

        const data = await response.json();
        allResults = [...allResults, ...data.results];
        hasMore = data.has_more;
        nextCursor = data.next_cursor;
      }
      res.status(200).json({ results: allResults });
    } catch (error) {
      console.error("Error fetching block children:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching block children" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
