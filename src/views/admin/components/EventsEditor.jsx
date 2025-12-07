export default function EventsEditor({ events, onChange }) {
  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ textAlign: "left" }}>Events Section</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={events.title}
        onChange={(e) => onChange({ ...events, title: e.target.value })}
      />

      {/* GOOGLE CALENDAR EMBED URL */}
      <label>Google Calendar URL</label>
      <input
        value={events.googleCalendarUrl}
        onChange={(e) =>
          onChange({ ...events, googleCalendarUrl: e.target.value })
        }
      />

      {/* TIMER TEXT */}
      <label>Timer Text</label>
      <input
        value={events.timerText}
        onChange={(e) => onChange({ ...events, timerText: e.target.value })}
      />

      {/* TIMER GOAL DATE */}
      <label>Timer Goal (GMT +8)</label>
      <input
        type="datetime-local"
        value={
          events.timerGoal
            ? events.timerGoal.slice(0, 16) // "2025-12-08T11:00"
            : ""
        }
        onChange={(e) => {
          const raw = e.target.value; // "2025-12-08T11:00"

          if (!raw) {
            onChange({ ...events, timerGoal: "" });
            return;
          }

          // Convert back into +08:00 full format
          const zoned = `${raw}:00+08:00`;

          onChange({ ...events, timerGoal: zoned });
        }}
      />
    </div>
  );
}
