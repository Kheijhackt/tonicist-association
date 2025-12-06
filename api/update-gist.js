// api/update-gist.js
import { verifyAdminPassword } from "./admin-auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, password } = req.body;

  try {
    // Verify password
    if (!verifyAdminPassword(password)) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Validate env variables
    const { GIST_ID, GITHUB_TOKEN } = process.env;
    if (!GIST_ID || !GITHUB_TOKEN) {
      console.error("Missing GIST_ID or GITHUB_TOKEN");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    // Validate content
    if (!content || typeof content !== "object") {
      return res.status(400).json({ error: "Invalid content" });
    }

    // Update GitHub gist
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          "tonicist-contents.json": {
            content: JSON.stringify(content, null, 2),
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("GitHub API error:", data);
      return res
        .status(response.status)
        .json({ error: "Failed to update gist", details: data });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Update-gist server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
