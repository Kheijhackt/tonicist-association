import { useEffect, useState } from "react";
import HomeEditor from "./admin/components/HomeEditor";
import EventsEditor from "./admin/components/EventsEditor";
import PerformancesEditor from "./admin/components/PerformancesEditor";
import ResourcesEditor from "./admin/components/ResourcesEditor";
import GroupPhotosEditor from "./admin/components/GroupPhotosEditor";
import FunnyMomentsEditor from "./admin/components/FunnyMomentsEditor";

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

      <HomeEditor
        home={data.home}
        onChange={(home) => setData({ ...data, home })}
      />

      <EventsEditor
        events={data.events}
        onChange={(events) => setData({ ...data, events })}
      />

      <PerformancesEditor
        performances={data.performances}
        onChange={(performances) => setData({ ...data, performances })}
      />

      <ResourcesEditor
        resources={data.resources}
        onChange={(resources) => setData({ ...data, resources })}
      />

      <GroupPhotosEditor
        groupPhotos={data.gallery.groupPhotos}
        onChange={(groupPhotos) =>
          setData({ ...data, gallery: { ...data.gallery, groupPhotos } })
        }
      />

      <FunnyMomentsEditor
        funnyMoments={data.gallery.funnyMoments}
        onChange={(funnyMoments) =>
          setData({ ...data, gallery: { ...data.gallery, funnyMoments } })
        }
      />

      <br />
      <br />
      <button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save All"}
      </button>
    </div>
  );
}
