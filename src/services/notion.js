const API_URL = "/api";

export const fetchBlogPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/blogPosts`, {
      method: "POST",
    });
    const data = await response.json();
    return data.results.map((page) => ({
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text || "",
      excerpt: page.properties.Excerpt.rich_text[0]?.plain_text || "",
      coverImage: page.properties["Cover Image"].files[0]?.file.url || "",
      publishDate: page.properties["Created Time"].created_time,
      slug: page.properties.Slug.rich_text[0]?.plain_text || "",
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

export const fetchChildBlocks = async (blockId) => {
  try {
    const response = await fetch(`${API_URL}/blocks/${blockId}/children`);
    const data = await response.json();
    const blocks = data.results;

    const processedBlocks = [];
    const blocksWithChildren = [];

    await Promise.all(
      blocks.map(async (block) => {
        const parsedBlock = {
          id: block.id,
          type: block.type,
          content: block[block.type],
        };

        if (block.has_children) {
          blocksWithChildren.push(parsedBlock);
        }

        processedBlocks.push(parsedBlock);
      })
    );

    await Promise.all(
      blocksWithChildren.map(async (parsedBlock) => {
        const childBlocks = await fetchChildBlocks(parsedBlock.id);
        parsedBlock.children = childBlocks;
      })
    );

    return processedBlocks;
  } catch (error) {
    console.error("Error fetching child blocks:", error);
    return [];
  }
};
