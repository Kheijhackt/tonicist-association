import { useState, useContext } from "react";
import ContentContext from "../utils/ContentContext";

function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const rawContents = useContext(ContentContext);

  const contents = rawContents.faqs;
  const faqs = contents.items;

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: "30px" }}>{contents.title}</h1>

      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          {/* Question */}
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
            <h6>{faq.question}</h6>
            <span style={{ fontWeight: "bold" }}>{openIndex === index ? "-" : "+"}</span>
          </div>

          {/* Answer + Maybe PDF */}
          {openIndex === index && (
            <div style={{ padding: "10px 0", lineHeight: 1.6, color: "#333" }}>
              <p style={{ marginBottom: "10px" }}>{faq.answer}</p>

              {/* Render PDF ONLY if there is a value */}
              {faq.pdfPath && faq.pdfPath.trim() !== "" && (
                <iframe
                  src={faq.pdfPath}
                  title="FAQ PDF"
                  style={{
                    width: "100%",
                    height: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                ></iframe>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faqs;
