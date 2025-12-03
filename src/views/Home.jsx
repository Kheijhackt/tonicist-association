import { useContext } from "react"
import ContentContext from "../utils/ContentContext";
import SocMedIcons from "../components/SocMedIcons";

function Home() {
  const rawContents = useContext(ContentContext);
  const contents = rawContents.home;  

  const homeContent = {
    minHeight: "100vh",  // full viewport height
    width: "100%",       // full width
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // horizontal centering
    justifyContent: "center", // vertical centering
    minHeight: "calc(100vh - 200px)" // Because of the navbar
  }

  return (
    <div style={homeContent}>
      <h1>{contents.title}</h1>
      <h4 style={{ whiteSpace: "pre-line" }}>
        {contents.subtitle}
      </h4>
      <div
        style={{
          position: "absolute",
          bottom: "20px", // distance from bottom
          left: "50%",    // center horizontally
          transform: "translateX(-50%)", // truly center
        }}
      >
        <SocMedIcons />
      </div>
    </div>
  )
}

export default Home