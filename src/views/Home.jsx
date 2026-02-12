import { useContext, useEffect, useState } from "react";
import ContentContext from "../utils/ContentContext";
import SocMedIcons from "../components/SocMedIcons";
import BackgroundImage from "../components/BackgroundImage";

function Home() {
  const rawContents = useContext(ContentContext);
  const contents = rawContents.home;
  const [visitCount, setVisitCount] = useState(0);

  const homeContent = {
    minHeight: "100vh", // full viewport height
    width: "100%", // full width
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // horizontal centering
    justifyContent: "center", // vertical centering
    minHeight: "calc(100vh - 200px)", // Because of the navbar
  };

  useEffect(() => {
    async function getVisitCount() {
      // For fetching website count
      try {
        const res = await fetch("/api/get-visitCount");
        const data = await res.json();
        setVisitCount(data.value);
        if (!res.ok)
          throw new Error(data.error || "Failed to update visit count");
      } catch (err) {
        console.error(err);
      }
    }

    getVisitCount();
  }, []);

  return (
    <div style={homeContent}>
      {contents.backgroundImagePath && (
        <BackgroundImage photoPath={contents.backgroundImagePath} />
      )}
      <h1>{contents.title}</h1>
      <h4 style={{ whiteSpace: "pre-line" }}>{contents.subtitle}</h4>
      <h4>{visitCount} visits</h4>

      <div
        style={{
          position: "absolute",
          bottom: "20px", // distance from bottom
          left: "50%", // center horizontally
          transform: "translateX(-50%)", // truly center
        }}
      >
        <SocMedIcons />
      </div>
    </div>
  );
}

export default Home;
