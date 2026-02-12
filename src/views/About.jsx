import AboutStaff from "../components/AboutStaff";
import { useContext } from "react";
import ContentContext from "../utils/ContentContext";

function About() {
  const rawContents = useContext(ContentContext);
  const contents = rawContents.about;
  const staffMembers = contents.staff;

  return (
    <>
      <h1 style={{ paddingBottom: "100px", textAlign: "center" }}>
        {contents.title}
      </h1>

      {contents.description && (
        <h5
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 60px",
            lineHeight: "1.6",
            color: "var(--green-dark)",
          }}
        >
          {contents.description}
        </h5>
      )}

      <div style={{ textAlign: "center" }}>
        {staffMembers.map((member, index) => (
          <AboutStaff
            key={index}
            imgSrc={member.img}
            name={member.name}
            role={member.role}
          />
        ))}
      </div>
    </>
  );
}

export default About;
