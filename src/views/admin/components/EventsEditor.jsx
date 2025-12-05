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
      <label>Timer Goal (ISO Date Format)</label>
      <input
        type="datetime-local"
        value={events.timerGoal}
        onChange={(e) => onChange({ ...events, timerGoal: e.target.value })}
      />
    </div>
  );
}
