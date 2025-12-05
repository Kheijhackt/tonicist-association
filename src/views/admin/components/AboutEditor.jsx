export default function AboutEditor({ about, onChange }) {
  // Update a staff member
  function updateStaff(index, newStaff) {
    const updated = [...about.staff];
    updated[index] = newStaff;
    onChange({ ...about, staff: updated });
  }

  // Add new staff at the end
  function addStaff() {
    const newStaff = {
      name: "",
      role: "",
      img: "",
      description: "",
    };
    const updated = [...about.staff, newStaff]; // <-- append at the end
    onChange({ ...about, staff: updated });
  }

  // Remove a staff member
  function removeStaff(index) {
    const updated = about.staff.filter((_, i) => i !== index);
    onChange({ ...about, staff: updated });
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ textAlign: "left" }}>About Section</h2>

      {/* TITLE */}
      <label>Title</label>
      <input
        value={about.title}
        onChange={(e) => onChange({ ...about, title: e.target.value })}
        style={{ marginBottom: "30px" }}
      />

      {about.staff.map((staff, index) => (
        <StaffItemEditor
          key={index}
          index={index}
          total={about.staff.length}
          staff={staff}
          onChange={(v) => updateStaff(index, v)}
          onDelete={() => removeStaff(index)}
        />
      ))}

      <button
        onClick={addStaff}
        style={{
          marginBottom: "20px",
        }}
      >
        + Add Staff Member
      </button>
    </div>
  );
}

// -----------------------------------------------------
// StaffItemEditor (subcomponent)
// -----------------------------------------------------
function StaffItemEditor({ staff, index, total, onChange, onDelete }) {
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
      <h4>Staff #{index + 1}</h4> {/* <-- normal ascending numbering */}
      <label>Name</label>
      <input
        value={staff.name}
        onChange={(e) => onChange({ ...staff, name: e.target.value })}
      />
      <label>Role</label>
      <input
        value={staff.role}
        onChange={(e) => onChange({ ...staff, role: e.target.value })}
      />
      <label>Image URL</label>
      <input
        value={staff.img}
        onChange={(e) => onChange({ ...staff, img: e.target.value })}
      />
      <label>Description</label>
      <textarea
        value={staff.description}
        onChange={(e) => onChange({ ...staff, description: e.target.value })}
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
