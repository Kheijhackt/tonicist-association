import { useState, useContext } from "react";
import ContentContext from "../utils/ContentContext";
import AdminLogin from "./admin/AdminLogin";
import HomeEditor from "./admin/components/HomeEditor";
import EventsEditor from "./admin/components/EventsEditor";
import PerformancesEditor from "./admin/components/PerformancesEditor";
import ResourcesEditor from "./admin/components/ResourcesEditor";
import GroupPhotosEditor from "./admin/components/GroupPhotosEditor";
import FunnyMomentsEditor from "./admin/components/FunnyMomentsEditor";
import FaqsEditor from "./admin/components/FaqsEditor";
import AboutEditor from "./admin/components/AboutEditor";
import LoadingModal from "../components/LoadingModal";
import DisplayAlert from "../components/DisplayAlert";

export default function Admin() {
  const contextData = useContext(ContentContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState(contextData);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [enteredPassword, setEnteredPassword] = useState(""); // This is the entered password from the user

  async function save() {
    setLoading(true);
    let result = {};
    try {
      const res = await fetch("/api/update-gist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data, password: enteredPassword }),
      });

      try {
        result = await res.json();
      } catch {
        result = { error: "Server returned invalid JSON" };
      }

      if (res.ok) {
        <DisplayAlert severity="success" message="Saved successfully" />;
      } else {
        <DisplayAlert
          severity="error"
          message={`${result.error || "Unknown error"}`}
        />;
      }
    } catch (err) {
      <DisplayAlert severity="error" message={`${err.message}`} />;
    }
    setLoading(false);
  }

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

  return (
    <div style={{ padding: 20, position: "relative" }}>
      <LoadingModal visible={loading} />
      <h1>Admin Panel</h1>

      {/* Dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            outline: "none",
            backgroundColor: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
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
      </div>

      {/* Active editor */}
      {sections[activeSection]}

      <br />
      <br />
      <button
        onClick={save}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 0",
          fontSize: "20px",
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Saving..." : "Save All"}
      </button>

      {/* Admin password modal */}
      {!authenticated && (
        <AdminLogin
          isLoading={(isLoading) => setLoading(isLoading)}
          onAuthenticated={(pwd) => {
            setEnteredPassword(pwd);
            setAuthenticated(true);
          }}
        />
      )}
    </div>
  );
}
