export default function PerformancesEditor({ performances, onChange }) {
  function updateVideo(index, newVideo) {
    const updated = [...performances.videos];
    updated[index] = newVideo;
    onChange({ ...performances, videos: updated });
  }

  function addVideo() {
    const newVideo = {
      videoId: "",
      title: "",
      date: "",
      description: "",
      pdfPath: "",
    };

    const updated = [newVideo, ...performances.videos];

    onChange({ ...performances, videos: updated });
  }

  function removeVideo(index) {
    const updated = performances.videos.filter((_, i) => i !== index);
    onChange({ ...performances, videos: updated });
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ textAlign: "left" }}>Performances Section</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={performances.title}
        onChange={(e) => onChange({ ...performances, title: e.target.value })}
        style={{ marginBottom: "30px" }}
      />

      <button
        onClick={addVideo}
        style={{
          width: "100%", // full width
          padding: "10px 0", // some vertical padding
          fontSize: "20px", // a bit bigger
          borderRadius: "20px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        + Add Video
      </button>

      {performances.videos.map((video, index) => (
        <VideoItemEditor
          key={index}
          index={index}
          video={video}
          total={performances.videos.length} // <-- pass total here
          onChange={(v) => updateVideo(index, v)}
          onDelete={() => removeVideo(index)}
        />
      ))}
    </div>
  );
}

// -----------------------------------------------------
// VideoItemEditor (subcomponent)
// -----------------------------------------------------
function VideoItemEditor({ video, index, total, onChange, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        display: "flex", // make the card a flex container
        flexDirection: "column", // stack inputs vertically
      }}
    >
      <h4>Video #{total - index}</h4>

      <label>Video ID (YouTube)</label>
      <input
        value={video.videoId}
        onChange={(e) => onChange({ ...video, videoId: e.target.value })}
      />

      <label>Title</label>
      <input
        value={video.title}
        onChange={(e) => onChange({ ...video, title: e.target.value })}
      />

      <label>Date (DD/MM/YYYY)</label>
      <input
        value={video.date}
        onChange={(e) => onChange({ ...video, date: e.target.value })}
      />

      <label>Description</label>
      <textarea
        value={video.description}
        onChange={(e) => onChange({ ...video, description: e.target.value })}
      />

      <label>PDF Path</label>
      <input
        value={video.pdfPath}
        onChange={(e) => onChange({ ...video, pdfPath: e.target.value })}
      />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onDelete}
          style={{
            marginTop: 10,
            backgroundColor: "red",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          - Remove
        </button>
      </div>
    </div>
  );
}
