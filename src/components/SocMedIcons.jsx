import { SocialIcon } from "react-social-icons";

const SocMedIcons = () => {
  const socialLinks = [
    ["https://mail.google.com/mail/?view=cm&fs=1&to=tonicistassociation@gmail.com", "email"],
    ["https://youtube.com/@tonicistassociation?si=0QO-S51ELzSIW9ww", "youtube"],
    ["https://www.facebook.com/profile.php?id=61573432071856", "facebook"],
    ["https://www.instagram.com/tonicistassociation/", "instagram"],
    ["https://www.threads.net/@tonicistassociation?xmt=AQGzENj5ZuphQKmaG9gdtWXkUfNk25Cgu-di5K3qRdDHmis", "threads"],
  ];

  return (
    <div style={styles.container}>
      {socialLinks.map(([url, network], index) => (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon
            network={network}
            bgColor="#033"
            fgColor="#ffffff"
            style={styles.icon}
          />
        </a>
      ))}
    </div>
  );
};

// Inline styles with responsive adjustments
const styles = {
  container: {
    display: "flex",
    // flexWrap: "wrap",       // allow icons to wrap on small screens
    gap: "20px",            // smaller gap for smaller screens
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: "8vw",          // responsive size based on viewport width
    width: "8vw",
    maxHeight: 50,          // max size for large screens
    maxWidth: 50,
    minHeight: 40,          // min size for small screens
    minWidth: 40,
  },
};

export default SocMedIcons;
