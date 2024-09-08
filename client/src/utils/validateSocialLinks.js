export const validateSocialLinks = (platform, url) => {
  if (!url) return true; // Allow empty links

  const patterns = {
    twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}\/?$/,
    linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/,
    github: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/
  };

  return patterns[platform].test(url);
};