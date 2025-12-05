export default function GroupPhotosEditor({ groupPhotos, onChange }) {
  // Update a single image
  function updateImage(index, newImage) {
    const updated = [...groupPhotos.images];
    updated[index] = newImage;
    onChange({ ...groupPhotos, images: updated });
  }

  // Add new image at top
  function addImage() {
    const newImage = {
      img: "",
      title: "",
      description: "",
    };
    const updated = [newImage, ...groupPhotos.images];
    onChange({ ...groupPhotos, images: updated });
  }

  // Remove an image
  function removeImage(index) {
    const updated = groupPhotos.images.filter((_, i) => i !== index);
    onChange({ ...groupPhotos, images: updated });
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ textAlign: "left" }}>Group Photos Section</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={groupPhotos.title}
        onChange={(e) => onChange({ ...groupPhotos, title: e.target.value })}
        style={{ marginBottom: "30px" }}
      />

      <button onClick={addImage} style={{ marginTop: 10, marginBottom: 20 }}>
        + Add Image
      </button>

      {groupPhotos.images.map((image, index) => (
        <ImageItemEditor
          key={index}
          index={index}
          total={groupPhotos.images.length}
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
  );
}
