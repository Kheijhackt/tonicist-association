import { useEffect, useState } from "react";
import HomeEditor from "./admin/components/HomeEditor";

const GIST_ID = import.meta.env.VITE_GIST_ID;
const FILE_NAME = "tonicist-contents.json";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export default function Admin() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  // -----------------------------
  // 1. FETCH GIST JSON
  // -----------------------------
  useEffect(() => {
    async function load() {
      const res = await fetch(`https://api.github.com/gists/${GIST_ID}`);
      const gist = await res.json();
      const fileContent = gist.files[FILE_NAME].content;
      setData(JSON.parse(fileContent));
    }
    load();
  }, []);

  // -----------------------------
  // 2. SAVE GIST JSON
  // -----------------------------
  async function save() {
    setSaving(true);

    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          [FILE_NAME]: {
            content: JSON.stringify(data, null, 2),
          },
        },
      }),
    });

    setSaving(false);
    alert("Saved!");
  }

  if (!data) return;

  // -----------------------------
  // 3. RENDER EDITORS HERE
  // -----------------------------
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      {/* HOME EDITOR */}
      <HomeEditor
        home={data.home}
        onChange={(home) => setData({ ...data, home })}
      />

      {/* OTHER EDITORS WILL FOLLOW */}

      <br />
      <br />
      <button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save All"}
      </button>
    </div>
  );
}
