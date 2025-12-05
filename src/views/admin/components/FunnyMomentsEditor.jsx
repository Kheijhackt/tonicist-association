export default function FunnyMomentsEditor({ funnyMoments, onChange }) {
  // Update a single image
  function updateImage(index, newImage) {
    const updated = [...funnyMoments.images];
    updated[index] = newImage;
    onChange({ ...funnyMoments, images: updated });
  }

  // Add new image at top
  function addImage() {
    const newImage = {
      img: "",
      title: "",
      description: "",
    };
    const updated = [newImage, ...funnyMoments.images];
    onChange({ ...funnyMoments, images: updated });
  }

  // Remove an image
  function removeImage(index) {
    const updated = funnyMoments.images.filter((_, i) => i !== index);
    onChange({ ...funnyMoments, images: updated });
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ textAlign: "left" }}>Funny Moments Section</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={funnyMoments.title}
        onChange={(e) => onChange({ ...funnyMoments, title: e.target.value })}
        style={{ marginBottom: "30px" }}
      />

      <button
        onClick={addImage}
        style={{
          width: "100%", // full width
          padding: "10px 0", // some vertical padding
          fontSize: "20px", // a bit bigger
          borderRadius: "20px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        + Add Image
      </button>

      {funnyMoments.images.map((image, index) => (
        <ImageItemEditor
          key={index}
          index={index}
          total={funnyMoments.images.length}
          image={image}
          onChange={(v) => updateImage(index, v)}
          onDelete={() => removeImage(index)}
        />
      ))}
    </div>
  );
}

// -----------------------------------------------------
// ImageItemEditor (subcomponent)
// -----------------------------------------------------
function ImageItemEditor({ image, index, total, onChange, onDelete }) {
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
      <h4>Image #{total - index}</h4>

      <label>Image URL</label>
      <input
        value={image.img}
        onChange={(e) => onChange({ ...image, img: e.target.value })}
      />

      <label>Title</label>
      <input
        value={image.title}
        onChange={(e) => onChange({ ...image, title: e.target.value })}
      />

      <label>Description</label>
      <textarea
        value={image.description}
        onChange={(e) => onChange({ ...image, description: e.target.value })}
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
