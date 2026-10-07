//for writing repeated helper functions
//generate slug is for generating titles in url or like url friendly piece of text (slug) instead of a random number 
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special characters
    .replace(/\s+/g, '-')        // replace spaces with hyphens
    .replace(/-+/g, '-');        // collapse multiple hyphens
};