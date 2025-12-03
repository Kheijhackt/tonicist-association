import { convertDrivePdfToEmbedLink } from "../utils/linksCleaner";

function RecitalModal({ videoId, title, date, description, pdfPath, onClose }) {
  if (!videoId) return null;
  pdfPath = pdfPath ? convertDrivePdfToEmbedLink(pdfPath) : null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "800px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginBottom: "10px" }}>{title}</h2>
        <p style={{ color: "#555", marginBottom: "10px" }}>{date}</p>

        {/* Video */}
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              border: "0",
            }}
          ></iframe>
        </div>

        {/* Description */}
        <p
          style={{
            lineHeight: "1.5",
            color: "#333",
            whiteSpace: "pre-line",
            marginBottom: "10px",
          }}
        >
          {description}
        </p>

        {/* PDF section */}
        {pdfPath && pdfPath.trim() !== "" && (
          <iframe
            src={pdfPath}
            style={{
              width: "100%",
              height: "500px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
            title="PDF Viewer"
          ></iframe>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "var(--green-primary)",
            color: "white",
            fontWeight: 600,
            marginLeft: "auto",
            display: "block",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default RecitalModal;
