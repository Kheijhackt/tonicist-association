import React, { useState, useEffect } from "react";
import { convertDriveImageToEmbedLink } from "../utils/linksCleaner";

/**
 * DisplayGallery component
 * @param {Array<{img: string, title: string, description: string}>} images - Array of objects containing image URL, title, and description
 * @returns {React.ReactElement} - JSX element for the DisplayGallery component
 * @description
 * A component to display a gallery of images with titles and descriptions.
 * Each image is clickable and opens a modal with the full image and description.
 * The modal is draggable and can be closed by clicking outside or pressing the Escape key.
 * The gallery is also navigable using the left and right arrow keys.
 */
export default function DisplayGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  if (!images || images.length === 0) {
    return;
  }

  const openModal = (index) => setCurrentIndex(index);
  const closeModal = () => {
    setCurrentIndex(null);
    setTranslateX(0);
    setIsDragging(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTranslateX(0);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTranslateX(0);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <div style={{ padding: 20 }}>
      {/* Thumbnails */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {images.map((item, idx) => (
          <img
            key={idx}
            src={convertDriveImageToEmbedLink(item.img)}
            alt={item.title}
            style={{
              width: 200,
              height: 200,
              cursor: "pointer",
              borderRadius: 6,
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onClick={() => openModal(idx)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>

      {/* Modal */}
      {currentIndex !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: 20,
            overflowY: "auto",
            cursor: "grab",
          }}
        >
          {/* Fixed counter at top center */}
          <div
            style={{
              position: "absolute",
              top: "2.5%",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 24,
              color: "#aaa",
              fontSize: 16,
              zIndex: 10000,
              userSelect: "none",
            }}
          >
            {/* Left */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              style={{
                cursor: "pointer",
                fontSize: 30,
                paddingRight: 20,
                color: "#fff",
              }}
            >
              {"<"}
            </span>

            {/* Counter */}
            <span>
              {currentIndex + 1} / {images.length}
            </span>

            {/* Right */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              style={{
                cursor: "pointer",
                fontSize: 30,
                paddingLeft: 20,
                color: "#fff",
              }}
            >
              {">"}
            </span>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "90%",
            }}
          >
            {/* Title */}
            <h2
              style={{ color: "#fff", marginBottom: 16, textAlign: "center" }}
            >
              {images[currentIndex].title}
            </h2>

            {/* Image */}
            <img
              src={convertDriveImageToEmbedLink(images[currentIndex].img)}
              alt={images[currentIndex].title}
              style={{
                maxWidth: "80vw",
                maxHeight: "70vh",
                borderRadius: 6,
                objectFit: "contain",
                userSelect: "none",
              }}
              draggable={false}
            />

            {/* Description */}
            <p
              style={{
                marginTop: 16,
                color: "#ccc",
                maxWidth: "80%",
                textAlign: "center",
              }}
            >
              {images[currentIndex].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
