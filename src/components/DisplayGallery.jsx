import React, { useState, useEffect } from "react";
import { convertDriveImageToEmbedLink } from "../utils/linksCleaner";

export default function DisplayGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [startX, setStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

  // Touch & Mouse event handlers
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTranslateX(e.touches[0].clientX - startX);
  };
  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    const deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 50) prevImage();
    else if (deltaX < -50) nextImage();
    setTranslateX(0);
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTranslateX(e.clientX - startX);
  };
  const handleMouseUp = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (deltaX > 50) prevImage();
    else if (deltaX < -50) nextImage();
    setTranslateX(0);
    setIsDragging(false);
  };

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
              height: "auto",
              cursor: "pointer",
              borderRadius: 6,
              objectFit: "cover",
              transition: "transform 0.3s ease", // smooth scaling
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
              top: "2.5%", // 10% from top
              left: "50%", // center horizontally
              transform: "translateX(-50%)",
              color: "#aaa",
              fontSize: 14,
              textAlign: "center",
              zIndex: 10000,
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "90%",
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? "none" : "transform 0.3s ease",
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
              src={images[currentIndex].img}
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
