export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const url = process.env.GET_VISIT_COUNT_API; // environment variable
    if (!url) {
      return res.status(500).json({ error: "API is not defined" });
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to get visit count" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}
