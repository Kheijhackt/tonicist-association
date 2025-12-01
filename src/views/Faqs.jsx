import { useState } from "react";
import ballade1 from "../assets/ballade1.pdf";

function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I join the association?",
      answer: "You can join by filling out our registration form available on the website.",
    },
    {
      question: "Where can I find the schedule?",
      answer: (
        <>
          You can check the <a href="#schedule" style={{ color: "blue", textDecoration: "underline" }}>schedule section</a> on the homepage.
        </>
      ),
    },
    {
      question: "Is there a PDF with guidelines?",
      answer: (
        <div>
          <p>Here is our guidelines document:</p>
          <iframe
            src={ballade1}
            title="PDF Guidelines"
            style={{
              width: "100%",
              height: "400px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginTop: "8px",
            }}
          ></iframe>
        </div>
      ),
    },
    {
      question: "Another sample question?",
      answer: "This is another answer. It can contain links, bold text, or anything you want.",
    },
    // Add more FAQs here
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: "30px" }}>Frequently Asked Questions</h1>

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
            <span>{faq.question}</span>
            <span style={{ fontWeight: "bold" }}>{openIndex === index ? "-" : "+"}</span>
          </div>

          {/* Answer */}
          {openIndex === index && (
            <div style={{ padding: "10px 0 10px 0", lineHeight: 1.6, color: "#333" }}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faqs;
