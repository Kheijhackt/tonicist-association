// LoadingModal.jsx
import React from "react";
import "../styles/LoadingModal.css";

export default function LoadingModal({ visible = true }) {
  return (
    <div className={`loading-modal ${visible ? "visible" : ""}`}>
      <lord-icon
        src="https://cdn.lordicon.com/dedkryhs.json"
        trigger="loop"
        stroke="bold"
        state="hover-draw"
        colors="primary:#25D366"
        style={{ width: "150px", height: "150px" }}
      ></lord-icon>
    </div>
  );
}
