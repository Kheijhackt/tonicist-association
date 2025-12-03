// BackgroundImage.jsx
import React from "react";

const BackgroundImage = ({ photoPath }) => {
  const wrapperStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    down: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, // stays behind all other JSX
    overflow: "hidden",
  };

  const bgStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${photoPath})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(240, 255, 240, 0.75)",
    pointerEvents: "none", // makes sure overlay doesn't block clicks
  };

  return (
    <div style={wrapperStyle}>
      <div style={bgStyle}></div>
      <div style={overlayStyle}></div>
    </div>
  );
};

export default BackgroundImage;
