import { useState } from "react";
import RecitalCard from "../components/RecitalCard";
import RecitalModal from "../components/RecitalModal";
import { useContext } from "react";
import ContentContext from "../utils/ContentContext";

function Performances() {
  const [selected, setSelected] = useState(null);

  const rawContents = useContext(ContentContext);

  const contents = rawContents.performances;
  const recitals = contents.videos;

  return (
    <>
      <h1>{contents.title}</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {recitals.map((r) => (
          <RecitalCard
            key={r.videoId}
            videoId={r.videoId}
            title={r.title}
            date={r.date}
            onClick={() => setSelected(r)}
          />
        ))}
      </div>

      <RecitalModal
        videoId={selected?.videoId}
        title={selected?.title}
        description={selected?.description}
        pdfPath={selected?.pdfPath}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

export default Performances;
