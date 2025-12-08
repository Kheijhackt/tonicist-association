export default function AnnouncerEditor({ announcements, onChange }) {
  return (
    <div>
      <h2 style={{ textAlign: "left" }}>Announcements Section</h2>

      {/* Title */}
      <label>Title</label>
      <input
        type="text"
        value={announcements.title}
        onChange={(e) => onChange({ ...announcements, title: e.target.value })}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {/* Message */}
      <label>Message</label>
      <textarea
        value={announcements.message}
        onChange={(e) =>
          onChange({ ...announcements, message: e.target.value })
        }
        style={{
          width: "100%",
          padding: "8px",
          height: "150px",
          marginBottom: "10px",
          resize: "vertical",
        }}
      />

      {/* Active Dropdown */}
      <label>Is this active?</label>
      <br />
      <select
        value={announcements.active ? "true" : "false"}
        onChange={(e) =>
          onChange({ ...announcements, active: e.target.value === "true" })
        }
        style={{
          width: "25%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}
