// api/fetch-gist.js
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST" });

  const { filename } = req.body || {};
  const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
  const GIST_ID = process.env.VITE_GIST_ID;
  if (!GITHUB_TOKEN || !GIST_ID)
    return res.status(500).json({ error: "Server misconfigured" });

  if (!filename) return res.status(400).json({ error: "filename required" });

  try {
    const r = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });
    const j = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: j });

    const files = j.files || {};
    if (!files[filename])
      return res.status(404).json({ error: "File not found in gist" });

    const content = files[filename].content || "";
    return res.status(200).json({ content, gist: j });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch gist" });
  }
}
