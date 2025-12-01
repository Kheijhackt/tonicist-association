import React from "react";

export default function RecitalCard({ videoId, title, date, onClick }) {
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        maxWidth: "300px",
        backgroundColor: "var(--white)",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
        overflow: "hidden",
        margin: "10px",
        cursor: "pointer",
        fontFamily: "'Nunito', sans-serif",
        transition: "transform 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? onClick() : null)}
    >
      <img
        src={thumbnail}
        alt={title}
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      <div style={{ padding: "12px" }}>
        <h4 style={{ margin: "0 0 8px 0", fontWeight: 700, textAlign: "left" }}>{title}</h4>
        <p style={{ margin: 0, fontWeight: 600, color: "var(--green-dark)", textAlign: "right" }}>
          {date}
        </p>
      </div>
    </div>
  );
}
