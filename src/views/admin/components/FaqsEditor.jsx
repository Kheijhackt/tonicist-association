export default function FaqsEditor({ faqs, onChange }) {
  // Update a single item
  function updateItem(index, newItem) {
    const updated = [...faqs.items];
    updated[index] = newItem;
    onChange({ ...faqs, items: updated });
  }

  // Add new FAQ at the end
  function addItem() {
    const newItem = {
      question: "",
      answer: "",
      pdfPath: "",
    };
    const updated = [...faqs.items, newItem]; // <-- append at the end
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

      {faqs.items.map((item, index) => (
        <FaqItemEditor
          key={index}
          index={index}
          item={item}
          onChange={(v) => updateItem(index, v)}
          onDelete={() => removeItem(index)}
        />
      ))}

      <button
        onClick={addItem}
        style={{
          width: "100%",
          padding: "10px 0",
          fontSize: "20px",
          borderRadius: "20px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        + Add FAQ
      </button>
    </div>
  );
}

// -----------------------------------------------------
// FaqItemEditor (subcomponent)
// -----------------------------------------------------
function FaqItemEditor({ item, index, onChange, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4>FAQ #{index + 1}</h4> {/* ascending numbering */}
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
