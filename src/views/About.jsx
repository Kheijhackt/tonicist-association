import AboutStaff from "../components/AboutStaff";

function About() {
  // Staff data — can later come from JSON/fetch
  const staffMembers = [
    {
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
      name: "John Doe",
      role: "President",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ullamcorper nisi. Aenean sodales ac lorem eget tempus.",
    },
    {
      imgSrc: "https://i.pinimg.com/236x/92/b2/49/92b24967cf34c2f5b82ca1ec6268fad4.jpg?nii=t",
      name: "Jane Smith",
      role: "Vice President",
      description:
        "Another staff description here. Clean layout, alternating sides, full responsive behavior.",
    },
    {
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      name: "Alice Johnson",
      role: "Secretary",
      description:
        "Additional staff member description, can be long or short, dynamically loaded.",
    },
    // Add more members here
  ];

  return (
    <>
      <h1 style={{ paddingBottom: "100px", textAlign: "center" }}>Staff Members</h1>

      {staffMembers.map((member, index) => (
        <AboutStaff
          key={index}
          imgSrc={member.imgSrc}
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
