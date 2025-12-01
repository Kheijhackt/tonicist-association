import AboutStaff from "../components/AboutStaff";
import { useContext } from "react";
import ContentContext from "../utils/ContentContext";

function About() {
  const rawContents = useContext(ContentContext);  
  const contents = rawContents.about;
  const staffMembers = contents.staff;

  return (
    <>
      <h1 style={{ paddingBottom: "100px", textAlign: "center" }}>{contents.title}</h1>

      {staffMembers.map((member, index) => (
        <AboutStaff
          key={index}
          imgSrc={member.img}
          name={member.name}
          role={member.role}
          description={member.description}
          picPosition={index % 2 === 0 ? "left" : "right"} // alternates left/right
        />
      ))}
    </>
  );
}

export default About;
