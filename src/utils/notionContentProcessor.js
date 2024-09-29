import { parseNotionBlocks } from '../services/notion';

export const processNotionContent = async (rawBlocks) => {
  const parsedBlocks = await parseNotionBlocks(rawBlocks);
  return parsedBlocks.map(processBlock);
};

const processBlock = (block) => {
    switch (block.type) {
      case 'paragraph':
        return processParagraph(block);
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        return processHeading(block);
      case 'image':
        return processImage(block);
      case 'code':
        return processCode(block);
      case 'bulleted_list_item':
      case 'numbered_list_item':
        return processListItem(block);
      case 'quote':
        return processQuote(block);
      case 'equation':
        return processEquation(block);
      default:
        console.warn(`Unsupported block type: ${block.type}`);
        return null;
    }
  };

const processParagraph = (block) => ({
  type: 'paragraph',
  content: block.content.rich_text
});

const processHeading = (block) => ({
  type: block.type,
  content: block.content.rich_text[0].plain_text
});

const processImage = (block) => ({
  type: 'image',
  url: block.content.file.url,
  caption: block.content.caption?.[0]?.plain_text || ''
});

const processCode = (block) => ({
  type: 'code',
  language: block.content.language,
  content: block.content.rich_text[0].plain_text
});

const processListItem = (block) => ({
  type: block.type,
  content: block.content.rich_text
});

const processQuote = (block) => ({
  type: 'quote',
  content: block.content.rich_text
});

const processEquation = (block) => ({
  type: 'equation',
  expression: block.content.expression
});