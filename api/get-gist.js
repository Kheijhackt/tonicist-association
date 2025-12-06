// api/get-gist.js
export default async function handler(req, res) {
  try {
    const url = process.env.CONTENT_API; // environment variable
    if (!url) {
      return res.status(500).json({ error: "CONTENT_API is not defined" });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch gist" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
