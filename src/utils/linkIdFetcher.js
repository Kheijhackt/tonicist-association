// Extract YouTube video ID
export function getYouTubeId(url) {
  if (!url) return "";

  // Handles:
  // https://www.youtube.com/watch?v=VIDEOID
  // https://youtu.be/VIDEOID
  // https://www.youtube.com/embed/VIDEOID
  // With or without extra parameters (?t=10s etc)
  const patterns = [
    /v=([^&]+)/,          // watch?v=ID
    /youtu\.be\/([^?]+)/, // youtu.be/ID
    /embed\/([^?]+)/      // embed/ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return "";
}


// Extract Google Form ID
export function getGoogleFormId(url) {
  if (!url) return "";

  // Google Forms structure:
  // https://docs.google.com/forms/d/e/FORM_ID/viewform
  const match = url.match(/\/d\/e\/([^/]+)/);

  return match ? match[1] : "";
}
