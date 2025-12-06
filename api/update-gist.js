// api/update-gist.js
import { verifyAdminPassword } from "./admin-auth";

export default async function handler(req, res) {
  console.log("=== update-gist called ===");
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  if (req.method !== "POST") {
    console.log("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, password } = req.body;

  try {
    // Verify password
    console.log("Verifying admin password...");
    const isAuth = verifyAdminPassword(password);
    console.log("Password valid?", isAuth);

    if (!isAuth) {
      console.log("Unauthorized access attempt");
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Validate env variables
    const { GIST_ID, GITHUB_TOKEN } = process.env;
    console.log("GIST_ID:", GIST_ID);
    console.log("GITHUB_TOKEN exists?", !!GITHUB_TOKEN);

    if (!GIST_ID || !GITHUB_TOKEN) {
      console.error("Missing GIST_ID or GITHUB_TOKEN");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    // Validate content
    console.log("Validating content...");
    if (!content || typeof content !== "object") {
      console.error("Invalid content:", content);
      return res.status(400).json({ error: "Invalid content" });
    }

    // Update GitHub gist
    console.log("Sending PATCH request to GitHub Gist...");
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

    console.log("GitHub response status:", response.status);
    let dataText;
    try {
      dataText = await response.text(); // Read raw text first
      console.log("GitHub response text:", dataText);
    } catch (err) {
      console.error("Failed to read GitHub response:", err);
      return res.status(500).json({ error: "Failed to read GitHub response" });
    }

    let dataJson;
    try {
      dataJson = JSON.parse(dataText); // parse into JSON
      console.log("GitHub response JSON:", dataJson);
    } catch (err) {
      console.error("Failed to parse GitHub response as JSON:", err);
      return res.status(500).json({
        error: "GitHub response is not valid JSON",
        details: dataText,
      });
    }

    if (!response.ok) {
      console.error("GitHub API returned error:", dataJson);
      return res
        .status(response.status)
        .json({ error: "Failed to update gist", details: dataJson });
    }

    console.log("Gist updated successfully!");
    res.status(200).json({ success: true, data: dataJson });
  } catch (err) {
    console.error("Update-gist server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
