import { useState, useContext } from "react";
import ContentContext from "../utils/ContentContext";

function Forms() {
  const [openIndex, setOpenIndex] = useState(null);

  const rawContents = useContext(ContentContext);
  const contents = rawContents.forms;
  const formsList = contents.formsList || [];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: "30px" }}>{contents.title}</h1>

      {formsList.length === 0 ? (
        <h6>There are no forms to be accomplished for now.</h6>
      ) : (
        formsList.map((form, index) => (
          <div key={index} style={{ marginBottom: "12px" }}>
            {/* Dropdown Title */}
            <div
              onClick={() => toggleDropdown(index)}
              style={{
                cursor: "pointer",
                fontWeight: 600,
                color: "var(--green-dark)",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6>{form.text}</h6>
              <span style={{ fontWeight: "bold" }}>{openIndex === index ? "-" : "+"}</span>
            </div>

            {/* Embedded Form */}
            {openIndex === index && (
              <div style={{ padding: "10px 0" }}>
                <iframe
                  src={`https://docs.google.com/forms/d/e/${form.formId}/viewform?embedded=true`}
                  width="100%"
                  height="800"
                  title={form.text}
                  style={{ borderRadius: "12px", border: "1px solid #ccc" }}
                ></iframe>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Forms;
