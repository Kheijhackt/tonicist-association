import "../styles/AboutStaff.css";

function AboutStaff({ imgSrc, name, role, description, picPosition = "left" }) {
  const isLeft = picPosition === "left";

  return (
    <div
      className="about-staff-container"
      style={{
        flexDirection: isLeft ? "row" : "row-reverse",
      }}
    >
      {/* Picture + Name + Role */}
      <div className="about-staff-info">
        <img
          src={imgSrc}
          alt={name}
          style={{
            width: "30vw",
            height: "30vw",
            maxWidth: "180px",
            maxHeight: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "var(--shadow-soft)",
            marginBottom: "10px",
          }}
        />

        <h3 style={{ marginBottom: "4px", color: "var(--green-dark)" }}>
          {role}
        </h3>

        <p style={{ fontWeight: 600, color: "var(--green-primary)", marginBottom: 0 }}>
          {name}
        </p>
      </div>

      {/* Description */}
      <div className="about-staff-desc">
        <p style={{ lineHeight: "1.6" }}>{description}</p>
      </div>
    </div>
  );
}

export default AboutStaff;