const CLOUDFRONT_DOMAIN = process.env.REACT_APP_CLOUDFRONT_DOMAIN;
console.log('CLOUDFRONT_DOMAIN:', process.env.REACT_APP_CLOUDFRONT_DOMAIN);

export const fetchManifest = async () => {
  try {
    const response = await fetch(`${CLOUDFRONT_DOMAIN}/manifest.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch image manifest');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching manifest:', error);
    return [];
  }
};

export const getImageUrl = (imagePath) => {
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
};