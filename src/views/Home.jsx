import { useContext } from "react"
import ContentContext from "../utils/ContentContext";

function Home() {
  const contents = useContext(ContentContext);
  const homeContent = {
    minHeight: "100vh",  // full viewport height
    width: "100%",       // full width
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // horizontal centering
    justifyContent: "center", // vertical centering
    minHeight: "calc(100vh - 200px)" // Because of the navbar
  }

  if (!contents) return <h1>Loading...</h1>;

  return (
    <div style={homeContent}>
      <h1>{contents.title}</h1>
      <h4>{contents.subtitle}</h4>
    </div>
  )
}

export default Home