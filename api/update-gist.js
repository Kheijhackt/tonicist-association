export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content, password } = req.body;

    // Verify password via admin-auth endpoint
    const authResponse = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const authData = await authResponse.json();

    if (!authResponse.ok || !authData.authenticated) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Update GitHub gist
    const response = await fetch(
      `https://api.github.com/gists/${process.env.GIST_ID}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: {
            "tonicist-contents.json": {
              content: JSON.stringify(content, null, 2),
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to update gist", details: data });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
