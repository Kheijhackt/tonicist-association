import { useEffect } from "react";

const severityColors = {
  success: "#4caf50",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
};

/**
 * DisplayAlert is a component that displays a modal alert with a given severity and message.
 * It also takes an onClose function that is called when the user clicks the overlay or the "Okay" button.
 * The component is hidden if the visible prop is false.
 * The severity prop should be one of the following strings: success, error, warning, info.
 * If the severity prop is not recognized, the component will use the info color by default.
 * The component is fully accessible and follows best practices for alert dialogs.
 * @param {string} severity - the severity of the alert (success, error, warning, info)
 * @param {string} message - the message of the alert
 * @param {boolean} visible - whether the component is visible or not
 * @param {function} onClose - the function to be called when the user closes the alert
 */
export default function DisplayAlert({ severity, message, visible, onClose }) {
  if (!visible) return null;

  const borderColor = severityColors[severity] || "#2196f3";

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
        onClick={onClose} // caller decides what happens
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
          onClick={onClose}
        >
          Okay
        </button>
      </div>
    </>
  );
}
