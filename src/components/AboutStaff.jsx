import "../styles/AboutStaff.css";
import { convertDriveImageToEmbedLink } from "../utils/linksCleaner";

/**
 * AboutStaff component
 * Description and left/right removed.
 * Parent props are safely ignored.
 */

function AboutStaff({ imgSrc, name, role }) {
  if (imgSrc) imgSrc = convertDriveImageToEmbedLink(imgSrc);

  return (
    <div className="about-staff-container">
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

        <p
          style={{
            fontWeight: 600,
            color: "var(--green-primary)",
            marginBottom: 0,
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
}

export default AboutStaff;
