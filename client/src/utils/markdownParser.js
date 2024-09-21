export const parseMarkdownContent = (content) => {
  console.log('Parsing markdown content:', content.slice(0, 100) + '...');
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    console.error('No front matter found in content');
    throw new Error('No front matter found');
  }
  const frontMatter = frontMatterMatch[1];
  console.log('Front matter:', frontMatter);
  const markdownContent = content.replace(/^---\n[\s\S]*?\n---/, '').trim();
  console.log('Markdown content:', markdownContent.slice(0, 100) + '...');
  
  const metadata = Object.fromEntries(
    frontMatter.split('\n').map(line => {
      const [key, ...value] = line.split(':');
      return [key.trim(), value.join(':').trim()];
    })
  );
  console.log('Parsed metadata:', metadata);

  return { metadata, content: markdownContent };
};