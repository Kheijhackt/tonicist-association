import { useState } from "react";
import { convertDrivePdfToEmbedLink } from "../utils/linksCleaner";

/**
 * CollapsibleList component
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to be displayed in the list
 * @param {Object} props.fieldMap - Map of field names to their corresponding key in the item object
 * @returns {React.ReactElement} - JSX element for the CollapsibleList component
 * @example
 * const items = [
 *   { question: "What is the capital of France?", answer: "Paris" },
 *   { title: "Hello World", textContent: "This is a sample text" },
 * ];
 * const fieldMap = { heading: "question", content: "answer" };
 * const List = <CollapsibleList items={items} fieldMap={fieldMap} />;
 */
const CollapsibleList = ({ items, fieldMap }) => {
  // fieldMap = { heading: "question" or "title", content: "answer" or "textContent", pdf: "pdfPath" }

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      {items.map((item, index) => {
        const heading = item[fieldMap.heading];
        const content = item[fieldMap.content];
        const pdfPath = item[fieldMap.pdf];

        return (
          <div key={index} style={{ marginBottom: "12px" }}>
            {/* Heading */}
            <div onClick={() => toggleDropdown(index)} style={styles.heading}>
              <h6>{heading}</h6>
              <span style={{ fontWeight: "bold" }}>
                {openIndex === index ? "-" : "+"}
              </span>
            </div>

            {/* Content + PDF */}
            {openIndex === index && (
              <div style={styles.content}>
                <p style={{ marginBottom: "10px", whiteSpace: "pre-line" }}>
                  {content}
                </p>
                {pdfPath && pdfPath.trim() !== "" && (
                  <iframe
                    src={convertDrivePdfToEmbedLink(pdfPath)}
                    title={`PDF-${index}`}
                    style={styles.pdf}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  heading: {
    cursor: "pointer",
    fontWeight: 600,
    color: "var(--green-dark)",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: "10px 0",
    lineHeight: 1.6,
    color: "#333",
  },
  pdf: {
    width: "100%",
    height: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "10px",
  },
};

export default CollapsibleList;
