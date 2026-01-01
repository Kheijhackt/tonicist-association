import React from "react";
import { convertDriveImageToEmbedLink } from "../utils/linksCleaner";

/**
 * A component that displays a background image with an overlay.
 * The background image is retrieved from Google Drive using the provided path.
 * The overlay is a semi-transparent white color that helps the content stand out.
 * The component stays behind all other JSX elements due to its negative zIndex.
 *
 * @param {{String}} photoPath - the path to the background image in Google Drive
 * @returns {React.ReactElement} - the JSX element for the BackgroundImage component
 */
const BackgroundImage = ({ photoPath }) => {
  if (photoPath) photoPath = convertDriveImageToEmbedLink(photoPath);

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
