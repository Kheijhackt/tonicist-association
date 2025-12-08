import { useEffect, useState } from "react";

export default function PopupAnnouncer({ title, message, active }) {
  const [visible, setVisible] = useState(false);
  const [showing, setShowing] = useState(false); // for fade effect

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      setVisible(true);
      // slight delay for CSS transition
      requestAnimationFrame(() => setShowing(true));
    }, 1000);

    return () => clearTimeout(timer);
  }, [active]);

  // Handle fade-out on close
  const handleClose = () => {
    setShowing(false);
    setTimeout(() => setVisible(false), 300); // match transition duration
  };

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
          opacity: showing ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: showing
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.95)",
          width: "80%",
          maxHeight: "80%",
          background: "#fff",
          borderRadius: "10px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
          opacity: showing ? 1 : 0,
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "relative",
            padding: "16px 20px",
            borderBottom: "1px solid #ccc",
            fontWeight: "bold",
            fontSize: "20px",
            background: "#f5f5f5",
          }}
        >
          {title}
          <span
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ×
          </span>
        </div>

        {/* Scrollable Message */}
        <div
          style={{
            padding: "16px 20px",
            overflowY: "auto",
            flexGrow: 1,
            whiteSpace: "pre-wrap", // preserves \n from JSON
          }}
        >
          {message}
        </div>
      </div>
    </>
  );
}
