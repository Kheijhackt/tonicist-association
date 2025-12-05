export default function FaqsEditor({ faqs, onChange }) {
  // Update a single item
  function updateItem(index, newItem) {
    const updated = [...faqs.items];
    updated[index] = newItem;
    onChange({ ...faqs, items: updated });
  }

  // Add new FAQ at top
  function addItem() {
    const newItem = {
      question: "",
      answer: "",
      pdfPath: "",
    };
    const updated = [newItem, ...faqs.items];
    onChange({ ...faqs, items: updated });
  }

  // Remove an FAQ
  function removeItem(index) {
    const updated = faqs.items.filter((_, i) => i !== index);
    onChange({ ...faqs, items: updated });
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ textAlign: "left" }}>FAQs Section</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={faqs.title}
        onChange={(e) => onChange({ ...faqs, title: e.target.value })}
        style={{ marginBottom: "30px" }}
      />

      <button
        onClick={addItem}
        style={{
          width: "100%", // full width
          padding: "10px 0", // some vertical padding
          fontSize: "20px", // a bit bigger
          borderRadius: "20px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        + Add FAQ
      </button>

      {faqs.items.map((item, index) => (
        <FaqItemEditor
          key={index}
          index={index}
          total={faqs.items.length}
          item={item}
          onChange={(v) => updateItem(index, v)}
          onDelete={() => removeItem(index)}
        />
      ))}
    </div>
  );
}

// -----------------------------------------------------
// FaqItemEditor (subcomponent)
// -----------------------------------------------------
function FaqItemEditor({ item, index, total, onChange, onDelete }) {
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
      <h4>FAQ #{total - index}</h4>

      <label>Question</label>
      <input
        value={item.question}
        onChange={(e) => onChange({ ...item, question: e.target.value })}
      />

      <label>Answer</label>
      <textarea
        value={item.answer}
        onChange={(e) => onChange({ ...item, answer: e.target.value })}
      />

      <label>PDF Path</label>
      <input
        value={item.pdfPath}
        onChange={(e) => onChange({ ...item, pdfPath: e.target.value })}
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
