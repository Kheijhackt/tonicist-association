import { useEffect, useState } from "react";
import HomeEditor from "./admin/components/HomeEditor";
import EventsEditor from "./admin/components/EventsEditor";
import PerformancesEditor from "./admin/components/PerformancesEditor";
import ResourcesEditor from "./admin/components/ResourcesEditor";
import GroupPhotosEditor from "./admin/components/GroupPhotosEditor";
import FunnyMomentsEditor from "./admin/components/FunnyMomentsEditor";
import FaqsEditor from "./admin/components/FaqsEditor";
import AboutEditor from "./admin/components/AboutEditor";

const GIST_ID = import.meta.env.VITE_GIST_ID;
const FILE_NAME = "tonicist-contents.json";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export default function Admin() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // <- currently active editor

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
  // 3. MAP SECTIONS TO COMPONENTS
  // -----------------------------
  const sections = {
    home: (
      <HomeEditor
        home={data.home}
        onChange={(home) => setData({ ...data, home })}
      />
    ),
    events: (
      <EventsEditor
        events={data.events}
        onChange={(events) => setData({ ...data, events })}
      />
    ),
    performances: (
      <PerformancesEditor
        performances={data.performances}
        onChange={(performances) => setData({ ...data, performances })}
      />
    ),
    resources: (
      <ResourcesEditor
        resources={data.resources}
        onChange={(resources) => setData({ ...data, resources })}
      />
    ),
    groupPhotos: (
      <GroupPhotosEditor
        groupPhotos={data.gallery.groupPhotos}
        onChange={(groupPhotos) =>
          setData({ ...data, gallery: { ...data.gallery, groupPhotos } })
        }
      />
    ),
    funnyMoments: (
      <FunnyMomentsEditor
        funnyMoments={data.gallery.funnyMoments}
        onChange={(funnyMoments) =>
          setData({ ...data, gallery: { ...data.gallery, funnyMoments } })
        }
      />
    ),
    faqs: (
      <FaqsEditor
        faqs={data.faqs}
        onChange={(faqs) => setData({ ...data, faqs })}
      />
    ),
    about: (
      <AboutEditor
        about={data.about}
        onChange={(about) => setData({ ...data, about })}
      />
    ),
  };

  // -----------------------------
  // 4. RENDER
  // -----------------------------
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      {/* Dropdown to select active editor */}
      <select
        value={activeSection}
        onChange={(e) => setActiveSection(e.target.value)}
        style={{ marginBottom: 20, padding: "5px 10px" }}
      >
        <option value="home">Home</option>
        <option value="events">Events</option>
        <option value="performances">Performances</option>
        <option value="resources">Resources</option>
        <option value="groupPhotos">Gallery - Group Photos</option>
        <option value="funnyMoments">Gallery - Funny Moments</option>
        <option value="faqs">FAQs</option>
        <option value="about">About</option>
      </select>

      {/* Render only the selected editor */}
      {sections[activeSection]}

      <br />
      <br />
      <button
        onClick={save}
        disabled={saving}
        style={{
          width: "100%", // full width
          padding: "10px 0", // some vertical padding
          fontSize: "20px", // a bit bigger
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        {saving ? "Saving..." : "Save All"}
      </button>
    </div>
  );
}
