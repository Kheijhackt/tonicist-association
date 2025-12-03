export function convertDrivePdfToEmbedLink(driveLink) {
  if (!driveLink) return "";

  // Robust regex to match the file ID in various Drive URL formats
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)(\/|$|\?)/);

  if (!match || !match[1]) {
    return "";
  }

  const fileId = match[1];

  // Build the embed link for PDF preview
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function convertDriveImageToEmbedLink(driveLink) {
  if (!driveLink) return "";

  // Extract the file ID from the Drive link
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)(\/|$|\?)/);

  if (!match || !match[1]) return "";

  const fileId = match[1];

  // Construct the Googleusercontent link for images
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}
