export default function ResourcesEditor({ resources, onChange }) {
  // Update a single item
  function updateItem(index, newItem) {
    const updated = [...resources.items];
    updated[index] = newItem;
    onChange({ ...resources, items: updated });
  }

  // Add new item at the top
  function addItem() {
    const newItem = {
      textHeader: "",
      textContent: "",
      pdfPath: "",
    };
    const updated = [newItem, ...resources.items];
    onChange({ ...resources, items: updated });
  }

  // Remove an item
  function removeItem(index) {
    const updated = resources.items.filter((_, i) => i !== index);
    onChange({ ...resources, items: updated });
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ textAlign: "left" }}>Resources Section</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={resources.title}
        onChange={(e) => onChange({ ...resources, title: e.target.value })}
        style={{ marginBottom: "30px" }}
      />

      <button onClick={addItem} style={{ marginTop: 10, marginBottom: 20 }}>
        + Add Resource
      </button>

      {resources.items.map((item, index) => (
        <ResourceItemEditor
          key={index}
          index={index}
          total={resources.items.length}
          item={item}
          onChange={(v) => updateItem(index, v)}
          onDelete={() => removeItem(index)}
        />
      ))}
    </div>
  );
}

// -----------------------------------------------------
// ResourceItemEditor (subcomponent)
// -----------------------------------------------------
function ResourceItemEditor({ item, index, total, onChange, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
      }}
    >
      <h4>Resource #{total - index}</h4>

      <label>Header</label>
      <input
        value={item.textHeader}
        onChange={(e) => onChange({ ...item, textHeader: e.target.value })}
      />

      <label>Content</label>
      <textarea
        value={item.textContent}
        onChange={(e) => onChange({ ...item, textContent: e.target.value })}
      />

      <label>PDF Path</label>
      <input
        value={item.pdfPath}
        onChange={(e) => onChange({ ...item, pdfPath: e.target.value })}
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
