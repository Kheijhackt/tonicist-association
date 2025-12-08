import { useEffect, useState } from "react";

const severityColors = {
  success: "#4caf50",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
};

export default function DisplayAlert({ severity, message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const borderColor = severityColors[severity] || "#2196f3";

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 100,
        }}
        onClick={() => setVisible(false)} // closes when clicking outside
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          padding: "20px 30px",
          borderRadius: "8px",
          width: "320px",
          textAlign: "center",
          border: `3px solid ${borderColor}`,
          zIndex: 1000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ marginBottom: "20px", fontSize: "16px" }}>{message}</div>

        <button
          style={{
            padding: "8px 20px",
            cursor: "pointer",
            fontSize: "15px",
            borderRadius: "5px",
            border: "none",
            background: borderColor,
            color: "white",
          }}
          onClick={() => setVisible(false)}
        >
          Okay
        </button>
      </div>
    </>
  );
}
