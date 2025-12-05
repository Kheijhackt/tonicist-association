export default function HomeEditor({ home, onChange }) {
  return (
    <div>
      <h2 style={{ textAlign: "left" }}>Home Section</h2>

      <label>Title</label>
      <input
        value={home.title}
        onChange={(e) => onChange({ ...home, title: e.target.value })}
      />

      <label>Subtitle</label>
      <textarea
        value={home.subtitle}
        onChange={(e) => onChange({ ...home, subtitle: e.target.value })}
      />

      <label>Background Image</label>
      <input
        value={home.backgroundImagePath}
        onChange={(e) =>
          onChange({ ...home, backgroundImagePath: e.target.value })
        }
      />
    </div>
  );
}
