// api/update-gist.js
// Plain Node/Edge-compatible function for Vercel.
// If using Next.js API routes, this file goes under pages/api/update-gist.js

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Basic password check
  const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD;
  const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
  const GIST_ID = process.env.VITE_GIST_ID;
  if (!ADMIN_PASSWORD || !GITHUB_TOKEN || !GIST_ID) {
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const { password, filename, content, commitMessage } = req.body || {};

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (
    !filename ||
    typeof filename !== "string" ||
    !content ||
    typeof content !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "filename and content (string) required" });
  }

  // Optional: basic JSON validation if content supposed to be JSON
  // Uncomment if you expect JSON content:
  // try { JSON.parse(content); } catch (e) { return res.status(400).json({ error: 'Invalid JSON' }); }

  // Prepare patch body
  const body = {
    files: {
      [filename]: {
        content: content,
      },
    },
    // optional: include a commit message for the gist revision
    description: commitMessage || `Updated ${filename} via site admin`,
  };

  try {
    const resp = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return res.status(resp.status).json({ error: data });
    }

    return res.status(200).json({ success: true, gist: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update gist" });
  }
}
