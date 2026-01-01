// LoadingModal.jsx
import React from "react";
import "../styles/LoadingModal.css";

/**
 * A loading modal component that displays a loading animation.
 * The component takes an optional 'visible' prop which defaults to true.
 * If visible is true, the component will be displayed.
 * If visible is false, the component will be hidden.
 */
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
