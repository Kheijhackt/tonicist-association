import { useContext } from "react";
import ContentContext from "../utils/ContentContext";

function Events() {
  const rawContents = useContext(ContentContext);  
  const contents = rawContents.events;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{contents.title}</h1>
      <iframe
        src={contents.googleCalendarUrl}
        style={{
          width: "100%",
          maxWidth: "800px",    // max width on large screens
          height: "500px",      // fixed height
          border: "0",
          borderRadius: "12px",
        }}
      ></iframe>
    </div>
  );
}

export default Events;
