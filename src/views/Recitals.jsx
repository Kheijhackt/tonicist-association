import { useState } from "react";
import RecitalCard from "../components/RecitalCard";
import RecitalModal from "../components/RecitalModal";

function Recitals() {
  const [selected, setSelected] = useState(null);

  const recitals = [
    {
      videoId: "OTi4beKKj-o",
      title: "Recital 1",
      date: "2024-02-01",
      description:
        "This recital features classical works performed by our senior students. Long description can go here — it will scroll inside the modal without affecting the video area. Add program notes, performers, and timestamps if needed. This recital features classical works performed by our senior students. Long This recital features classical works performed by our senior students. Long This recital features classical works performed by our senior students. Long This recital features classical works performed by our senior students. Long This recital features classical works performed by our senior students. Long This recital features classical works performed by our senior students. Long",
    },
    {
      videoId: "L27eQpcAGyM",
      title: "Recital 2",
      date: "2024-01-15",
      description:
        "A wonderful showcase of intermediate piano students during January. Performer list, pieces, location details, and judges' comments can be written here.",
    },
  ];

  return (
    <>
      <h1>Recital Logs</h1>

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
        onClose={() => setSelected(null)}
      />
    </>
  );
}

export default Recitals;
